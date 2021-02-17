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
    await prepareNext('./src/renderer', 3000);
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
