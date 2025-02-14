// 인기순, 최신순 정렬
import { atom } from "recoil";
import { SortType } from "@/apis/prompt/prompt.model";

export const sortTypeState = atom<SortType>({
    key: "sortTypeState",
    default: "created_at",
});
