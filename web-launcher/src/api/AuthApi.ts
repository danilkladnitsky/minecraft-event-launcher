import { API_HOST } from "api";

export const ROUTES = {
    LOGIN: () => ["POST", API_HOST + "auth/login"],
    ACCESS_TOKEN: () => ["POST", API_HOST + "auth/access-token"],

}

export type LoginRes = {
    nickname: string;
    token: string;
    id: number;
}