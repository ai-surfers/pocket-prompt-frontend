import { atom } from "recoil";

export const toastState = atom({
    key: "toastState",
    default: {
        isOpen: false,
        title: "",
        subTitle: "",
    },
});
