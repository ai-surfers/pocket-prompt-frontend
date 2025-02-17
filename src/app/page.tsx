"use client";

import Banner from "@components/home/Banner";
import { Wrapper } from "@components/layout/LayoutClient";
import styled from "styled-components";
import PaginatedPromptSection from "@/components/home/prompt/PaginatedPromptSection";

import useToast from "@/hooks/useToast";
import useDeviceSize from "@/hooks/useDeviceSize";
import { useEffect, useMemo, useState } from "react";
import { useResetRecoilState } from "recoil";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import HomeLnb from "@/components/lnb/HomeLnb";
import Icon from "../components/common/Icon";
import VocModal from "@/components/home/VocModal";

export default function HomePage() {
    const { isUnderTablet } = useDeviceSize();
    const resetSearchedKeyword = useResetRecoilState(searchedKeywordState);
    const resetSearchedCategory = useResetRecoilState(searchedCategoryState);

    const searchParams = useSearchParams();
    const [isInitialized, setIsInitialized] = useState(false);

    // voc modal open
    const [isVocModalOpen, setIsVocModalOpen] = useState(false);

    const shouldReset = useMemo(() => {
        return searchParams.get("reset") !== "false";
    }, [searchParams]);

    useEffect(() => {
        if (shouldReset) {
            resetSearchedKeyword();
            resetSearchedCategory();
        }
        setIsInitialized(true);
    }, []);

    // useEffect(() => {
    //     resetSearchedKeyword();
    //     resetSearchedCategory();
    //     setIsInitialized(true);
    // }, [resetSearchedCategory, resetSearchedKeyword]);

    if (!isInitialized) {
        return null; // hydration 에러 방지
    }

    return (
        <HomeWrapper>
            <HomeContentWrapper $isUnderTablet={isUnderTablet}>
                <HomeLnb initialMenu="1" />
                <ContentWrapper>
                    <BannerWrapper>
                        <Banner />
                    </BannerWrapper>
                    <PaginatedPromptSection />
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
    padding-top: 0;
    padding: 0 10px;
`;

const BannerWrapper = styled.div`
    margin-bottom: 15px;
    width: 100%;
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
