"use client";

import { useUser } from "@/hooks/useUser";
import styled from "styled-components";
import Text from "@/components/common/Text/Text";
import Icon from "@/components/common/Icon";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function User() {
    const { userData } = useUser();
    const pathname = usePathname();

    const isSelected = pathname.includes("my");

    return (
        <Wrapper $isSelected={isSelected}>
            <Link href="/my">
                <UserWrapper>
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
            </Link>
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
