"use client";

import React from "react";
import LNB, { MenuItemsType } from "../lnb";
import { useDeviceSize } from "@components/DeviceContext";
import { useRouter } from "next/navigation";
import Text from "@/components/common/Text/Text";
import Icon from "@/components/common/Icon";
import useToast from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import MagicPencilDefault from "@svg/prompt-new/magic-pencil-default";
import MagicPencilActive from "@svg/prompt-new/magic-pencil-active";

interface PromptNewType {
    initialMenu: string;
    onTabChange?: (key: string) => void;
}

const PromptNewLnb = ({ initialMenu, onTabChange }: PromptNewType) => {
    const { isUnderTablet } = useDeviceSize();
    const router = useRouter();
    const showToast = useToast();
    const { userData } = useUser();

    const menuItems: MenuItemsType[] = [
        {
            key: "1",
            label: "프롬프트 작성",
            iconType:
                initialMenu === "1" ? MagicPencilActive : MagicPencilDefault,
            onClick: () => {
                onTabChange && onTabChange("1");
            },
        },
        {
            key: "2",
            label: "제목,설명 작성",
            iconType: "MessageText",
            onClick: () => {
                onTabChange && onTabChange("2");
            },
            // disabled: true,
        },
        {
            key: "3",
            label: "추가 설정",
            iconType: "Setting2",
            onClick: () => {
                onTabChange && onTabChange("3");
            },
            // disabled: true,
        },
    ];

    if (typeof window === "undefined") return null;

    return (
        <LNB
            menuItems={menuItems}
            initialMenu={initialMenu}
            onTabChange={onTabChange}
            showTextOnUnderTablet={true}
        />
    );
};

export default PromptNewLnb;
