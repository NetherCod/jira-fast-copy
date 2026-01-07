# Jira Fast Copy

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-v1.0.0-blue?logo=googlechrome&logoColor=white)](https://chrome.google.com/webstore)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

一鍵複製 Jira Issue Key 到剪貼簿的 Chrome Extension。

## ✨ 功能特色

- 🔘 在 Jira Issue 標題旁新增 Copy 按鈕
- 📋 一鍵複製 Issue Key（例如：`PROJ-123`）
- ✅ 複製成功時顯示視覺回饋
- 🎛️ 可透過 Popup 啟用/停用功能
- 🔄 支援 Jira SPA 頁面導航

## 📦 安裝方式

### 開發者模式（本地安裝）

1. 下載或 clone 此專案：

   ```bash
   git clone https://github.com/NetherCod/jira-fast-copy.git
   ```

2. 開啟 Chrome 並前往 `chrome://extensions/`

3. 開啟右上角的「開發人員模式」

4. 點擊「載入未封裝項目」

5. 選擇專案資料夾

### Chrome Web Store

_即將上架_

## 🚀 使用方式

1. 前往任何 Atlassian Jira Cloud 的 Issue 頁面（`*.atlassian.net`）
2. 在 Issue Key 左側會看到一個 Copy 按鈕
3. 點擊按鈕即可複製 Issue Key 到剪貼簿
4. 可透過點擊 Extension Icon 開啟 Popup 來啟用/停用功能

## 📁 專案結構

```
jira-fast-copy/
├── manifest.json      # Extension 設定檔（Manifest V3）
├── content.js         # 注入 Jira 頁面的內容腳本
├── content.css        # Copy 按鈕的樣式
├── background.js      # Service Worker
├── popup.html         # Popup 頁面結構
├── popup.js           # Popup 頁面邏輯
├── popup.css          # Popup 頁面樣式
└── icons/             # Extension 圖示
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 🔑 權限說明

| 權限                                   | 用途                         |
| -------------------------------------- | ---------------------------- |
| `storage`                              | 儲存使用者的啟用/停用設定    |
| `activeTab`                            | 在切換設定時重新整理當前頁面 |
| `host_permissions` (`*.atlassian.net`) | 在 Jira Cloud 網站上執行功能 |

## 🛠️ 開發

此專案使用原生 JavaScript，無需額外建置步驟。

### 本地開發

1. Clone 專案
2. 在 Chrome 中以開發者模式載入
3. 修改程式碼後，點擊 Extension 頁面的「重新載入」按鈕

## 📄 License

MIT License - 詳見 [LICENSE](LICENSE) 檔案
