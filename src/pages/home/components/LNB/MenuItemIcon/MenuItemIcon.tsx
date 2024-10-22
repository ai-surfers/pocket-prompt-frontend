import React from "react";
import { useTheme } from "styled-components";

interface MenuItemIconProps {
    menuKey: string;
    icon: React.ReactNode;
    selectedKey: string;
}

const MenuItemIcon = ({ menuKey, icon, selectedKey }: MenuItemIconProps) => {
    const theme = useTheme();

    // 선택된 메뉴에 따라 아이콘의 stroke 및 fill을 변경
    const strokeColor =
        selectedKey === menuKey ? theme.colors.white : theme.colors.G_400;
    const fillColor = selectedKey === menuKey ? theme.colors.primary : "none";

    return React.cloneElement(icon as React.ReactElement, {
        stroke: strokeColor,
        fill: fillColor,
    });
};

export default MenuItemIcon;
