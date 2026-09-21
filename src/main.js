const {
  app,
  BrowserWindow,
  Menu,
  Tray,
  Notification,
  dialog,
  shell,
  nativeImage,
} = require('electron');
const fs = require('fs');
const path = require('path');
const https = require('https');

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.setAppUserModelId('com.thepowerusers.instapower');

  if (require('electron-squirrel-startup')) app.quit();

  let mainWindow = null;
  let settingsWindow = null;
  let tray = null;
  let isQuitting = false;
  let updateTimer = null;

  const DEFAULT_SETTINGS = {
    launchAtLogin: false,
    minimizeToTray: false,
    notifications: true,
    automaticUpdateChecks: true,
  };

  const settingsPath = () => path.join(app.getPath('userData'), 'settings.json');

  function loadSettings() {
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(fs.readFileSync(settingsPath(), 'utf8')) };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  function saveSettings(next) {
    const merged = { ...DEFAULT_SETTINGS, ...next };
    fs.mkdirSync(path.dirname(settingsPath()), { recursive: true });
    fs.writeFileSync(settingsPath(), JSON.stringify(merged, null, 2), 'utf8');
    if (process.platform === 'win32') app.setLoginItemSettings({ openAtLogin: Boolean(merged.launchAtLogin) });
    return merged;
  }

  const APP_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><defs><linearGradient id="b" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#0b1235"/><stop offset=".55" stop-color="#18245f"/><stop offset="1" stop-color="#24145f"/></linearGradient><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#64e8ff"/><stop offset=".48" stop-color="#8b35ff"/><stop offset="1" stop-color="#ff6b4a"/></linearGradient></defs><rect x="18" y="18" width="476" height="476" rx="112" fill="url(#b)" stroke="#6475ff" stroke-width="8"/><path d="M18 190C94 56 244 22 356 28C248 63 148 126 98 244C71 307 64 371 75 494H18Z" fill="#7a36ff" opacity=".9"/><path d="M494 318C439 426 334 483 212 494C316 448 390 369 420 270C444 192 439 102 412 18H494Z" fill="#d92bdf" opacity=".75"/><rect x="96" y="96" width="320" height="320" rx="72" fill="#0c133d" stroke="#f4f5ff" stroke-width="28"/><circle cx="360" cy="150" r="25" fill="#ff6b70"/><path d="M271 135L158 270H251L224 383L361 229H266Z" fill="url(#g)"/></svg>';
  const getAppIcon = () => nativeImage.createFromDataURL('data:image/svg+xml;base64,' + Buffer.from(APP_ICON_SVG).toString('base64'));

  let settings = loadSettings();

  function refreshUpdateTimer() {
    if (updateTimer) {
      clearInterval(updateTimer);
      updateTimer = null;
    }
    if (settings.automaticUpdateChecks) {
      updateTimer = setInterval(() => checkForUpdates(false), 6 * 60 * 60 * 1000);
    }
  }

  function notify(title, body, onClick) {
    if (!settings.notifications || !Notification.isSupported()) return;
    const notification = new Notification({ title, body });
    if (onClick) notification.on('click', onClick);
    notification.show();
  }

  function focusMainWindow() {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  }

  function getTrayIcon() {
    return getAppIcon();
  }

  function buildTrayMenu() {
    if (!tray) return;
    tray.setContextMenu(Menu.buildFromTemplate([
      { label: 'Open InstaPower', click: focusMainWindow },
      { type: 'separator' },
      { label: 'Notifications', type: 'checkbox', checked: settings.notifications, click: (item) => { settings = saveSettings({ ...settings, notifications: item.checked }); buildTrayMenu(); } },
      { label: 'Launch at Windows startup', type: 'checkbox', checked: settings.launchAtLogin, click: (item) => { settings = saveSettings({ ...settings, launchAtLogin: item.checked }); buildTrayMenu(); } },
      { label: 'Minimize to tray on close', type: 'checkbox', checked: settings.minimizeToTray, click: (item) => { settings = saveSettings({ ...settings, minimizeToTray: item.checked }); buildTrayMenu(); } },
      { label: 'Settings', click: openSettings },
      { label: 'Check for updates', click: () => checkForUpdates(true) },
      { type: 'separator' },
      { label: 'Quit InstaPower', click: () => { isQuitting = true; app.quit(); } },
    ]));
  }

  function createTray() {
    if (tray) return;
    tray = new Tray(getTrayIcon());
    tray.setToolTip('InstaPower');
    tray.on('click', focusMainWindow);
    buildTrayMenu();
  }

  function settingsHtml() {
    const current = JSON.stringify(settings).replace(/</g, '\\u003c');
    return '<!doctype html><html><head><meta charset="UTF-8">' +
      '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; script-src \'unsafe-inline\';">' +
      '<title>InstaPower Settings</title><style>' +
      ':root{color-scheme:dark;font-family:"Segoe UI",system-ui,sans-serif}body{margin:0;background:#111;color:#f5f5f5}' +
      'main{max-width:680px;margin:0 auto;padding:28px 30px 32px}h1{margin:0 0 6px;font-size:26px}p{color:#aaa;line-height:1.5}' +
      'section{margin-top:24px;padding:18px;border:1px solid #2a2a2a;border-radius:12px;background:#171717}' +
      'label{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:14px 0;border-bottom:1px solid #292929}label:last-child{border-bottom:0}' +
      '.copy{flex:1}.title{display:block;font-weight:600;margin-bottom:4px}.desc{color:#999;font-size:13px}input{width:18px;height:18px;accent-color:#e1306c}' +
      'button{margin-top:18px;padding:10px 15px;border:0;border-radius:8px;background:#e1306c;color:white;font-weight:600;cursor:pointer}.secondary{background:#2b2b2b;margin-left:8px}.version{margin-top:20px;color:#777;font-size:12px}' +
      '</style></head><body><main><h1>InstaPower Settings</h1>' +
      '<p>Control Windows integration, notifications, tray behavior, and update checks. Instagram account data remains in the dedicated browser session.</p>' +
      '<section>' +
      '<label><span class="copy"><span class="title">Launch at Windows startup</span><span class="desc">Start InstaPower automatically when you sign in to Windows.</span></span><input id="launchAtLogin" type="checkbox"></label>' +
      '<label><span class="copy"><span class="title">Minimize to tray on close</span><span class="desc">Keep InstaPower running in the notification area instead of quitting.</span></span><input id="minimizeToTray" type="checkbox"></label>' +
      '<label><span class="copy"><span class="title">Desktop notifications</span><span class="desc">Allow InstaPower to show native Windows notifications for app events.</span></span><input id="notifications" type="checkbox"></label>' +
      '<label><span class="copy"><span class="title">Automatic update checks</span><span class="desc">Check GitHub periodically for a newer InstaPower release.</span></span><input id="automaticUpdateChecks" type="checkbox"></label>' +
      '</section><button id="save">Save settings</button><button id="updates" class="secondary">Check for updates</button>' +
      '<div class="version">InstaPower v__VERSION__</div></main><script>' +
      'const settings=__SETTINGS__;for(const key of Object.keys(settings)){const el=document.getElementById(key);if(el)el.checked=Boolean(settings[key]);}' +
      'function send(action,payload){location.href="instapower://settings/"+action+"?"+encodeURIComponent(JSON.stringify(payload||{}));}' +
      'document.getElementById("save").onclick=()=>{const next={};for(const key of Object.keys(settings)){const el=document.getElementById(key);next[key]=Boolean(el&&el.checked);}send("save",next);};' +
      'document.getElementById("updates").onclick=()=>send("check-updates");</script></body></html>'
      .replace('__VERSION__', app.getVersion())
      .replace('__SETTINGS__', current);
  }

  function openSettings() {
    if (settingsWindow && !settingsWindow.isDestroyed()) {
      settingsWindow.show();
      settingsWindow.focus();
      return;
    }

    settingsWindow = new BrowserWindow({
      name: 'instapower-settings',
      width: 720,
      height: 610,
      minWidth: 600,
      minHeight: 500,
      parent: mainWindow || undefined,
      show: false,
      backgroundColor: '#111111',
      icon: getAppIcon(),
      webPreferences: { nodeIntegration: false, contextIsolation: true, sandbox: true },
    });

    settingsWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
    settingsWindow.webContents.on('will-navigate', (event, url) => {
      if (!url.startsWith('instapower://settings/')) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      const parsed = new URL(url);
      const action = parsed.pathname.replace(/^\//, '');
      let payload = {};
      try { payload = parsed.search ? JSON.parse(decodeURIComponent(parsed.search.slice(1))) : {}; } catch { return; }

      if (action === 'save') {
        settings = saveSettings(payload);
        buildTrayMenu();
        settingsWindow.close();
      } else if (action === 'check-updates') {
        checkForUpdates(true);
      }
    });

    settingsWindow.on('closed', () => { settingsWindow = null; });
    settingsWindow.loadURL('data:text/html;charset=UTF-8,' + encodeURIComponent(settingsHtml()));
    settingsWindow.once('ready-to-show', () => settingsWindow.show());
  }

  function compareVersions(a, b) {
    const normalize = (value) => String(value).replace(/^v/, '').split('.').map((n) => Number.parseInt(n, 10) || 0);
    const av = normalize(a);
    const bv = normalize(b);
    for (let i = 0; i < 3; i += 1) {
      if (av[i] !== bv[i]) return av[i] > bv[i] ? 1 : -1;
    }
    return 0;
  }

  function checkForUpdates(manual = false) {
    const request = https.get(
      'https://api.github.com/repos/ThePowerUsers/InstaPower/releases/latest',
      { headers: { 'User-Agent': 'InstaPower/' + app.getVersion(), Accept: 'application/vnd.github+json' } },
      (response) => {
        let body = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => { body += chunk; });
        response.on('end', () => {
          if (response.statusCode !== 200) {
            if (manual) dialog.showMessageBox({ type: 'warning', title: 'Update check failed', message: 'GitHub did not return the latest release information.' });
            return;
          }
          try {
            const release = JSON.parse(body);
            if (release.tag_name && compareVersions(release.tag_name, app.getVersion()) > 0) {
              notify('InstaPower update available', 'Version ' + release.tag_name + ' is available.', () => shell.openExternal(release.html_url));
              if (manual) {
                dialog.showMessageBox({
                  type: 'info',
                  title: 'Update available',
                  message: 'InstaPower ' + release.tag_name + ' is available.',
                  detail: 'Open the GitHub release page to download the latest Windows installer or portable build?',
                  buttons: ['Open release', 'Later'],
                  defaultId: 0,
                }).then(({ response: choice }) => { if (choice === 0) shell.openExternal(release.html_url); });
              }
            } else if (manual) {
              dialog.showMessageBox({ type: 'info', title: 'You are up to date', message: 'InstaPower ' + app.getVersion() + ' is the latest release.' });
            }
          } catch {
            if (manual) dialog.showMessageBox({ type: 'warning', title: 'Update check failed', message: 'The latest release response could not be read.' });
          }
        });
      },
    );
    request.on('error', () => {
      if (manual) dialog.showMessageBox({ type: 'warning', title: 'Update check failed', message: 'Could not reach GitHub. Check your internet connection and try again.' });
    });
    request.setTimeout(10000, () => request.destroy());
  }

  function registerShortcuts() {
    mainWindow.webContents.on('before-input-event', (event, input) => {
      if ((!input.control && !input.meta) || !input.shift || input.type !== 'keyDown') return;
      const key = input.key.toLowerCase();
      if (key === 's') { event.preventDefault(); openSettings(); }
      else if (key === 'r') { event.preventDefault(); mainWindow.webContents.reload(); }
      else if (key === 'm') { event.preventDefault(); mainWindow.minimize(); }
    });
  }

  function createWindow() {
    mainWindow = new BrowserWindow({
      name: 'instapower-main',
      width: 1280,
      height: 800,
      minWidth: 900,
      minHeight: 600,
      windowStatePersistence: true,
      show: false,
      backgroundColor: '#0b0b0b',
      icon: getAppIcon(256),
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        partition: 'persist:instagram',
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
      },
    });

    mainWindow.once('ready-to-show', () => { if (mainWindow && !mainWindow.isDestroyed()) mainWindow.show(); });

    mainWindow.webContents.on('did-fail-load', (_event, errorCode, errorDescription) => {
      if (errorCode !== -3) console.error('Instagram failed to load: ' + errorCode + ' - ' + errorDescription);
    });

    // Only grant browser permissions to the trusted Instagram origin.
    mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
      const url = webContents.getURL();
      callback(permission === 'notifications' && url.startsWith('https://www.instagram.com/'));
    });

    // Do not allow insecure HTTP resources inside the remote Instagram session.
    mainWindow.webContents.session.webRequest.onBeforeRequest((details, callback) => {
      callback({ cancel: details.url.startsWith('http://') });
    });

    mainWindow.webContents.on('render-process-gone', (_event, details) => {
      if (details.reason !== 'clean-exit' && mainWindow && !mainWindow.isDestroyed()) {
        setTimeout(() => { if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.reload(); }, 1000);
      }
    });

    mainWindow.webContents.session.on('will-download', (_event, item) => {
      const filename = item.getFilename();
      const savePath = dialog.showSaveDialogSync(mainWindow, { title: 'Save Instagram download', defaultPath: filename });
      if (!savePath) { item.cancel(); return; }
      item.setSavePath(savePath);
      item.once('done', (_event, state) => {
        if (state === 'completed') notify('Download complete', filename, () => shell.openPath(savePath));
      });
    });

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https://www.instagram.com/') || url.startsWith('https://instagram.com/')) return { action: 'allow' };
      shell.openExternal(url);
      return { action: 'deny' };
    });

    registerShortcuts();
    mainWindow.loadURL('https://www.instagram.com/');

    mainWindow.on('close', (event) => {
      if (!isQuitting && settings.minimizeToTray) { event.preventDefault(); mainWindow.hide(); }
    });

    mainWindow.on('closed', () => { mainWindow = null; });
  }

  app.on('second-instance', () => focusMainWindow());

  app.whenReady().then(() => {
    settings = saveSettings(settings);
    createTray();
    createWindow();

    refreshUpdateTimer();
    if (settings.automaticUpdateChecks) {
      setTimeout(() => checkForUpdates(false), 15000);
    }

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
      else focusMainWindow();
    });
  });

  app.on('will-quit', () => {
    isQuitting = true;
    if (updateTimer) clearInterval(updateTimer);
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin' && !settings.minimizeToTray) app.quit();
  });
}
