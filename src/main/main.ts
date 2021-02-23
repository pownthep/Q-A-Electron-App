import { BrowserWindow, App, ipcMain } from 'electron';
import { join } from 'path';
import { format } from 'url';
import isDev from 'electron-is-dev';
import prepareNext from 'electron-next';
import { BrowserWindowConstructorOptions } from 'electron/main';
import { IpcMainEvent } from 'electron/common';
import { ipcArgurments, ipcReply } from '../types/common/index';

export default class Main {
  static mainWindow: BrowserWindow | null;
  static childWindow: BrowserWindow | null;
  static application: App;
  static BrowserWindow: typeof BrowserWindow;
  static readonly initialMainWindowOptions: BrowserWindowConstructorOptions = {
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  };

  static readonly initialChildWindowOptions: BrowserWindowConstructorOptions = {
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  };

  private static onWindowAllClosed () : void {
    if (process.platform !== 'darwin') {
      Main.application.quit();
    }
  }

  private static onClose () : void {
    Main.mainWindow = null;
  }

  private static async onReady () {
    if (!isDev) await prepareNext('./src/renderer', 3000);
    Main.mainWindow = new Main.BrowserWindow(Main.initialMainWindowOptions);
    if (Main.mainWindow) {
      const url:string = isDev
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

  private static createChildWindow (arg: any) : void {
    Main.childWindow = new Main.BrowserWindow(Main.initialChildWindowOptions);
    if (Main.childWindow) {
      const url: string = isDev
        ? 'http://localhost:3000/answer'
        : format({
          pathname: join(__dirname, '../src/renderer/out/answer.html'),
          protocol: 'file:',
          slashes: true
        });
      Main.childWindow.loadURL(url);
      Main.childWindow.once('ready-to-show', () : void => {
        Main.childWindow?.show();
        Main.childWindow?.webContents.send('question-index-reply', arg);
      });
      Main.childWindow.once('closed', () => { Main.childWindow = null; });
    }
  }

  static main (app: App, browserWindow: typeof BrowserWindow) : void {
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    Main.application.on('ready', Main.onReady);
    ipcMain.on('open-window', (event: IpcMainEvent, arg: ipcArgurments) => {
      if (!Main.childWindow) Main.createChildWindow(arg);
      else Main.childWindow?.webContents.send('question-index-reply', arg);
      const reply: ipcReply = { text: 'pong' };
      event.reply('open-window-reply', reply);
    });
  }
}
