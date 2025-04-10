"use client";

import { SortType, ViewType } from "@/apis/prompt/prompt.model";
import ScrollButton from "@/components/common/ScrollButton/ScrollButton";
import Text from "@/components/common/Text/Text";
import { Categories, Category, ImageCategories } from "@/core/Prompt";
import useScrollButtonControl from "@/hooks/ui/useScrollButtonControl";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useDeviceSize } from "@components/DeviceContext";
import { Flex } from "antd";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";

interface PromptListSectionBaseProps {
    viewType?: ViewType;
    promptType: "text" | "image" | "video";
    renderPromptList: (params: {
        searchType: "search" | "category" | "popular" | "total";
        viewType: ViewType;
        limit: number;
        title: React.ReactNode;
        sortBy?: SortType;
    }) => React.ReactNode;
}

const PromptListSectionBase = ({
    viewType = "open",
    promptType,
    renderPromptList,
}: PromptListSectionBaseProps) => {
    const pathname = usePathname();
    const resetKeyword = useResetRecoilState(searchedKeywordState);
    const resetSearchedCategory = useResetRecoilState(searchedCategoryState);
    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);
    const { isMobile, isUnderTablet } = useDeviceSize();
    const limit = isUnderTablet ? 5 : 18;

    const { scrollLeftRef, scrollRightRef, handleScroll, currentScroll } =
        useScrollButtonControl();

    const getTotalCategories = (promptType: string): Category => {
        if (promptType === "image") {
            return {
                total: { ko: "전체", en: "total", emoji: <></> },
                ...ImageCategories,
            };
        }
        return {
            total: { ko: "전체", en: "total", emoji: <></> },
            ...Categories,
        };
    };

    const totalCategories = getTotalCategories(promptType);

    useEffect(() => {
        if (
            searchedCategory &&
            !Object.keys(totalCategories).includes(searchedCategory)
        ) {
            resetSearchedCategory();
        }
    }, [promptType, searchedCategory, totalCategories]);

    // 키워드 검색 시
    if (searchedKeyword && pathname === `/${promptType}`) {
        return (
            <PromptSectionContainer>
                <LargeWrapper>
                    {renderPromptList({
                        searchType: "search",
                        viewType,
                        limit,
                        title: (
                            <Text font="h2_20_semi" color="G_800">
                                검색 결과
                            </Text>
                        ),
                    })}
                </LargeWrapper>
            </PromptSectionContainer>
        );
    }

    // 카테고리 칩 선택 시
    if (
        searchedCategory &&
        searchedCategory !== "total" &&
        pathname === `/${promptType}`
    ) {
        return (
            <PromptSectionContainer>
                <LargeWrapper>
                    {renderPromptList({
                        searchType: "category",
                        viewType,
                        limit,
                        title: (
                            <Text font="h2_20_semi" color="G_800">
                                {totalCategories[searchedCategory].ko} 프롬프트
                            </Text>
                        ),
                    })}
                </LargeWrapper>
            </PromptSectionContainer>
        );
    }

    // 기본 홈 화면
    return (
        <PromptSectionContainer>
            <Flex vertical gap={63.5} justify="center">
                <Flex
                    justify="stretch"
                    wrap="nowrap"
                    style={{
                        overflowX: "scroll",
                        position: "relative",
                    }}
                >
                    <SmallWrapper
                        ref={scrollLeftRef}
                        $isMobile={isMobile}
                        $isFocused={currentScroll !== "right"}
                    >
                        {renderPromptList({
                            searchType: "popular",
                            viewType,
                            limit: 3,
                            sortBy: "usages_7_days",
                            title: (
                                <Text font="b1_18_semi" color="G_800">
                                    이번 주 인기 프롬프트 TOP 3
                                </Text>
                            ),
                        })}
                        {isMobile && currentScroll === "left" && (
                            <ScrollButton
                                currentScroll={currentScroll}
                                onClick={() => handleScroll()}
                            />
                        )}
                    </SmallWrapper>

                    <SmallWrapper
                        ref={scrollRightRef}
                        $isMobile={isMobile}
                        $isFocused={currentScroll !== "left"}
                    >
                        {isMobile && currentScroll === "right" && (
                            <ScrollButton
                                currentScroll={currentScroll}
                                onClick={() => handleScroll()}
                            />
                        )}
                        {renderPromptList({
                            searchType: "popular",
                            viewType,
                            limit: 3,
                            sortBy: "usages_30_days",
                            title: (
                                <Text font="b1_18_semi" color="G_800">
                                    이번 달 인기 프롬프트 TOP 3
                                </Text>
                            ),
                        })}
                    </SmallWrapper>
                </Flex>

                <LargeWrapper>
                    {renderPromptList({
                        searchType: "total",
                        viewType,
                        limit,
                        title: (
                            <Text font="h2_20_semi" color="G_800">
                                전체 프롬프트
                            </Text>
                        ),
                    })}
                </LargeWrapper>
            </Flex>
        </PromptSectionContainer>
    );
};

export default PromptListSectionBase;

const PromptSectionContainer = styled.section`
    width: 100%;
    height: 100%;
`;

const LargeWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
    gap: 12px;
    margin: 9px 0 44px 0;
`;

const SmallWrapper = styled.div<{
    $isMobile: boolean;
    $isFocused: boolean;
}>`
    ${({ theme }) => theme.mixins.flexBox("column", "flex-start", "center")};
    width: ${({ $isMobile }) => ($isMobile ? "100%" : "520px")};
    min-width: ${({ $isMobile }) => ($isMobile ? "100%" : "520px")};
    height: 512px;
    min-height: 512px;
    border-radius: 12px;
    background: ${({ $isMobile, $isFocused, theme }) =>
        $isMobile
            ? $isFocused
                ? theme.colors.primary_5
                : theme.colors.primary_20
            : "var(--primary-5, #f8f8fe)"};
    box-sizing: border-box;
    padding: 21px 12px;
    margin: 0 11px;
    position: relative;
    border: ${({ $isMobile, $isFocused, theme }) =>
        $isMobile && $isFocused
            ? `1.5px solid ${theme.colors.primary_10}`
            : "none"};
    transition: background-color 0.3s ease;
`;
