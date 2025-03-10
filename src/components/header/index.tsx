"use client";

import styled from "styled-components";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import LoginButton from "./LoginButton";
import { useEffect, useState } from "react";
import { getUser } from "@/apis/auth/auth";
import User from "./User";
import Logo from "@svg/Logo";
import {
    getLocalStorage,
    LOCALSTORAGE_KEYS,
    removeLocalStorage,
} from "@/utils/storageUtils";
import { MenuOutlined } from "@ant-design/icons";
import { Menus } from "@/core/Menu";
import { useDeviceSize } from "@components/DeviceContext";
import { Flex } from "antd";
import LogoutButton from "./LogoutButton";
import GuideButton from "./GuideButton";
import useToast from "@/hooks/useToast";

type HeaderProps = {
    onOpen: () => void;
};
export default function Header({ onOpen }: HeaderProps) {
    const { setUser, resetUserState, userData } = useUser();
    const { isUnderTablet } = useDeviceSize();
    const showToast = useToast();

    useEffect(() => {
        const access_token = getLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
        console.log(">> ", access_token);

        if (access_token) {
            getUser()
                .then((res) => {
                    const { success, data } = res.data;
                    console.log(data);
                    if (!success) {
                        console.log("유저 조회에 실패하였습니다.");

                        removeLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
                        resetUserState();
                        return;
                    }

                    // 성공, 저장
                    setUser(data);
                })
                .catch((error) => {
                    // 🔹 401 Unauthorized일 경우 로그아웃 처리
                    if (error.response?.status === 401) {
                        showToast({
                            title: "세션이 만료되었습니다. 다시 로그인해주세요.",
                            subTitle: "",
                            iconName: "TickCircle",
                        });
                        removeLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
                        resetUserState();
                    } else {
                        console.log(
                            "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
                        );
                    }
                });
        }
    }, []);

    return (
        <HeaderContainer>
            <HeaderWrapper>
                <HeaderLeftContainer>
                    <StyledNavLink href="/">
                        <Logo style={{ width: "40px" }} />
                    </StyledNavLink>
                    {!isUnderTablet && (
                        <TabBarContainer>
                            {Menus.map((menu, idx) => (
                                <StyledNavLink href={menu.path} key={idx}>
                                    {menu.label}
                                </StyledNavLink>
                            ))}
                        </TabBarContainer>
                    )}
                </HeaderLeftContainer>

                <HeaderRightContainer>
                    {isUnderTablet ? (
                        <StyledMenuIcon onClick={onOpen} />
                    ) : userData.isLogin ? (
                        <Flex gap={16}>
                            <GuideButton />
                            <User />
                            <LogoutButton isUnderTablet={false} />
                        </Flex>
                    ) : (
                        <Flex gap={16}>
                            <GuideButton />
                            <LoginButton
                                id="sidebar-login-button"
                                isUnderTablet={false}
                            />
                        </Flex>
                    )}
                </HeaderRightContainer>
            </HeaderWrapper>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
    width: 100%;
    background: #fff;

    height: 52px;

    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(40px);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.02);

    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    z-index: 10;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    height: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 20px;

    ${({ theme }) => theme.mixins.flexBox("row", "space-between")};
    flex-wrap: wrap;
`;

const StyledNavLink = styled(Link)`
    ${({ theme }) => theme.fonts.body2};
    ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.G_400};
    cursor: pointer;
    height: 100%;
    text-decoration: none;

    &.active {
        ${({ theme }) => theme.fonts.semibold};
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const TabBarContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    gap: 30px;

    margin-left: 60px;
`;

const HeaderLeftContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
`;

const HeaderRightContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    gap: 10px;
`;

const StyledMenuIcon = styled(MenuOutlined)`
    color: #3e4151 !important;
`;
