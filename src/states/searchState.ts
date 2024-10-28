import { atom } from "recoil";

export const keywordState = atom({
    key: "keywordState",
    default: "",
});

export const searchedKeywordState = atom({
    key: "searchedKeywordState",
    default: "",
});
