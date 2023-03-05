const { Client } = require('minecraft-launcher-core');
import { User } from "../types/index";

export function startGame(user: User) {
    
    const launcher = new Client();
    const opts = {
        authorization: user,
        root: "./minecraft",
        version: {
            number: "1.14",
            type: "release"
        },
        memory: {
            max: "6G",
            min: "4G"
        }
    }

    launcher.launch(opts);
    launcher.on('debug', (e) => console.log(e));
    launcher.on('data', (e) => console.log(e));
}