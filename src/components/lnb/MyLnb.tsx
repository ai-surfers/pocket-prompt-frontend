"use client";

import React from "react";
import LNB, { MenuItemsType } from ".";

interface MyLnbType {
    initialMenu: string;
}
const MyLnb = ({ initialMenu }: MyLnbType) => {
    const menuItems: MenuItemsType[] = [
        {
            key: "1",
            label: "마이페이지",
            iconType: "Profile",
            route: "/my",
        },
        {
            key: "2",
            label: "구독 관리",
            iconType: "Card",
            route: "/subscription",
        },
    ];

    if (typeof window === "undefined") return null;

    return <LNB menuItems={menuItems} initialMenu={initialMenu} />;
};

export default MyLnb;
