export enum IpcCode {
    RUN_GAME = "run_game",
    SEND_ACCESS_TOKEN = "send_access_token",
    CLOSE_GAME = "close_game",
    CHECK_CONNECTION = "check_connection",
    LOG = "log",
    CLOSE_ALL = "close_all"
}

export type IpcRequest = {
    payload?: any;
    message?: string;
}