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
