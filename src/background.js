'use strict'

import { app, protocol, BrowserWindow, shell, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
import fixPath from 'fix-path';
import {autoUpdater} from "electron-updater"

const log = require('electron-log');
log.transports.file.resolvePath = () => path.join(__dirname, '../../logs/main.log');
import {devtools} from "vue";
import {info} from "electron-log";
const isDevelopment = process.env.NODE_ENV !== 'production'


if (process.env.NODE_ENV === 'production') {
  fixPath();
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1100,
    height: 600,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()

  setTimeout(() => {
    autoUpdater.checkForUpdatesAndNotify()
  },10000)
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'darwin') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

autoUpdater.on('checking-for-update', (info) => {
  log.info("checkingUpdate");
})
autoUpdater.on('update-available', ({tag, version}) => {
  log.info("update available");
  const dialogOpts = {
    type: 'info',
    buttons: ['Download New Update', 'Cancel'],
    title: 'Application Update',
    message: 'Появилось новое обновление',
    detail:
        'Скачайте новое приложение и замените текущее, после замены приложения не забудьте выполнить в терминате команду: xattr -cr /Applications/sandboxhelper.app',
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) process.arch === 'x64' ? shell.openExternal(`https:/github.com/leosoft11/vue_sandbox_helper/releases/download/${tag}/sandboxhelper-${version}.dmg`) : shell.openExternal(`https:/github.com/leosoft11/vue_sandbox_helper/releases/download/${tag}/sandboxhelper-${version}-arm64.dmg`);
  })
})


// Методы для нормального обновление, но так как для нормального обновления необходима подпись приложения от Apple, просто оставлю это тут, сверху сделал костыль
// autoUpdater.on("update-not-available", (info) => {
//   log.info("update not available")
// });
//
// autoUpdater.on('error', (err) => {
//   log.info(`Ошибка обновления ${err}`);
// });
//
// autoUpdater.on('download-progress', (pre) => {
//   log.info('\n\ndownload progress')
//   log.info(pre)
// })
// autoUpdater.on('update-downloaded', (info) => {
//   log.info(info);
// })