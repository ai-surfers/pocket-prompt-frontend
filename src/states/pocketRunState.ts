import { PocketRunReturnTypes } from "@/hooks/mutations/pocketRun/usePocketRun";
import { atom } from "recoil";

export const pocketRunState = atom<PocketRunReturnTypes[]>({
    key: "pocketRunState",
    default: [
        {
            response: "",
            model: "",
            context: {},
        },
    ],
});

export const pocketRunLoadingState = atom({
    key: "pocketRunLoadingState",
    default: false,
});

// 이미지 포켓 런 응답을 위한 상태
export const imgPocketRunState = atom<PocketRunReturnTypes[]>({
    key: "imgPocketRunState",
    default: [
        {
            response: "",
            model: "",
            context: {},
        },
    ],
});

// 이미지 포켓 런 로딩 상태
export const imgPocketRunLoadingState = atom({
    key: "imgPocketRunLoadingState",
    default: false,
});
