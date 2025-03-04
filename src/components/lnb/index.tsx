"use client";

import styled from "styled-components";
import { Flex } from "antd";
import { ReactNode, useEffect, useState } from "react";
import * as Icons from "iconsax-react";
import Icon from "../common/Icon";
import useDeviceSize from "@/hooks/useDeviceSize";
import Link from "next/link";
import Text from "../common/Text/Text";

export interface MenuItemsType {
    key: string;
    id?: string;
    label?: string;
    iconType?:
        | keyof typeof Icons
        | React.ComponentType<React.SVGProps<SVGSVGElement>>;
    type?: "divider";
    onClick?: () => void;
    disabled?: boolean;
    route?: string;
}

interface LNBtype {
    menuItems: MenuItemsType[];
    button?: ReactNode;
    initialMenu?: string;
    onTabChange?: (key: string) => void;
}

const LNB = ({
    menuItems,
    button,
    initialMenu = "1",
    onTabChange,
}: LNBtype) => {
    const [selectedKey, setSelectedKey] = useState<string>("1");
    const { isUnderTablet } = useDeviceSize();

    useEffect(() => {
        setSelectedKey(initialMenu);
    }, [initialMenu]);

    const handleClick = (item: MenuItemsType) => {
        if (!item.disabled) {
            setSelectedKey(item.key);
            onTabChange && onTabChange(item.key);
        }
        if (item.onClick) {
            item.onClick();
        }
    };

    if (typeof window === "undefined") {
        return null; // 서버 렌더링 중에는 아무것도 렌더링하지 않음
    }

    if (isUnderTablet) {
        return (
            <Flex
                justify="space-between"
                wrap="wrap"
                gap={10}
                style={{ width: "100vw", padding: "0 10px" }}
            >
                <Flex gap={20}>
                    {menuItems.map((item) => (
                        <Link href={item.route ?? ""} key={item.key}>
                            <button
                                onClick={() => handleClick(item)}
                                key={item.key}
                                id={item.id ?? item.key}
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
                        </Link>
                    ))}
                </Flex>
                {button}
            </Flex>
        );
    }

    return (
        <LNBWrapper>
            <Flex vertical style={{ marginBottom: "10px" }}>
                {menuItems.map((item) =>
                    item.type === "divider" ? (
                        <hr
                            style={{
                                width: "133px",
                                border: "none",
                                borderTop: "1.5px solid #DEE0E8",
                                margin: "16px 0",
                            }}
                            key="divider"
                        />
                    ) : (
                        <Link href={item.route ?? ""} key={item.key}>
                            <StyledMenuButton
                                onClick={() => handleClick(item)}
                                id={item.id ?? item.key}
                            >
                                <Flex
                                    gap={8}
                                    align="flex-start"
                                    style={{
                                        pointerEvents: "none",
                                        width: "100%",
                                    }}
                                >
                                    <Icon
                                        name={item.iconType ?? "Add"}
                                        color={
                                            selectedKey === item.key
                                                ? "primary"
                                                : "G_400"
                                        }
                                        size={20}
                                    />
                                    <Text
                                        font={
                                            selectedKey === item.key
                                                ? "b2_16_bold"
                                                : "b2_16_med"
                                        }
                                        color={
                                            selectedKey === item.key
                                                ? "primary"
                                                : "G_400"
                                        }
                                    >
                                        {item.label}
                                    </Text>
                                </Flex>
                            </StyledMenuButton>
                        </Link>
                    )
                )}
            </Flex>
            {button}
        </LNBWrapper>
    );
};

export default LNB;

const LNBWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
    width: 133px;
`;

const StyledMenuButton = styled.button`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "flex-start")};
    width: 149px;
    height: 48px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.G_400};
    border-radius: 8px;
    text-align: left; /* 추가 */
    padding-left: 10px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary_10};
    }
`;
