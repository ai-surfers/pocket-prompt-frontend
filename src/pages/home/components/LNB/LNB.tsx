import BookMark from "@/assets/svg/home/BookMark";
import Image from "@/assets/svg/home/Image";
import TextSVG from "@/assets/svg/home/TextSVG";
import Video from "@/assets/svg/home/Video";
import styled from "styled-components";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import MenuItemIcon from "./MenuItemIcon/MenuItemIcon";
import Button from "@/components/common/Button/Button";
import Add from "@/assets/svg/home/Add";
import { useNavigate } from "react-router-dom";
import useToast from "@/hooks/useToast";

const LNB = () => {
    const [selectedKey, setSelectedKey] = useState<string>("1");
    const navigate = useNavigate();
    const showToast = useToast();

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

    const handleClickMenu: MenuProps["onClick"] = (e) => {
        const selectedItem = menuItems.find((item) => item.key === e.key);

        if (e.key === "1") {
            setSelectedKey(e.key);
        } else {
            showToast(
                `${selectedItem?.label}는 아직 준비 중인 기능이에요.`,
                "더 많은 프롬프트 탐색을 위해 빠르게 준비하고 있을게요!"
            );
        }
    };

    const handleClickNewButton = () => {
        navigate("/prompt-new");
    };

    return (
        <LNBWrapper>
            <StyledMenu
                onClick={handleClickMenu}
                selectedKeys={[selectedKey]}
                mode="vertical"
                items={items}
            />
            <StyledButton onClick={handleClickNewButton}>
                <Add />
                프롬프트 등록
            </StyledButton>
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

const StyledButton = styled(Button)`
    width: 133px;
    height: 52px;
    padding: 8px 4px;
    gap: 2px;
    ${({ theme }) => theme.fonts.b2_16_semi}
`;
