import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const keywordState = atom({
    key: "keywordState",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

export const searchedKeywordState = atom({
    key: "searchedKeywordState",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

export const searchedCategoryState = atom({
    key: "searchedCategoryState",
    default: "",
    effects_UNSTABLE: [persistAtom],
});
