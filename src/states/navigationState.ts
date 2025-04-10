import { atom } from "recoil";

export const prevPathState = atom<string>({
    key: "prevPathState",
    default: "",
});
