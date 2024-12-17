import styled from "styled-components";
import MySubscription from "./components/MySubscription";
import LNB, { MenuItemsType } from "@/components/LNB/LNB";
import { useState } from "react";
import useDeviceSize from "@/hooks/useDeviceSize";
import MyInfo from "./components/MyInfo";

const MyPage = () => {
    const [selectedMenu, setSelectedMenu] = useState("1");
    const { isUnderTablet } = useDeviceSize();

    const menuItems: MenuItemsType[] = [
        {
            key: "1",
            label: "마이페이지",
            iconType: "Profile",
            onClick: () => setSelectedMenu("1"),
        },
        {
            key: "2",
            label: "구독 관리",
            iconType: "Card",
            onClick: () => setSelectedMenu("2"),
        },
    ];

    return (
        <Wrapper isUnderTablet={isUnderTablet}>
            <LNBWrapper>
                <LNB menuItems={menuItems} initialMenu="1" />
            </LNBWrapper>
            <ContentWrapper>
                {selectedMenu === "1" && <MyInfo />}
                {selectedMenu === "2" && <MySubscription />}
            </ContentWrapper>
        </Wrapper>
    );
};

export default MyPage;

const Wrapper = styled.div<{ isUnderTablet: boolean }>`
    ${({ theme, isUnderTablet }) =>
        theme.mixins.flexBox(
            isUnderTablet ? "column" : "row",
            "center",
            "start"
        )};
    gap: ${({ isUnderTablet }) => (isUnderTablet ? "20px" : "40px")};
    align-items: start;
    width: 100vw;
`;

const LNBWrapper = styled.div`
    margin-top: 92px;
    margin-left: 40px;
`;

const ContentWrapper = styled.div`
    width: 100%;
    padding: 0;
`;
