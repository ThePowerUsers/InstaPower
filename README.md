# InstaPower

> A focused Instagram desktop experience for Windows.

InstaPower brings Instagram into a dedicated Windows application powered by Electron. It removes the browser chrome while keeping the familiar Instagram web experience and a separate persistent app session.

## ✨ Highlights

- **Dedicated Instagram window** — focused desktop experience without a browser address bar.
- **Persistent login session** — sign in normally and your Instagram session is kept between launches.
- **Isolated app session** — InstaPower uses its own Chromium session rather than your Microsoft Edge profile.
- **Windows-first** — packaged and distributed as a Windows desktop application.
- **Full setup wizard** — choose the installation location and shortcut options through a normal Windows installer.
- **Portable edition** — a standalone executable that requires no installation.
- **Security-conscious Electron setup** — context isolation, sandboxing, disabled Node integration, and Electron fuses.
- **Lightweight foundation** — designed to stay focused instead of becoming a full browser.

## 🚀 Download

Windows builds are published from the project's GitHub Releases page.

Download the latest Windows installer, run it, and use the setup wizard to choose where InstaPower should be installed. The installer can create Start Menu and Desktop shortcuts.

Prefer no installation? Download the **portable Windows executable** and run it directly from a folder, USB drive, or other location.

## 🛠️ Development

InstaPower is built with:

- Electron
- Electron Forge
- Webpack
- JavaScript
- GitHub Actions

### Run locally

Install dependencies:

```bash
npm ci
```

Start the development build:

```bash
npm start
```

> GitHub Codespaces can build the project, but the Electron GUI is intended to be tested on Windows.

### Build Windows installer

```bash
npm run make

# Windows installer + portable executable
npm run build:windows
```

The generated packages are placed under `out/make`.

## 🔐 Privacy & security

InstaPower does **not** maintain a password database. Authentication is performed through Instagram's normal web login flow.

InstaPower does not use private or reverse-engineered Instagram APIs and does not intentionally automate account actions.

The application uses a dedicated persistent Electron session for Instagram.

## ⚠️ Unofficial project

InstaPower is an independent, unofficial desktop client. It is not affiliated with, endorsed by, or sponsored by Instagram or Meta.

Instagram is a trademark of Meta Platforms, Inc.

## 📋 Project status

InstaPower is under active development. The current focus is a stable Windows desktop experience, followed by desktop polish such as downloads, notifications, shortcuts, tray integration, settings, and update support.

## 📄 License

MIT — see [LICENSE](LICENSE).

## 👤 Author

**ThePowerUsers**

Built as an open-source desktop project.
