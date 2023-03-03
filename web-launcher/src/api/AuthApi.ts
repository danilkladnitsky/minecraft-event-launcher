export const ROUTES = {
    LOGIN: () => ["POST", "auth/login"],
    ACCESS_TOKEN: () => ["POST", "auth/access-token"],

}

export type LoginRes = {
    nickname: string;
    token: string;
    id: number;
}