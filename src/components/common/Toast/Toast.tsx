"use client";

import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { toastState } from "@/states/toastState";
import styled from "styled-components";
import Text from "../Text/Text";
import Close from "@svg/Close";
import Icon from "../Icon";
import { useDeviceSize } from "@components/DeviceContext";

const Toast = () => {
    const [{ isOpen, title, subTitle, iconName }] = useRecoilState(toastState);

    const resetToastState = useResetRecoilState(toastState);
    const { isMobile } = useDeviceSize();

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                resetToastState();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isOpen, resetToastState]);

    const closeToast = () => {
        resetToastState();
    };

    if (isMobile) {
        return (
            <MobileContainer $isOpen={isOpen}>
                <Wrapper>
                    {iconName && (
                        <Icon name={iconName} size={36} color="white" />
                    )}
                    <TitlesWrapper>
                        <Text font="b2_16_semi" color="white">
                            {title}
                        </Text>
                        <Text font="c1_12_reg" color="G_300">
                            {subTitle}
                        </Text>
                    </TitlesWrapper>
                </Wrapper>
                <Close onClick={closeToast} />
            </MobileContainer>
        );
    }

    return (
        <ToastContainer $isOpen={isOpen}>
            <Wrapper>
                {iconName && (
                    <Icon name={iconName} size={36} color="white"></Icon>
                )}
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

const MobileContainer = styled.div<{
    $isOpen: boolean;
}>`
    ${({ theme }) => theme.mixins.flexBox("row", "space-between", "center")}
    width: 100vw;
    position: fixed;
    bottom: 68px;
    left: auto;
    padding: 16px;
    background-color: ${({ theme }) => theme.colors.G_900};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 12px;
    align-items: center;
    gap: 16px;
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    transition: opacity 0.3s;
    visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
`;

const ToastContainer = styled.div<{
    $isOpen: boolean;
}>`
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
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    transition: opacity 0.3s;
    visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
`;

const Wrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row")}
    gap: 20px;
`;

const TitlesWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "start")}
`;
