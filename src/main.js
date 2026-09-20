const { app, BrowserWindow } = require('electron');

// Keep Veyra to one running instance.
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  // Give Windows a stable application identity for notifications/taskbar integration.
  app.setAppUserModelId('com.thepowerusers.veyra');

  // Handle creating/removing shortcuts on Windows when installing/uninstalling.
  if (require('electron-squirrel-startup')) {
    app.quit();
  }

  let mainWindow = null;

  const createWindow = () => {
    mainWindow = new BrowserWindow({
      name: 'veyra-main',
      width: 1280,
      height: 800,
      minWidth: 900,
      minHeight: 600,

      // Electron 44 can persist window bounds/display state for us.
      windowStatePersistence: true,

      // Avoid showing a blank white window while Chromium is starting.
      show: false,
      backgroundColor: '#0b0b0b',

      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,

        // Give Veyra its own persistent Instagram session.
        partition: 'persist:instagram',

        // Keep remote Instagram content isolated from Node.js.
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
      },
    });

    // Show the window once the first page has rendered enough to display.
    mainWindow.once('ready-to-show', () => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.show();
      }
    });

    // If Instagram fails temporarily, report it instead of silently failing.
    mainWindow.webContents.on('did-fail-load', (_event, errorCode, errorDescription) => {
      if (errorCode !== -3) {
        console.error(`Instagram failed to load: ${errorCode} - ${errorDescription}`);
      }
    });

    // Recover from an unexpected renderer crash.
    mainWindow.webContents.on('render-process-gone', (_event, details) => {
      if (details.reason !== 'clean-exit' && mainWindow && !mainWindow.isDestroyed()) {
        setTimeout(() => {
          if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.reload();
          }
        }, 1000);
      }
    });

    mainWindow.loadURL('https://www.instagram.com/');

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  };

  // If the user launches Veyra again, focus the existing window.
  app.on('second-instance', () => {
    if (!mainWindow || mainWindow.isDestroyed()) {
      return;
    }

    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
    mainWindow.focus();
  });

  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}
