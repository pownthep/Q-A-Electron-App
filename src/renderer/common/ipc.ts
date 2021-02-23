import { IpcRendererEvent } from 'electron';

export function registerIPCListeners<T> (eventName: string, callback: (_event: IpcRendererEvent, reply: T) => void) {
  global.ipcRenderer.addListener(
    eventName,
    callback
  );
}
export function sendIPCMessage<T> (channelName: string, message: T) : void {
  global.ipcRenderer.send(channelName, message);
}
