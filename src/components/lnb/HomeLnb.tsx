"use client";

import Icon from "@/components/common/Icon";
import Text from "@/components/common/Text/Text";
import useToast from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { useDeviceSize } from "@components/DeviceContext";
import Link from "next/link";
import Button from "../common/Button/Button";
import LNB, { MenuItemsType } from "../lnb";

interface HomeLnbType {
    initialMenu: string;
}

const HomeLnb = ({ initialMenu }: HomeLnbType) => {
    const { isUnderTablet } = useDeviceSize();
    const showToast = useToast();
    const { userData } = useUser();

    const menuItems: MenuItemsType[] = [
        {
            key: "1",
            label: "텍스트 프롬프트",
            iconType: "TextBlock",
            route: "/prompt/text",
        },
        {
            key: "2",
            label: "이미지 프롬프트",
            iconType: "Image",
            route: "/prompt/image",
        },
        {
            key: "3",
            label: "동영상 프롬프트",
            iconType: "Video",
            onClick: () =>
                showToast({
                    title: `동영상 프롬프트는 아직 준비 중인 기능이에요.`,
                    subTitle:
                        "더 많은 프롬프트 탐색을 위해 빠르게 준비하고 있을게요!",
                    iconName: "Timer",
                }),
            disabled: true,
        },
        ...(isUnderTablet
            ? []
            : [{ type: "divider" as const, key: "divider-1" }]),
        {
            key: "4",
            id: "saved-prompt",
            label: "저장한 프롬프트",
            iconType: "Bookmark",
            route: "/saved-prompt",
        },
    ];

    const handleClickNewButton = () => {
        showToast({
            title: "로그인 후 이용 가능합니다.",
            subTitle: "",
            iconName: "TickCircle",
        });
    };

    const newPropmptButton = userData.isLogin ? (
        <Link href="/prompt-new">
            <Button
                id="register-prompt"
                style={{ padding: "8px 12px", gap: 2 }}
                size={isUnderTablet ? 40 : 52}
            >
                <Icon name="Add" color="white" size={20} />
                <Text font="b2_16_semi" color="white">
                    프롬프트 등록
                </Text>
            </Button>
        </Link>
    ) : (
        <Button
            id="register-prompt"
            onClick={handleClickNewButton}
            style={{ padding: "8px 12px", gap: 2 }}
            size={isUnderTablet ? 40 : 52}
        >
            <Icon name="Add" color="white" size={20} />
            <Text font="b2_16_semi" color="white">
                프롬프트 등록
            </Text>
        </Button>
    );

    return (
        <LNB
            menuItems={menuItems}
            button={newPropmptButton}
            initialMenu={initialMenu}
        />
    );
};

export default HomeLnb;
