# InstaPower

<p align="center">
  <strong>A clean, focused Instagram desktop experience for Windows.</strong><br>
  Instagram in its own app window — without browser clutter.
</p>

<p align="center">
  <a href="https://github.com/ThePowerUsers/InstaPower/releases/latest"><strong>Download</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/ThePowerUsers/InstaPower/releases">Releases</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/ThePowerUsers/InstaPower/issues">Issues</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/ThePowerUsers/InstaPower/issues">Support</a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/v/release/ThePowerUsers/InstaPower?style=flat-square&label=release" alt="Latest release">
  <img src="https://img.shields.io/github/actions/workflow/status/ThePowerUsers/InstaPower/build-windows.yml?style=flat-square&label=build" alt="Build status">
  <img src="https://img.shields.io/github/license/ThePowerUsers/InstaPower?style=flat-square" alt="License">
  <img src="https://img.shields.io/github/stars/ThePowerUsers/InstaPower?style=flat-square" alt="Stars">
  <img src="https://img.shields.io/github/commit-activity/m/ThePowerUsers/InstaPower?style=flat-square&label=activity" alt="Commit activity">
</p>

---

## Overview

**InstaPower** is an independent Windows desktop wrapper for the Instagram web experience, built with Electron.

It keeps Instagram in a dedicated application window, uses its own persistent browser session, and avoids turning the app into a general-purpose browser.

### Why InstaPower?

- **Focused:** Instagram gets its own desktop window instead of another browser tab.
- **Persistent:** Your Instagram web session can remain signed in between launches.
- **Independent:** The app keeps its browser profile separate from your normal browser profile.
- **Simple:** No custom account system, password vault, or separate Instagram credentials.
- **Open source:** The source, build pipeline, security policy, and release artifacts are publicly reviewable.

> **Unofficial project:** InstaPower is not affiliated with, endorsed by, or sponsored by Instagram or Meta.

## Features

| | Feature | Description |
|---|---|---|
| 🖥️ | **Dedicated window** | Instagram runs in its own focused desktop application. |
| 🔐 | **Persistent sign-in** | Your Instagram session can persist between launches. |
| 🧩 | **Isolated profile** | Uses a dedicated Chromium session rather than your Edge profile. |
| ⚡ | **Focused experience** | No browser address bar or unrelated browser UI. |
| 📦 | **Windows installer** | Normal setup wizard with a selectable installation directory. |
| 🚀 | **Portable edition** | Standalone executable with no installation required. |
| 🛡️ | **Security-minded** | Context isolation, sandboxing, disabled Node integration, permission controls, HTTPS-only remote resources, and Electron security fuses. |
| ⚙️ | **Settings panel** | Native app settings for startup, tray behavior, notifications, and update checks. |
| 🪟 | **Windows integration** | System tray support and optional launch-at-login behavior. |
| 🔔 | **Native notifications** | Windows notifications for downloads and available updates. |
| ⌨️ | **Keyboard shortcuts** | Ctrl/Cmd+Shift+S for settings, +R to reload, and +M to minimize. |
| 🔄 | **Update checking** | Periodic GitHub release checks with a manual check option. |
| 📥 | **Download handling** | Save downloaded files through a native Windows save dialog. |

## ⭐ Support the Project

If InstaPower is useful to you, consider giving the repository a **Star** on GitHub. Stars help people discover the project and are a simple way to show support.

**[⭐ Star InstaPower on GitHub](https://github.com/ThePowerUsers/InstaPower)**

If you use InstaPower and find it useful, a genuine star helps other developers discover the project.

---

## Download

### Windows 10 / 11

**Current release:** v1.1.0  
**Latest stable release:** [GitHub Releases](https://github.com/ThePowerUsers/InstaPower/releases/latest)

**Installer** — recommended for a normal Windows installation.  
Includes a setup wizard with an installation-location choice and Start Menu/Desktop shortcut support.

**Portable** — run the standalone executable directly without installing the application.

### v1.0.0

- [InstaPower Setup 1.0.0 x64](https://github.com/ThePowerUsers/InstaPower/releases/download/v1.0.0/InstaPower-Setup-1.0.0-x64.exe)
- [InstaPower Portable 1.0.0 x64](https://github.com/ThePowerUsers/InstaPower/releases/download/v1.0.0/InstaPower-1.0.0-portable-x64.exe)
- [SHA256SUMS.txt](https://github.com/ThePowerUsers/InstaPower/releases/download/v1.0.0/SHA256SUMS.txt)
- [Release notes](https://github.com/ThePowerUsers/InstaPower/releases/tag/v1.0.0)

For a local integrity check on Windows, use `certutil -hashfile InstaPower-Setup-1.0.0-x64.exe SHA256` or the equivalent command for the portable executable and compare the result with `SHA256SUMS.txt`.

## Getting Started

1. Download the latest Windows build.
2. Install InstaPower, or launch the portable edition.
3. Sign in through Instagram's normal login flow.
4. Use Instagram from its dedicated desktop window.

InstaPower does not maintain a separate password database. Authentication is handled by Instagram.

## Security & Privacy

Security is treated as a first-class part of the project.

- Instagram handles authentication.
- No custom InstaPower password database.
- No intentional collection or upload of Instagram credentials.
- Dedicated persistent Electron browser session.
- Remote Instagram content is isolated from Node.js capabilities.
- Context isolation and sandboxing are enabled.
- Node integration is disabled for remote content.
- Electron security fuses are enabled.
- No private, reverse-engineered, or unauthorized Instagram APIs.
- No intentional automation of Instagram account actions.

For vulnerability reporting, see **[SECURITY.md](SECURITY.md)**.

## Development

### Stack

- Electron
- Electron Forge
- Webpack
- JavaScript
- electron-builder
- GitHub Actions

### Requirements

- Node.js 22+
- npm
- Windows 10/11 for normal desktop testing

### Run locally

~~~bash
npm ci
npm start
~~~

### Build Windows packages

~~~bash
npm run package
npm run build:windows
~~~

The Windows installer and portable executable are produced in dist/.

> GitHub Codespaces can prepare the project and run build tooling, but Electron's desktop GUI is intended to be tested on Windows.

## Project Structure

~~~text
InstaPower/
├── .github/              # CI, issue templates, dependency automation
├── test/                 # Automated project smoke tests
├── src/                  # Electron application source
├── forge.config.js       # Electron Forge configuration
├── electron-builder.yml  # Windows distribution configuration
├── webpack.*.config.js   # Webpack configuration
├── package.json          # Project metadata and scripts
├── SECURITY.md           # Security policy
├── CONTRIBUTING.md       # Contribution guidelines
├── CODE_OF_CONDUCT.md    # Community standards
└── LICENSE               # MIT license
~~~

## Support

Need help or found something unclear?

- [Support guide](SUPPORT.md)
- [GitHub Issues](https://github.com/ThePowerUsers/InstaPower/issues)
- [Bug reports](https://github.com/ThePowerUsers/InstaPower/issues/new?template=bug_report.md)
- [Feature requests](https://github.com/ThePowerUsers/InstaPower/issues/new?template=feature_request.md)
- [Security policy](SECURITY.md)

## Contributing

Contributions, bug reports, documentation improvements, and feature ideas are welcome.

Before contributing, please read:

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)

For bugs, use the [bug report template](https://github.com/ThePowerUsers/InstaPower/issues/new?template=bug_report.md).  
For ideas, use the [feature request template](https://github.com/ThePowerUsers/InstaPower/issues/new?template=feature_request.md).

**Never post passwords, cookies, session tokens, access tokens, or other sensitive information in public issues.**

## Release History

See [CHANGELOG.md](CHANGELOG.md) for the release history.

## Roadmap

The current roadmap is now implemented through the desktop-integration batch, with the remaining release/signing work dependent on production credentials and ongoing maintenance.

- [x] ⚙️ Settings panel
- [x] 🪟 System tray + Windows integration
- [x] 🔔 Native desktop notifications
- [x] ⌨️ Keyboard shortcuts
- [x] 🔄 Automatic update checking
- [x] 🚀 Performance & reliability improvements
- [x] 📥 Download handling
- [x] 🧪 Automated smoke testing
- [x] 🛡️ Deeper Electron security hardening
- [x] 🏆 Professional release infrastructure, checksums, SBOM, and build provenance
- [ ] 🔐 Production Windows code signing — enable after a real signing certificate/Trusted Signing credentials are configured in GitHub Actions
- [ ] 🚀 Polished v2 desktop experience

The roadmap is subject to change as the project evolves.

## Disclaimer

InstaPower is an independent, unofficial desktop client for Instagram.

It is **not affiliated with, endorsed by, or sponsored by Instagram or Meta Platforms, Inc.**

Instagram and related marks are trademarks of their respective owners.

## License

Released under the [MIT License](LICENSE).

## Maintainer

**ThePowerUsers**

Open-source Windows desktop software built with Electron.

[GitHub](https://github.com/ThePowerUsers) · [InstaPower](https://github.com/ThePowerUsers/InstaPower) · [Releases](https://github.com/ThePowerUsers/InstaPower/releases)
