export enum IpcCode {
    RUN_GAME = "run_game",
    SEND_ACCESS_TOKEN = "send_access_token",
    CLOSE_GAME = "close_game",
    CHECK_CONNECTION = "check_connection",
    LOG = "log"

}

export type IpcRequest = {
    code: IpcCode;
    payload?: Record<string, any>;
    message?: string;
}