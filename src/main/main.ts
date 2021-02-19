import { BrowserWindow, App, ipcMain } from 'electron';
import { join } from 'path';
import { format } from 'url';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';

export default class Main {
  static mainWindow: BrowserWindow | null;
  static childWindow: BrowserWindow | null;
  static application: App;
  static BrowserWindow: any;

  private static onWindowAllClosed () {
    if (process.platform !== 'darwin') {
      Main.application.quit();
    }
  }

  private static onClose () {
    Main.mainWindow = null;
  }

  private static async onReady () {
    if (!isDev) await prepareNext('./src/renderer', 3000);
    Main.mainWindow = new Main.BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: join(__dirname, 'preload.js')
      }
    });
    if (Main.mainWindow) {
      const url = isDev
        ? 'http://localhost:3000/'
        : format({
          pathname: join(__dirname, '../src/renderer/out/index.html'),
          protocol: 'file:',
          slashes: true
        });
      Main.mainWindow.loadURL(url);
      Main.mainWindow.on('closed', Main.onClose);
      Main.mainWindow.webContents.openDevTools();
    }
  }

  private static createAnswerWindow (arg: any) {
    Main.childWindow = new Main.BrowserWindow({
      parent: Main.mainWindow,
      webPreferences: {
        preload: join(__dirname, 'preload.js')
      }
    });
    if (Main.childWindow) {
      const url = isDev
        ? 'http://localhost:3000/answer'
        : format({
          pathname: join(__dirname, '../src/renderer/out/answer.html'),
          protocol: 'file:',
          slashes: true
        });
      Main.childWindow.loadURL(url);
      Main.childWindow.once('ready-to-show', () => {
        Main.childWindow?.show();
        Main.childWindow?.webContents.send('question-index-reply', arg);
      });
      Main.childWindow.once('closed', () => { Main.childWindow = null; });
    }
  }

  static main (app: App, browserWindow: typeof BrowserWindow) {
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    Main.application.on('ready', Main.onReady);
    ipcMain.on('open-window', (event, arg) => {
      if (!Main.childWindow) Main.createAnswerWindow(arg);
      else Main.childWindow?.webContents.send('question-index-reply', arg);
      event.reply('open-window-reply', 'pong');
    });
  }
}
