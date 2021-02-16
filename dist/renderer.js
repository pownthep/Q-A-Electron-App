"use strict";
const { ipcRenderer } = require('electron');
ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg);
});
ipcRenderer.send('open-window', 'ping');
//# sourceMappingURL=renderer.js.map