import Button from "@/components/common/Button/Button";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LOCALSTORAGE_KEYS, removeLocalStorage } from "@/utils/storageUtils";
import Text from "@/components/common/Text/Text";

export default function User() {
    const { userData, resetUserState } = useUser();
    const navigate = useNavigate();

    function handleLogout() {
        removeLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
        resetUserState();
        navigate("/", { replace: true });
    }

    return (
        <UserContainer onClick={() => navigate("/my")}>
            <UserImage src={userData.user?.picture} />
            <UserNickname>{userData.user?.nickname}</UserNickname>
            <Button
                hierarchy="default"
                size={36}
                style={{ justifyContent: "center" }}
                onClick={handleLogout}
            >
                <Text font="b3_14_semi" color="G_400">
                    로그아웃
                </Text>
            </Button>
        </UserContainer>
    );
}

const UserContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    gap: 10px;

    cursor: pointer;
`;

const UserImage = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
`;

const UserNickname = styled.div`
    ${({ theme }) => theme.fonts.body3};
    ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.black};
`;
