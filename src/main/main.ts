import { BrowserWindow, App, ipcMain } from 'electron';
import * as path from 'path';

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

  private static onReady () {
    Main.mainWindow = new Main.BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });
    if (Main.mainWindow) {
      Main.mainWindow.loadURL('file://' + __dirname + '/index.html');
      Main.mainWindow.on('closed', Main.onClose);
    }
  }

  static main (app: App, browserWindow: typeof BrowserWindow) {
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    Main.application.on('ready', Main.onReady);
    ipcMain.on('open-window', (event, arg) => {
      console.log(arg);
      event.reply('asynchronous-reply', 'pong');
    });
  }
}
