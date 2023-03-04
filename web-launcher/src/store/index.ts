import { fetchApi } from "api";
import { ROUTES } from "api/AuthApi";
import { ipcSend } from "ipc";
import { LoginRes, VerifyTokenResponse } from "shared/types/api";
import { IpcCode } from "shared/types/ipc";
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
        localStorage.setItem("token", token);
        ipcSend(IpcCode.SEND_ACCESS_TOKEN, { payload: token });
        set(() => ({ authenticated: true, loginInProcess: false }));
    },
    verifyToken: async () => {
        const { ok } = await fetchApi<VerifyTokenResponse>(ROUTES.VERIFY_TOKEN());
        set(() => ({ authenticated: ok }));
    }
}));

export const useUserStore = create((set) => ({
    nickname: null,
    setNickname: (nickname: string) => set(() => ({ nickname })),
}));

export const useIpcStore = create((set) => ({
    device: "browser",
    setDevice: (device: string) => set(() => ({ device })),
}));