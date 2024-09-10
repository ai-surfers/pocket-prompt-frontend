import { UserResponse } from "@/apis/auth/auth.model";
import { atom } from "recoil";

type UserType = {
    isLogin: boolean;
    accessToken: string | null;
    user: UserResponse | null;
};

export const initialUserState = {
    isLogin: false,
    accessToken: null,
    user: null,
};

export const userState = atom<UserType>({
    key: "userState",
    default: initialUserState,
});
