import BookMark from "@/assets/svg/home/BookMark";
import Image from "@/assets/svg/home/Image";
import TextSVG from "@/assets/svg/home/TextSVG";
import Video from "@/assets/svg/home/Video";
import styled from "styled-components";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import MenuItemIcon from "./MenuItemIcon/MenuItemIcon";

const LNB = () => {
    const [selectedKey, setSelectedKey] = useState<string>("1");

    const menuItems = [
        { key: "1", label: "텍스트 프롬프트", icon: TextSVG },
        { key: "2", label: "이미지 프롬프트", icon: Image },
        { key: "3", label: "동영상 프롬프트", icon: Video },
        { type: "divider", key: "divider-1" },
        { key: "4", label: "저장한 프롬프트", icon: BookMark },
    ];

    // 메뉴 항목을 동적으로 생성
    const items: MenuProps["items"] = menuItems.map((item) => {
        if (item.type === "divider") {
            return { type: "divider", key: item.key };
        }

        return {
            key: item.key,
            icon: item.icon ? ( // icon이 있는 경우에만 MenuItemIcon 렌더링
                <MenuItemIcon
                    menuKey={item.key}
                    icon={item.icon}
                    selectedKey={selectedKey}
                />
            ) : null,
            label: item.label,
        };
    });

    const handleClick: MenuProps["onClick"] = (e) => {
        setSelectedKey(e.key);
    };

    return (
        <LNBWrapper>
            <StyledMenu
                onClick={handleClick}
                selectedKeys={[selectedKey]}
                mode="vertical"
                items={items}
            />
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
        ${({ theme }) => theme.mixins.flexBox()};
        gap: 6px;
        padding: 0;
        background-color: transparent !important;
        height: 24px;
        margin-bottom: 24px;
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
    }

    .ant-menu-item-divider {
        margin-bottom: 16px;
    }
`;
