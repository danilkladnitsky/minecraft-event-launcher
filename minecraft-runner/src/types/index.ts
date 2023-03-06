export type PlayRequest = {
    nickname: string;
    uuid: string;
    accessToken: string;
    minGb: number;
    maxGb: number;
}

export type User = {
    name: string;
    uuid: string;
    access_token: string;
    client_token: string;
    minGb: number;
    maxGb: number;
}