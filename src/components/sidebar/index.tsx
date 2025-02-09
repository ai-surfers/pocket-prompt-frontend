"use client";

import Logo from "@svg/Logo";
import Close from "@svg/Close";
import LoginButton from "@/components/header/LoginButton";
import GuideItem from "@/components/sidebar/Item/GuideItem";
import MenuItem from "@/components/sidebar/Item/MenuItem";
import { Menus } from "@/core/Menu";
import { useUser } from "@/hooks/useUser";
import { Drawer, Flex } from "antd";
import styled from "styled-components";
import Icon from "../common/Icon";
import Text from "../common/Text/Text";
import LogoutButton from "../header/LogoutButton";
import Link from "next/link";

type SidebarProps = {
    open: boolean;
    onClose: () => void;
};
export default function Sidebar({ open, onClose }: SidebarProps) {
    const { userData } = useUser();

    const handleClickUser = () => {
        onClose();
    };

    return (
        <StyledDrawer
            id="drawer"
            className="drawer"
            width="100%"
            open={open}
            closable={false}
            style={{ background: "none" }}
        >
            <HeaderContainer>
                <Logo style={{ width: "44px" }} />
                <Close stroke="#3E4151" onClick={onClose} />
            </HeaderContainer>

            <BodyContainer>
                {userData.isLogin ? (
                    <Flex
                        flex={1}
                        gap={12}
                        style={{ padding: "12px", width: "100%" }}
                    >
                        <Link href="my">
                            <UserWrapper onClick={handleClickUser}>
                                <Icon name="User" color="G_800" />
                                <Text font="b2_16_med">
                                    {userData.user?.nickname}
                                </Text>
                            </UserWrapper>
                        </Link>
                        <LogoutButton isUnderTablet={true} />
                    </Flex>
                ) : (
                    <div style={{ margin: "12px 20px" }}>
                        <LoginButton isUnderTablet={true} />
                    </div>
                )}

                {Menus.map((menu, idx) => (
                    <MenuItem menu={menu} key={idx} onClose={onClose} />
                ))}
                <GuideItem />
            </BodyContainer>
        </StyledDrawer>
    );
}

const StyledDrawer = styled(Drawer)`
    .ant-drawer-body {
        padding: 0;
        background: white;
    }
`;

const HeaderContainer = styled.header`
    width: 100%;

    height: 52px;
    padding: 4px 20px;

    background: white;

    position: sticky;
    top: 0;
    left: 0;

    ${({ theme }) => theme.mixins.flexBox("row", "space-between")};
`;

const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 12px 0;
`;

const UserWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    padding: 8px 12px 8px 16px;
    gap: 10px;
    background-color: var(--gray-100, #f1f2f6);
    border-radius: 8px;
    cursor: pointer;
    flex: 8;
    justify-content: flex-start;
`;
