import { LoginRes, ROUTES } from "api/AuthApi";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authenticated: false,
    loginInProcess: false,
    error: null,
    clearError: () => set(() => ({ error: null })),
    authenticate: async (nickname: string, password: string) => {
        set(() => ({ loginInProcess: true }));
        const [method, url] = ROUTES.LOGIN();
        const result = await fetch(url, { method, body: JSON.stringify({nickname, password}) });

        if (!result.ok) {
            const error = await result.json();
            
            return set(() => ({ authenticated: false , loginInProcess: false, error: error?.msg || error.toString() }));
            // TODO: add error message
        }

        const { token }: LoginRes = await result.json();

        set(() => ({ authenticated: true, loginInProcess: false }));
    },
}));

export const useUserStore = create((set) => ({
    nickname: null,
    setNickname: (nickname: string) => set(() => ({ nickname })),
}));