// components/Toast.js
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { toastState } from "@/states/toastState";
import styled from "styled-components";
import Text from "../Text/Text";
import Timer from "@/assets/svg/home/Timer";
import Close from "@/assets/svg/home/Close";

const Toast = () => {
    const [{ isOpen, title, subTitle }, setToastState] =
        useRecoilState(toastState);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setToastState({ isOpen: false, title: "", subTitle: "" });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isOpen, setToastState]);

    const closeToast = () => {
        setToastState({ isOpen: false, title: "", subTitle: "" });
    };

    return (
        <ToastContainer isOpen={isOpen}>
            <Wrapper>
                <Timer />
                <TitlesWrapper>
                    <Text font="h2_20_semi" color="white">
                        {title}
                    </Text>
                    <Text font="b3_14_reg" color="white">
                        {subTitle}
                    </Text>
                </TitlesWrapper>
            </Wrapper>
            <Close onClick={closeToast} />
        </ToastContainer>
    );
};

export default Toast;

const ToastContainer = styled.div<{ isOpen: boolean }>`
    ${({ theme }) => theme.mixins.flexBox("row", "space-between", "center")}
    position: fixed;
    width: 512px;
    height: 82px;
    bottom: 80px;
    left: 80px;
    background-color: ${({ theme }) => theme.colors.G_900};
    color: ${({ theme }) => theme.colors.white};
    padding: 16px;
    border-radius: 12px;
    align-items: center;
    gap: 8px;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    transition: opacity 0.3s;
    visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
`;

const Wrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row")}
    gap: 20px;
`;

const TitlesWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "start")}
`;
