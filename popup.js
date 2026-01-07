/**
 * Jira Fast Copy - Popup Script
 */

const enableToggle = document.getElementById('enableToggle');

// 載入設定
chrome.storage.sync.get({ enabled: true }, (result) => {
  enableToggle.checked = result.enabled;
});

// 切換開關時儲存設定並刷新頁面
enableToggle.addEventListener('change', async () => {
  const enabled = enableToggle.checked;

  // 儲存設定
  await chrome.storage.sync.set({ enabled });

  // 發送訊息給 background.js 刷新當前頁面
  chrome.runtime.sendMessage({ action: 'refreshTab' });
});
