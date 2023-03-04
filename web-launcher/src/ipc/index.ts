import { IpcCode, IpcRequest } from "shared/types/ipc";

let ipcChannel: any = null;

export const initIpc = (): { device: string } => {
    try {
        const { ipcRenderer } = window.require('electron');
        ipcChannel = ipcRenderer;
        ipcSend(IpcCode.CHECK_CONNECTION);
        return { device: "launcher" };
    } catch (err) {
        return { device: "browser" };
    }
}

export const ipcSend = (code: IpcCode, data?: IpcRequest) => {
    if (!ipcChannel) {
        return;
    }
    
    ipcChannel.send(code, JSON.stringify(data));
}