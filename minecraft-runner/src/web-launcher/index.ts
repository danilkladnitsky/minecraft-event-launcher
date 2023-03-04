import { IpcCode } from "./ipc";

const {ipcMain} = require('electron')

ipcMain.on(IpcCode.CHECK_CONNECTION, (event, payload) => {
    console.log("web launcher was connected", payload);
});

ipcMain.on(IpcCode.SEND_ACCESS_TOKEN, (event, payload: string) => {
    const token = JSON.parse(payload);
    console.log("token was received", token);
});
