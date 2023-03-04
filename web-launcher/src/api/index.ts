import { FetchRequest, FetchResponse } from "shared/types/api";

const API_HOST = process.env.API_HOST;

const default_headers = {
    "Content-Type": "application/json; charset=utf-8"
}

export const fetchApi = async <D>(req: FetchRequest, options?: RequestInit): Promise<FetchResponse<D>> => {
    const path = req[1];
    const method = req[0];
    const url = `${API_HOST}/${path}`;

    try {
        const response = await fetch(url, { method, headers: default_headers, ...options });
        if (!response.ok) {
            const error = await response.json();
            return {
                ok: false,
                error: error?.msg || error.toString()
            }
        }

        return {
                ok: true,
                data: response.json() as D
        }

    } catch (err) {
        return {
                ok: false,
                error: err.toString()
            }
    }
}