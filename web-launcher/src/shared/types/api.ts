export type FetchRequest = ["GET" | "POST", string];

export type LoginRes = {
    nickname: string;
    token: string;
    id: number;
}

export type FetchResponse<D> = {
    ok: boolean,
    data?: D,
    error?: string
};

