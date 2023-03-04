import { FetchRequest } from "shared/types/api";

export const ROUTES = {
    LOGIN: (): FetchRequest => ["POST", "auth/login"],
    ACCESS_TOKEN: (): FetchRequest => ["POST", "auth/access-token"],
    VERIFY_TOKEN: (): FetchRequest => ["GET", "auth/verify-token"],

}
