import React, { SVGProps } from "react";
import { useTheme } from "styled-components";

interface MenuItemIconProps {
    menuKey: string;
    icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    selectedKey: string;
}

const MenuItemIcon = ({
    menuKey,
    icon: Icon,
    selectedKey,
}: MenuItemIconProps) => {
    const theme = useTheme();

    // 선택된 메뉴에 따라 아이콘의 stroke 및 fill을 변경
    const strokeColor =
        selectedKey === menuKey ? theme.colors.white : theme.colors.G_400;
    const fillColor = selectedKey === menuKey ? theme.colors.primary : "none";

    return <Icon stroke={strokeColor} fill={fillColor} />;
};

export default MenuItemIcon;
