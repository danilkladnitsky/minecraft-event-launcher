const { ipcMain } = require('electron');

import { startGame } from "../game";
import { PlayRequest, User } from "../types";
import { IpcCode } from "./ipc";

import { app } from "electron";

ipcMain.on(IpcCode.CHECK_CONNECTION, (event, payload) => {
    console.log("web launcher was connected");
});

ipcMain.on(IpcCode.CLOSE_GAME, (event, payload) => {
    app.quit();
});

ipcMain.on(IpcCode.RUN_GAME, (event, data: string) => {
    const { payload }: { payload: PlayRequest } = JSON.parse(data);
    
    console.log("running game by ", payload.nickname);

    const player: User = {
        access_token: payload.accessToken,
        client_token: payload.accessToken,
        name: payload.nickname,
        uuid: payload.uuid,
        maxGb: payload.maxGb,
        minGb: payload.minGb
    }

    startGame(player);
});
