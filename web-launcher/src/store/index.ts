import { LoginRes, ROUTES } from "api/AuthApi";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authenticated: false,
    authenticate: async (nickname: string, password: string) => {
        const [method, url] = ROUTES.LOGIN();
        const { ok, json: getData } = await fetch(url, { method });

        if (!ok) {
            return set(() => ({ authenticated: false }));
            // TODO: add error message
        }

        const { token }: LoginRes = await getData();
        console.log(token);

        set(() => ({ authenticated: true }));
    },
}));

export const useUserStore = create((set) => ({
    nickname: null,
    setNickname: (nickname: string) => set(() => ({ nickname })),
}));