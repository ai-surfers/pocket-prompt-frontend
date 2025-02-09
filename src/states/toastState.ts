import { atom } from "recoil";
import * as Icons from "iconsax-react";

interface ToastStateType {
    isOpen: boolean;
    title: string;
    subTitle: string;
    iconName: keyof typeof Icons | "";
}

export const toastState = atom<ToastStateType>({
    key: "toastState",
    default: {
        isOpen: false,
        title: "",
        subTitle: "",
        iconName: "",
    },
});
