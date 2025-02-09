"use client";

import theme from "@/styles/theme";
import * as Icons from "iconsax-react";

interface IconProps {
    name: keyof typeof Icons;
    color?: keyof typeof theme.colors;
    size?: number;
    onClick?: () => void;
}

export default function Icon({ name, color, size, onClick }: IconProps) {
    const Iconsax = Icons[name];
    const hexColor = color ? theme.colors[color] : theme.colors.primary;

    return <Iconsax color={hexColor} size={size || 20} onClick={onClick} />;
}
