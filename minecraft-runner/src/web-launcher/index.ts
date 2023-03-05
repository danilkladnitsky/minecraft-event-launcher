const { ipcMain } = require('electron');

import { startGame } from "../game";
import { PlayRequest, User } from "../types";
import { IpcCode } from "./ipc";

ipcMain.on(IpcCode.CHECK_CONNECTION, (event, payload) => {
    console.log("web launcher was connected");
});

ipcMain.on(IpcCode.SEND_ACCESS_TOKEN, (event, payload: string) => {
    const token = JSON.parse(payload);
});

ipcMain.on(IpcCode.RUN_GAME, (event, data: string) => {
    const { payload } : { payload: PlayRequest }  = JSON.parse(data);

    const player: User = {
        access_token: payload.accessToken,
        client_token: payload.accessToken,
        name: payload.nickname,
        uuid: payload.uuid
    }

    startGame(player);
});
