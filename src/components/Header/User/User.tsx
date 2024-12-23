import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Text from "@/components/common/Text/Text";
import Icon from "@/components/common/Icon";

export default function User() {
    const { userData } = useUser();
    const navigate = useNavigate();

    return (
        <Wrapper onClick={() => navigate("/my")}>
            <UserWrapper>
                <Text font="b3_14_reg" color="G_800">
                    {userData.user?.nickname}
                </Text>
                <Icon name="User" color="G_800" />
            </UserWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    gap: 10px;

    cursor: pointer;
`;

const UserWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    padding: 8px 8px 8px 12px;
    gap: 10px;
    background-color: #f1f2f6;
    border-radius: 8px;
`;
