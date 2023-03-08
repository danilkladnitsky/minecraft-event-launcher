const { ipcMain } = require('electron');

import { startGame } from "../game";
import { PlayRequest, User } from "../types";
import { IpcCode } from "./ipc";

import { app } from "electron";

let gameInstance;

ipcMain.on(IpcCode.CHECK_CONNECTION, () => {
    console.log("web launcher was connected");
});

ipcMain.on(IpcCode.CLOSE_GAME, () => {
    gameInstance && gameInstance.kill();
});

ipcMain.on(IpcCode.CLOSE_ALL, () => {
    app.quit();
    gameInstance && gameInstance.kill();
});

ipcMain.on(IpcCode.RUN_GAME, async (event, data: string) => {
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

    gameInstance  = await startGame(player);
});
