# InstaPower

<p align="center">
  <strong>A clean, focused Instagram desktop experience for Windows.</strong><br>
  Instagram in its own app window — without the browser clutter.
</p>

<p align="center">
  <a href="https://github.com/ThePowerUsers/InstaPower/releases">Download</a> ·
  <a href="https://github.com/ThePowerUsers/InstaPower/issues">Report a bug</a> ·
  <a href="https://github.com/ThePowerUsers/InstaPower/discussions">Discussions</a>
</p>

---

## ✨ Why InstaPower?

InstaPower gives Instagram its own dedicated Windows desktop window while keeping the familiar Instagram web experience.

### What you get

| Feature | Details |
| --- | --- |
| 🖥️ **Dedicated desktop app** | Instagram in a focused Electron window, without a browser address bar. |
| 🔐 **Persistent session** | Log in normally and stay signed in between launches. |
| 🧩 **Separate app profile** | InstaPower keeps its own Chromium session instead of using your Edge profile. |
| ⚡ **Focused experience** | Built around Instagram rather than trying to become another full browser. |
| 📦 **Windows installer** | A normal setup wizard with a selectable installation directory. |
| 🚀 **Portable edition** | A standalone `.exe` that can run without installation. |
| 🛡️ **Security-minded Electron setup** | Context isolation, sandboxing, disabled Node integration, and Electron security fuses. |

## 📥 Download InstaPower

**Windows 10/11**

### Installer
Download the **InstaPower Setup** executable from [GitHub Releases](https://github.com/ThePowerUsers/InstaPower/releases).

The installer provides a normal Windows setup experience and lets you choose where InstaPower is installed. It can create Start Menu and Desktop shortcuts.

### Portable
Prefer not to install anything?

Download the **portable InstaPower executable** from [GitHub Releases](https://github.com/ThePowerUsers/InstaPower/releases) and run it directly from a folder, USB drive, or other location.

> **Tip:** Use the installer for a normal Windows installation. Use portable when you want a self-contained copy.

## 🚀 Getting started

1. Download the latest Windows build.
2. Install InstaPower, or launch the portable executable.
3. Sign in through Instagram's normal login page.
4. Use Instagram from its dedicated desktop window.

No separate InstaPower password or credential database is required.

## 🛠️ Development

Built with:

- **Electron**
- **Electron Forge**
- **Webpack**
- **JavaScript**
- **GitHub Actions**
- **electron-builder** for Windows distribution

### Requirements

- Node.js 22+
- npm
- Windows 10/11 for normal desktop testing

### Run locally

```bash
npm ci
npm start
```

> GitHub Codespaces can prepare/build the project, but the Electron GUI is intended to be tested on Windows.

### Build Windows packages

```bash
npm run package
npm run build:windows
```

The Windows installer and portable executable are written to `dist/`.

## 🔐 Privacy & security

InstaPower is intentionally simple about authentication:

- Instagram handles the login flow.
- InstaPower does **not** maintain a custom password database.
- The app does not intentionally collect or upload Instagram credentials.
- The app uses a dedicated persistent Electron browser session.
- InstaPower does not use private, reverse-engineered, or unauthorized Instagram APIs.
- The project does not intentionally automate Instagram account actions.

The application also keeps remote Instagram content isolated from Node.js capabilities using Electron security controls.

## 🐛 Bugs & feature requests

Found something broken? Please [open a bug report](https://github.com/ThePowerUsers/InstaPower/issues/new?template=bug_report.md).

Have an idea? [Request a feature](https://github.com/ThePowerUsers/InstaPower/issues/new?template=feature_request.md).

Please do not post passwords, cookies, session tokens, or other private information in issues.

## 🤝 Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for development and pull-request guidelines.

## 📋 Roadmap

Planned desktop improvements include:

- Better downloads handling
- Desktop notifications
- More Windows integration
- Tray support
- Application settings
- Update support
- Additional performance and stability improvements
- More automated testing

The roadmap may change as the project evolves.

## ⚠️ Unofficial project

InstaPower is an independent, unofficial desktop client. It is **not affiliated with, endorsed by, or sponsored by Instagram or Meta**.

Instagram is a trademark of Meta Platforms, Inc.

## 📄 License

InstaPower is released under the [MIT License](LICENSE).

## 👤 ThePowerUsers

Built and maintained by **ThePowerUsers** as an open-source Windows desktop project.
