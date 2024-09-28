import SvgLogoPrimary from "@/assets/svg/LogoPrimary";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import LoginButton from "./LoginButton/LoginButton";
import { useEffect } from "react";
import { getUser } from "@/apis/auth/auth";
import User from "./User/User";

export default function Header() {
    const { setUser, resetUserState, userData } = useUser();

    useEffect(() => {
        const access_token = window.localStorage.getItem("ACCESS_TOKEN");
        console.log(">> ", userData.accessToken);

        if (access_token) {
            getUser().then((res) => {
                const { success, data } = res.data;
                if (!success) {
                    alert("유저 조회에 실패하였습니다.");

                    window.localStorage.removeItem("ACCESS_TOKEN");
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
                    <SvgLogoPrimary style={{ width: "40px" }} />

                    <TabBarContainer>
                        <StyledNavLink to="/">프롬프트 대백과</StyledNavLink>
                        <ExternalLink
                            href="https://chromewebstore.google.com/detail/pocket-prompt/ffinlaeadcgbhecidamekinhbfkdhodd"
                            target="_blank"
                        >
                            Extension
                        </ExternalLink>
                        <StyledNavLink to="/price">Pricing</StyledNavLink>
                    </TabBarContainer>
                </HeaderLeftContainer>

                <HeaderRightContainer>
                    {userData.isLogin ? <User /> : <LoginButton />}
                </HeaderRightContainer>
            </HeaderWrapper>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
    width: 100%;
    background: #fff;

    height: 60px;

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
    flex-wrp: wrap;
`;

const StyledNavLink = styled(NavLink)`
    ${({ theme }) => theme.fonts.b2_16_reg};
    color: ${({ theme }) => theme.colors.G_400};
    cursor: pointer;
    height: 100%;
    text-decoration: none;

    &.active {
        ${({ theme }) => theme.fonts.b2_16_semi};
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const ExternalLink = styled.a`
    ${({ theme }) => theme.fonts.b2_16_reg};
    color: ${({ theme }) => theme.colors.G_400};
    cursor: pointer;
    height: 100%;
    text-decoration: none;

    &:hover {
        ${({ theme }) => theme.fonts.b2_16_semi};
        color: ${({ theme }) => theme.colors.primary};
    }

    &:focus {
        ${({ theme }) => theme.fonts.b2_16_reg};
        color: ${({ theme }) => theme.colors.G_400};
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
