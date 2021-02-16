const { ipcRenderer } = require('electron');

ipcRenderer.on('asynchronous-reply', (event: any, arg: any) => {
  console.log(arg);
});

ipcRenderer.send('open-window', 'ping');
