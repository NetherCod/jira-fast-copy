# Jira Fast Copy

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-v1.0.1-blue?logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/jira-fast-copy/lommnhjknhlmmlpmdmmfejionhjijfpd)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A Chrome extension for one-click copying of Jira Issue Keys to clipboard.

## Installation

### Chrome Web Store (Recommended)

Install directly from the Chrome Web Store:

**[Jira Fast Copy - Chrome Web Store](https://chromewebstore.google.com/detail/jira-fast-copy/lommnhjknhlmmlpmdmmfejionhjijfpd)**

### Developer Mode (Local Installation)

1. Clone this repository:

   ```bash
   git clone https://github.com/NetherCod/jira-fast-copy.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked"

5. Select the project folder

## Features

- Adds a Copy button next to Jira Issue titles
- One-click copy of Issue Key (e.g., `PROJ-123`)
- Visual feedback on successful copy
- Enable/disable functionality via Popup
- Supports Jira SPA page navigation

## Usage

1. Navigate to any Atlassian Jira Cloud Issue page (`*.atlassian.net`)
2. Look for the Copy button next to the Issue Key
3. Click the button to copy the Issue Key to clipboard
4. Click the Extension icon to open Popup for enable/disable settings

## Project Structure

```
jira-fast-copy/
├── manifest.json      # Extension configuration (Manifest V3)
├── content.js         # Content script injected into Jira pages
├── content.css        # Copy button styles
├── background.js      # Service Worker
├── popup.html         # Popup page structure
├── popup.js           # Popup page logic
├── popup.css          # Popup page styles
└── icons/             # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Permissions

| Permission                             | Purpose                                      |
| -------------------------------------- | -------------------------------------------- |
| `storage`                              | Store user's enable/disable settings         |
| `activeTab`                            | Refresh current page when toggling settings  |
| `host_permissions` (`*.atlassian.net`) | Execute functionality on Jira Cloud websites |

## Development

This project uses vanilla JavaScript with no build steps required.

### Local Development

1. Clone the repository
2. Load as unpacked extension in Chrome developer mode
3. After modifying code, click the "Reload" button on the Extensions page

## License

MIT License - See [LICENSE](LICENSE) file for details
