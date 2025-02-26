// 인기순, 최신순 정렬
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const sortTypeState = atom({
    key: "sortTypeState",
    default: "created_at",
    effects_UNSTABLE: [persistAtom],
});
