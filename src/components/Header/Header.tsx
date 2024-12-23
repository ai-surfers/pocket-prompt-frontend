import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import LoginButton from "./LoginButton/LoginButton";
import { useEffect } from "react";
import { getUser } from "@/apis/auth/auth";
import User from "./User/User";
import { Logo } from "@/assets/svg";
import {
    getLocalStorage,
    LOCALSTORAGE_KEYS,
    removeLocalStorage,
} from "@/utils/storageUtils";
import { MenuOutlined } from "@ant-design/icons";
import { Menus } from "@/core/Menu";
import useDeviceSize from "@/hooks/useDeviceSize";
import { Flex } from "antd";
import LogoutButton from "./LogoutButton/LogoutButton";

type HeaderProps = {
    onOpen: () => void;
};
export default function Header({ onOpen }: HeaderProps) {
    const { setUser, resetUserState, userData } = useUser();

    const { isUnderTablet } = useDeviceSize();

    useEffect(() => {
        const access_token = getLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
        console.log(">> ", userData.accessToken);

        if (access_token) {
            getUser().then((res) => {
                const { success, data } = res.data;
                if (!success) {
                    alert("유저 조회에 실패하였습니다.");

                    removeLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
                    resetUserState();
                    return;
                }

                // 성공, 저장
                setUser(data);
            });
        }
    }, []);

    return (
        <HeaderContainer>
            <HeaderWrapper>
                <HeaderLeftContainer>
                    <StyledNavLink to="/">
                        <Logo style={{ width: "40px" }} />
                    </StyledNavLink>
                    {!isUnderTablet && (
                        <TabBarContainer>
                            {Menus.map((menu, idx) => (
                                <StyledNavLink to={menu.path} key={idx}>
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
                        <Flex gap={10}>
                            <User />
                            <LogoutButton isUnderTablet={true} />
                        </Flex>
                    ) : (
                        <LoginButton />
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
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 20px;

    ${({ theme }) => theme.mixins.flexBox("row", "space-between")};
    flex-wrap: wrap;
`;

const StyledNavLink = styled(NavLink)`
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
