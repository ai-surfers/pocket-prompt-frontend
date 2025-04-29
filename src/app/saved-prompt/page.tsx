"use client";

import Text from "@/components/common/Text/Text";
import PromptList from "@/components/home/prompt/list/PromptList";
import HomeLnb from "@/components/lnb/HomeLnb";
import {
    keywordState,
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useDeviceSize } from "@components/DeviceContext";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

export default function SavedPromptPage() {
    const { isUnderTablet } = useDeviceSize();
    const [isInitialized, setIsInitialized] = useState(false);
    const [keyword, setKeyword] = useRecoilState(keywordState);
    const [searchedKeyword, setSearchedKeyword] =
        useRecoilState(searchedKeywordState);
    const [searchedCategory, setSearchedCategory] = useRecoilState(
        searchedCategoryState
    );

    useEffect(() => {
        setIsInitialized(true);
        return () => {
            setKeyword("");
            setSearchedKeyword("");
            setSearchedCategory("");
        };
    }, []);

    if (!isInitialized) {
        return null; // hydration 에러 방지
    }

    return (
        <HomeWrapper>
            <HomeContentWrapper $isUnderTablet={isUnderTablet}>
                <HomeLnb initialMenu="4" />
                <ContentWrapper>
                    <PromptList
                        viewType="starred"
                        searchType="total"
                        title={
                            <Text font="h2_20_semi" color="G_800">
                                저장한 프롬프트
                            </Text>
                        }
                    />
                </ContentWrapper>
            </HomeContentWrapper>
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

const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    max-width: 1107px;
    width: 100vw;
    padding: 0 10px;
    padding-top: 0;
`;
