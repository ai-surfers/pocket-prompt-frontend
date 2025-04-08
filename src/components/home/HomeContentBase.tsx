"use client";

import { Wrapper } from "@components/layout/LayoutClient";
import styled from "styled-components";

import VocModal from "@/components/home/VocModal";
import HomeSiderBar from "@/components/home/siderbarAd/HomeSiderBar";
import HomeLnb from "@/components/lnb/HomeLnb";
import SearchSection from "./SearchSection";
import Banner from "./banner/Banner";

import { useGetSubscription } from "@/hooks/queries/payments/useGetSubscription";
import { useUser } from "@/hooks/useUser";
import {
    keywordState,
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useDeviceSize } from "@components/DeviceContext";
import Icon from "@components/common/Icon";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

type HomeContentBaseProps = {
    PromptListSection: React.ComponentType;
    initialMenu: string;
};

export default function HomeContentBase({
    PromptListSection,
    initialMenu,
}: HomeContentBaseProps) {
    const { isUnderTablet } = useDeviceSize();
    const resetSearchedKeyword = useResetRecoilState(searchedKeywordState);
    const resetSearchedCategory = useResetRecoilState(searchedCategoryState);
    const searchParams = useSearchParams();
    const [shouldReset, setShouldReset] = useState<boolean>(false);
    const [keyword, setKeyword] = useRecoilState(keywordState);
    const [searchedCategory, setSearchedCategory] = useRecoilState(
        searchedCategoryState
    );

    // voc modal open
    const [isVocModalOpen, setIsVocModalOpen] = useState(false);

    const { userData } = useUser();
    const { data: userPaymentData } = useGetSubscription({
        isLogin: userData.isLogin,
    });

    const isSubscriber =
        userData.isLogin && userPaymentData?.subscription_status === "active";

    useEffect(() => {
        const keyword = searchParams.get("keyword") || "";
        const category = searchParams.get("category") || "";
        if (keyword) setKeyword(keyword);
        if (category) setSearchedCategory(category);
    }, [searchParams]);

    useEffect(() => {
        if (shouldReset) {
            resetSearchedKeyword();
            resetSearchedCategory();
        }
    }, []);

    return (
        <HomeWrapper>
            <HomeContentWrapper $isUnderTablet={isUnderTablet}>
                <LeftSection>
                    <HomeLnb initialMenu={initialMenu} />
                    {!isSubscriber && (
                        <AdContainer $isUnderTablet={isUnderTablet}>
                            <HomeSiderBar />
                        </AdContainer>
                    )}
                </LeftSection>
                <ContentWrapper>
                    <Banner />
                    <SearchSectionWrapper>
                        <SearchSection />
                    </SearchSectionWrapper>
                    <PromptListSection />
                </ContentWrapper>
            </HomeContentWrapper>

            <IconWrap onClick={() => setIsVocModalOpen(true)}>
                <Icon name={"MessageText"} color={"white"} size={30} />
            </IconWrap>

            <VocModal
                isOpen={isVocModalOpen}
                onClose={() => setIsVocModalOpen(false)}
            />
        </HomeWrapper>
    );
}

const HomeWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox()}
    gap: 40px;
    padding-top: 92px;
    align-items: start;
    width: 100vw;
    background-color: white;
    position: relative;
`;

const HomeContentWrapper = styled.div<{ $isUnderTablet: boolean }>`
    ${({ theme, $isUnderTablet }) =>
        theme.mixins.flexBox(
            $isUnderTablet ? "column" : "row",
            "center",
            "start"
        )};
    gap: ${({ $isUnderTablet }) => ($isUnderTablet ? "20px" : "40px")};
    margin: 0 auto;
`;

const ContentWrapper = styled(Wrapper)`
    max-width: 1107px;
    width: 100vw;
    padding: 0 10px;
`;

const SearchSectionWrapper = styled.div`
    margin-bottom: 15px;
    width: 100%;
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const AdContainer = styled.div<{ $isUnderTablet: boolean }>`
    height: fit-content;
    display: ${({ $isUnderTablet }) => ($isUnderTablet ? "none" : "block")};
`;

const IconWrap = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: ${({ theme }) => theme.colors.G_900};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
