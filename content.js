/**
 * Jira Fast Copy - Content Script
 * 在 Jira issue 頁面的 Issue Key 左側插入 copy 按鈕
 */

const CONTAINER_SELECTOR =
  '[data-testid="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"]';
const ISSUE_KEY_SELECTOR = '[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]';
const BUTTON_ID = 'jira-copy-extension-btn';
const TOOLTIP_ID = 'jira-copy-extension-tooltip';

/**
 * 建立 copy 按鈕元素
 */
/**
 * 建立或取得 tooltip 元素（固定在 body 層級避免 z-index 問題）
 */
function getOrCreateTooltip() {
  let tooltip = document.getElementById(TOOLTIP_ID);
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = TOOLTIP_ID;
    tooltip.className = 'jira-copy-tooltip';
    document.body.appendChild(tooltip);
  }
  return tooltip;
}

/**
 * 顯示 tooltip
 */
function showTooltip(button, text) {
  const tooltip = getOrCreateTooltip();
  tooltip.textContent = text;
  tooltip.classList.add('visible');

  // 計算 tooltip 位置
  const rect = button.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  tooltip.style.left = `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`;
  tooltip.style.top = `${rect.top - tooltipRect.height - 8}px`;
}

/**
 * 隱藏 tooltip
 */
function hideTooltip() {
  const tooltip = document.getElementById(TOOLTIP_ID);
  if (tooltip) {
    tooltip.classList.remove('visible');
  }
}

function createCopyButton(issueKey) {
  const button = document.createElement('button');
  button.id = BUTTON_ID;
  button.className = 'jira-copy-btn';
  button.setAttribute('aria-label', `Copy ${issueKey}`);
  button.setAttribute('data-tooltip', `Copy ${issueKey}`);
  button.dataset.issueKey = issueKey;

  // SVG copy icon + check icon
  button.innerHTML = `
    <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `;

  // Tooltip hover 事件
  button.addEventListener('mouseenter', () => {
    showTooltip(button, button.getAttribute('data-tooltip'));
  });

  button.addEventListener('mouseleave', () => {
    hideTooltip();
  });

  button.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(issueKey);
      showCopyFeedback(button, true);
    } catch (err) {
      console.error('Failed to copy:', err);
      showCopyFeedback(button, false);
    }
  });

  return button;
}

/**
 * 顯示複製結果回饋
 */
function showCopyFeedback(button, success) {
  const originalTooltip = button.getAttribute('data-tooltip');
  button.setAttribute('data-tooltip', success ? 'Copied!' : 'Failed');
  button.classList.add(success ? 'copied' : 'failed');

  // 更新目前顯示的 tooltip
  showTooltip(button, success ? 'Copied!' : 'Failed');

  setTimeout(() => {
    button.setAttribute('data-tooltip', originalTooltip);
    button.classList.remove('copied', 'failed');
    hideTooltip();
  }, 1000);
}

/**
 * 注入 copy 按鈕到 Jira 頁面
 */
function injectCopyButton() {
  const container = document.querySelector(CONTAINER_SELECTOR);
  const issueKeyLink = document.querySelector(ISSUE_KEY_SELECTOR);

  if (!container || !issueKeyLink) {
    return;
  }

  const issueKey = issueKeyLink.textContent.trim();
  if (!issueKey) {
    return;
  }

  // 檢查是否已經注入
  const existingButton = document.getElementById(BUTTON_ID);
  if (existingButton) {
    // 如果已經存在且 issue key 相同，則不需要重新注入
    if (existingButton.dataset.issueKey === issueKey) {
      return;
    }
    // 如果 issue key 不同 (SPA page transition)，移除舊按鈕
    existingButton.remove();
  }

  const button = createCopyButton(issueKey);

  // 找到 Issue Key 的父元素（包含 role="presentation" 的 div）
  const issueKeyParent = issueKeyLink.closest('div[role="presentation"]');

  if (issueKeyParent) {
    // 插入到 Issue Key 父元素之前
    container.insertBefore(button, issueKeyParent);
  } else {
    // fallback: 插入到容器的第二個子元素位置
    const children = container.children;
    if (children.length >= 2) {
      container.insertBefore(button, children[1]);
    } else {
      container.insertBefore(button, container.firstChild);
    }
  }
}

/**
 * 移除已注入的 copy 按鈕
 */
function removeCopyButton() {
  const button = document.getElementById(BUTTON_ID);
  if (button) {
    button.remove();
  }
}

/**
 * 初始化 extension
 */
async function init() {
  // 檢查 feature 是否啟用
  const result = await chrome.storage.sync.get({ enabled: true });

  if (!result.enabled) {
    removeCopyButton();
    return;
  }

  // 注入按鈕
  injectCopyButton();

  // 使用 MutationObserver 監聽 DOM 變化（處理 SPA 導航）
  const observer = new MutationObserver((mutations) => {
    // 先檢查是否真的需要注入，減少 injectCopyButton 呼叫次數
    const button = document.getElementById(BUTTON_ID);
    if (button) {
      const issueKeyLink = document.querySelector(ISSUE_KEY_SELECTOR);
      // 如果按鈕存在且 issue key 一致，則不做任何事
      if (issueKeyLink && button.dataset.issueKey === issueKeyLink.textContent.trim()) {
        return;
      }
    }

    injectCopyButton();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// 監聽設定變更
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.enabled) {
    if (changes.enabled.newValue) {
      injectCopyButton();
    } else {
      removeCopyButton();
    }
  }
});

// 頁面載入完成後初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
