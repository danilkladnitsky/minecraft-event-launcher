import Client from "./launcher.js";
import { User } from "../types/index";

import * as path from "path";

export async function startGame(user: User) {
    const root = path.resolve(__dirname, "../../minecraft");

    console.log("игра запустится из ", root);
    
    const launcher = new Client();
    const opts = {
        authorization: user,
        root,
        detached: false,
        version: {
            number: "1.18.1",
            type: "release"
        },
        memory: {
            max: `${user.minGb || 2}G`,
            min: `${user.maxGb || 1}G`
        },
    }

    launcher.on('debug', (e) => console.log(e));
    launcher.on('data', (e) => console.log(e));
    return await launcher.launch(opts);

}