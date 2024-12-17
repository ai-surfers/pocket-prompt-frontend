import { useSetRecoilState } from "recoil";
import { toastState } from "@/states/toastState";
import * as Icons from "iconsax-react";
interface ToastStateType {
    title: string;
    subTitle: string;
    iconName: keyof typeof Icons | "";
}

const useToast = () => {
    const setToast = useSetRecoilState(toastState);

    const showToast = ({ title, subTitle, iconName }: ToastStateType) => {
        setToast({ isOpen: true, title, subTitle, iconName });
    };

    return showToast;
};

export default useToast;
