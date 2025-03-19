// 인기순, 최신순 정렬
import { SortType } from "@/apis/prompt/prompt.model";
import { atom } from "recoil";
// 예: SortType이 "created_at" | "star" | "relevance" 등으로 정의돼 있다고 가정

export const sortTypeState = atom<SortType>({
    key: "sortTypeState",
    default: "created_at", // 기본값
});
