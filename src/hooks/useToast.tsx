import { useSetRecoilState } from "recoil";
import { toastState } from "@/states/toastState";

const useToast = () => {
    const setToast = useSetRecoilState(toastState);

    const showToast = (title: string, subTitle: string) => {
        setToast({ isOpen: true, title, subTitle });
    };

    return showToast;
};

export default useToast;
