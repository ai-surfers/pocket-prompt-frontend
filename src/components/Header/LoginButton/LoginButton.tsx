import { getUser, login } from "@/apis/auth/auth";
import { auth, PROVIDER } from "@/apis/firebase";
import { useUser } from "@/hooks/useUser";
import {
    LOCALSTORAGE_KEYS,
    removeLocalStorage,
    setLocalStorage,
} from "@/utils/storageUtils";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";

export default function LoginButton() {
    const { setUser, setAccessToken, resetUserState } = useUser();

    async function handleLogin() {
        const res1 = await signInWithPopup(auth, PROVIDER);

        const credential = GoogleAuthProvider.credentialFromResult(res1);
        const token = credential?.accessToken;
        const user = res1.user;
        console.log("로그인 결과", token, user);

        if (!token) {
            alert("구글 로그인에 실패하였습니다.");
            return;
        }

        const res2 = await login(token);
        const { success: success2, data } = res2.data;

        if (!success2) {
            alert("로그인 API 호출에 실패하였습니다.");
            return;
        }

        // 성공 시, 액세스 토큰 저장 후, 유저 조회
        setLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN, data.access_token);

        const res3 = await getUser();
        const { success: success3, data: userData } = res3.data;

        if (!success3) {
            alert("유저 조회에 실패하였습니다.");

            removeLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
            resetUserState();
            return;
        }

        // 성공, 저장
        setAccessToken(data.access_token);
        setUser(userData);
    }

    return <Button onClick={handleLogin}>로그인</Button>;
}

const Button = styled.div`
    border-radius: 12px;
    padding: 10px 12px;

    ${({ theme }) => theme.fonts.body3};
    ${({ theme }) => theme.fonts.semibold};
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    cursor: pointer;
`;
