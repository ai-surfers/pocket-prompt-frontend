import { useUser } from "@/hooks/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Text from "@/components/common/Text/Text";
import Icon from "@/components/common/Icon";

export default function User() {
    const { userData } = useUser();
    const navigate = useNavigate();

    const location = useLocation();
    const isSelected = location.pathname.includes("my");

    return (
        <Wrapper $isSelected={isSelected}>
            <UserWrapper onClick={() => navigate("/my")}>
                <Text
                    font="b3_14_reg"
                    color={isSelected ? "primary_100" : "G_800"}
                >
                    {userData.user?.nickname}
                </Text>
                <Icon
                    name="User"
                    color={isSelected ? "primary_100" : "G_800"}
                />
            </UserWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.div<{ $isSelected: boolean }>`
    ${({ theme }) => theme.mixins.flexBox()};
    gap: 10px;
    cursor: pointer;

    background-color: ${({ $isSelected }) =>
        $isSelected ? "#F2F3FD" : "#f1f2f6"};
    border-radius: 8px;
    border: ${({ $isSelected }) =>
        $isSelected && "1.5px solid var(--primary-50, #BBC0F5)"};

    :hover {
        background-color: ${({ $isSelected }) => !$isSelected && "#dee0e8"};
        border-radius: 8px;
    }
`;

const UserWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    cursor: pointer;
    padding: 8px 8px 8px 12px;
    gap: 10px;
`;
