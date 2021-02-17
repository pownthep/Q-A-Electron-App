// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IpcRenderer } from 'electron';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  // eslint-disable-next-line no-unused-vars
  namespace NodeJS {
    // eslint-disable-next-line no-unused-vars
    interface Global {
      ipcRenderer: IpcRenderer
    }
  }
}
