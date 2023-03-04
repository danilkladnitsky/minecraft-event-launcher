import { PlayRequest } from "src/types";
import { IpcCode } from "./ipc";

const {ipcMain} = require('electron')

ipcMain.on(IpcCode.CHECK_CONNECTION, (event, payload) => {
    console.log("web launcher was connected", payload);
});

ipcMain.on(IpcCode.SEND_ACCESS_TOKEN, (event, payload: string) => {
    const token = JSON.parse(payload);
    console.log("token was received", token);
});

ipcMain.on(IpcCode.RUN_GAME, (event, payload: string) => {
    const data: PlayRequest = JSON.parse(payload);
});
