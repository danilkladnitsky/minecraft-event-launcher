import { fetchApi } from "api";
import { ROUTES } from "api/AuthApi";
import { LoginRes } from "shared/types/api";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authenticated: false,
    loginInProcess: false,
    error: null,
    clearError: () => set(() => ({ error: null })),
    authenticate: async (nickname: string, password: string) => {
        set(() => ({ loginInProcess: true }));
        const { ok, data, error } = await fetchApi<LoginRes>(ROUTES.LOGIN(), { body: JSON.stringify({ nickname, password }) });

        if (!ok || !data) {
            return set(() => ({ authenticated: false , loginInProcess: false, error }));
        }

        const { token } = data;

        set(() => ({ authenticated: true, loginInProcess: false }));
    },
}));

export const useUserStore = create((set) => ({
    nickname: null,
    setNickname: (nickname: string) => set(() => ({ nickname })),
}));