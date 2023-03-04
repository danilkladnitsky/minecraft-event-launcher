import { fetchApi } from "api";
import { ROUTES } from "api/AuthApi";
import { ipcSend } from "ipc";
import { AccessTokenResponse, LoginRes, VerifyTokenResponse } from "shared/types/api";
import { IpcCode } from "shared/types/ipc";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authenticated: false,
    loginInProcess: false,
    error: null,
    verifyStatus: "loading",
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
        set(() => ({ verifyStatus: "loading" }));
        const { ok, data } = await fetchApi<VerifyTokenResponse>(ROUTES.VERIFY_TOKEN());

        if (!ok || !data) {
            return set(() => ({ authenticated: ok, verifyStatus: "idle" }));
        }

        set(() => ({ authenticated: ok, verifyStatus: "idle" }));
    },
    logout: async () => {
        localStorage.clear();
        set(() => ({ authenticated: false }));
    }
}));

export const useUserStore = create((set) => ({
    setNickname: (nickname: string) => set(() => ({ nickname })),
}));

export const useIpcStore = create((set) => ({
    device: "browser",
    setDevice: (device: string) => set(() => ({ device })),
    launcherError: null,
    playStatus: "idle",
    sendPlaySignal: async () => {
        const { ok, data } = await fetchApi<AccessTokenResponse>(ROUTES.ACCESS_TOKEN());
        set(({ playStatus: "loading" }));

        if (!ok || !data) {
            set(({ playStatus: "error" }));
            return set(() => ({ launcherError: "Ошибка при получении accessToken. Попробуйте перезайти в игру." }));
        }

        set(({ playStatus: "success" }));
        ipcSend(IpcCode.RUN_GAME, { payload: data });
    },
}));