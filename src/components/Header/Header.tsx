import SvgLogoPrimary from "@/assets/svg/LogoPrimary";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, PROVIDER } from "@/apis/firebase";
import { getUser, login } from "@/apis/auth/auth";
import { useUser } from "@/hooks/useUser";

export default function Header() {
    const { setUser, setAccessToken, resetUserState, userData } = useUser();

    async function handleLogin() {
        const res1 = await signInWithPopup(auth, PROVIDER);

        const credential = GoogleAuthProvider.credentialFromResult(res1);
        const token = credential?.accessToken;
        const user = res1.user;
        console.log("로그인 결과", token, user);

        if (!token) {
            alert("로그인 실패");
            return;
        }

        const res2 = await login(token);
        const { success: success2, data } = res2.data;

        if (!success2) {
            alert("API 실패");
            return;
        }

        // 성공 시, 액세스 토큰 저장 후, 유저 조회
        window.localStorage.setItem("ACCESS_TOKEN", data.access_token);

        const res3 = await getUser();
        const { success: success3, data: userData } = res3.data;

        if (!success3) {
            alert("유저 조회 실패");

            window.localStorage.removeItem("ACCESS_TOKEN");
            resetUserState();
            return;
        }

        // 성공, 저장하고 홈으로 이동
        setAccessToken(data.access_token);
        setUser(userData);
    }

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
                    {userData.isLogin ? (
                        <>
                            <img
                                src={userData.user?.picture}
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                }}
                            />
                            <div>{userData.user?.nickname}</div>
                        </>
                    ) : (
                        <LoginButton onClick={handleLogin}>로그인</LoginButton>
                    )}
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
    padding: 0 50px;

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

const LoginButton = styled.div`
    border-radius: 12px;
    padding: 10px 12px;

    ${({ theme }) => theme.fonts.b3_14_semi};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    cursor: pointer;
`;
