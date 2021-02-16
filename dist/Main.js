"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class Main {
    static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }
    static onClose() {
        Main.mainWindow = null;
    }
    static onReady() {
        Main.mainWindow = new Main.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        });
        if (Main.mainWindow) {
            Main.mainWindow.loadURL('file://' + __dirname + '/index.html');
            Main.mainWindow.on('closed', Main.onClose);
        }
    }
    static main(app, browserWindow) {
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
        electron_1.ipcMain.on('open-window', (event, arg) => {
            console.log(arg);
            event.reply('asynchronous-reply', 'pong');
        });
    }
}
exports.default = Main;
//# sourceMappingURL=Main.js.map