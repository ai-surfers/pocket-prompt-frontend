import styled from "styled-components";
import MySubscription from "./MySubscription";
import LNB, { MenuItemsType } from "@/components/LNB/LNB";
import { useState } from "react";
import useToast from "@/hooks/useToast";

const MyPage = () => {
    const [selectedMenu, setSelectedMenu] = useState("2");
    const showToast = useToast();

    const menuItems: MenuItemsType[] = [
        {
            key: "1",
            label: "마이페이지",
            iconType: "Profile",
            onClick: () =>
                showToast("마이페이지는 아직 준비 중인 기능이에요.", ""),
            disabled: true,
        },
        {
            key: "2",
            label: "구독 관리",
            iconType: "Card",
            onClick: () => setSelectedMenu("2"),
        },
    ];

    return (
        <Wrapper>
            <LNBWrapper>
                <LNB menuItems={menuItems} initialMenu="2" />
            </LNBWrapper>
            <ContentWrapper>
                {selectedMenu === "1" && <></>}
                {selectedMenu === "2" && <MySubscription />}
            </ContentWrapper>
        </Wrapper>
    );
};

export default MyPage;

const Wrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "start", "center")};
    gap: 40px;
    align-items: start;
    width: 100vw;
    height: 100vh;
`;

const LNBWrapper = styled.div`
    margin-top: 92px;
    margin-left: 40px;
`;

const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 0;
`;
