import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function User() {
    const { userData } = useUser();
    const navigate = useNavigate();

    return (
        <UserContainer onClick={() => navigate("/my")}>
            <UserImage src={userData.user?.picture} />
            <UserNickname>{userData.user?.nickname}</UserNickname>
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
