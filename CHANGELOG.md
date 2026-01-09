# Changelog

All notable changes to Jira Fast Copy will be documented in this file.

## [1.0.1] - 2026-01-09

### Fixed

- Fixed tooltip being obscured by other elements in certain scenarios
- Refactored tooltip to use an independent DOM element to avoid CSS stacking context and overflow clipping issues

## [1.0.0] - 2026-01-08

### Added

- Added one-click copy button next to Jira Issue Key
- Click to quickly copy Issue Key (e.g., `PROJ-123`) to clipboard
- Visual feedback on copy success/failure
- Enable/disable toggle via popup
- Auto-detect SPA navigation and inject button accordingly
