import styled from "styled-components";
import { Flex, Menu } from "antd";
import type { MenuProps } from "antd";
import { ReactNode, useEffect, useState } from "react";
import * as Icons from "iconsax-react";
import Icon from "../common/Icon";
import useDeviceSize from "@/hooks/useDeviceSize";

export interface MenuItemsType {
    key: string;
    label?: string;
    iconType?: keyof typeof Icons;
    type?: "divider";
    onClick?: () => void;
    disabled?: boolean;
}

interface LNBtype {
    menuItems: MenuItemsType[];
    button?: ReactNode;
    initialMenu?: string;
}

const LNB = ({ menuItems, button, initialMenu = "1" }: LNBtype) => {
    const [selectedKey, setSelectedKey] = useState<string>("1");
    const { isUnderTablet } = useDeviceSize();

    // 메뉴 항목을 동적으로 생성
    const desktopItems: MenuProps["items"] = menuItems.map((item) => {
        if (!item.iconType || item.type === "divider") {
            return { type: "divider", key: item.key };
        }

        return {
            key: item.key,
            icon: (
                <Icon
                    name={item.iconType}
                    color={selectedKey === item.key ? "primary" : "G_400"}
                    size={20}
                />
            ),
            label: item.label,
            onClick: item.onClick,
        };
    });

    const handleClickDesktopMenu: MenuProps["onClick"] = (e) => {
        const selectedItem = menuItems.find((item) => item.key === e.key);

        if (!selectedItem?.disabled) {
            setSelectedKey(e.key);
        }
    };

    useEffect(() => {
        setSelectedKey(initialMenu);
    }, [initialMenu]);

    if (isUnderTablet) {
        return (
            <Flex
                justify="space-between"
                align="center"
                wrap="wrap"
                gap={10}
                style={{ width: "100vw", padding: "0 10px" }}
            >
                <Flex gap={20}>
                    {menuItems.map((item) => (
                        <button
                            onClick={() => {
                                setSelectedKey(item.key);
                                if (item.onClick) {
                                    item.onClick();
                                }
                            }}
                            key={item.key}
                        >
                            {item.iconType && (
                                <Icon
                                    name={item.iconType}
                                    color={
                                        selectedKey === item.key
                                            ? "primary"
                                            : "G_400"
                                    }
                                    size={20}
                                />
                            )}
                        </button>
                    ))}
                </Flex>
                {button}
            </Flex>
        );
    }

    return (
        <LNBWrapper>
            <StyledMenu
                onClick={handleClickDesktopMenu}
                selectedKeys={[selectedKey]}
                mode="vertical"
                items={desktopItems}
            />
            {button}
        </LNBWrapper>
    );
};

export default LNB;

const LNBWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
    width: 133px;
`;

const StyledMenu = styled(Menu)`
    border-inline-end: none !important;
    padding: 0;

    .ant-menu-item {
        ${({ theme }) => theme.mixins.flexBox("row", "start", "center")};
        gap: 6px;
        padding: 0;
        padding-left: 10px;
        background-color: transparent !important;
        width: 149px;
        height: 48px;
    }

    .ant-menu-title-content {
        ${({ theme }) => theme.fonts.medium};
        color: ${({ theme }) => theme.colors.G_400};
    }

    .ant-menu-item-selected {
        background-color: transparent !important;

        .ant-menu-title-content {
            ${({ theme }) => theme.fonts.bold};
            color: ${({ theme }) => theme.colors.primary};
        }

        svg {
            stroke: ${({ theme }) => theme.colors.primary} !important;
        }
    }

    .ant-menu-item-active {
        background-color: ${({ theme }) => theme.colors.primary_10} !important;
    }

    .ant-menu-item-divider {
        margin-bottom: 2px;
    }
`;
