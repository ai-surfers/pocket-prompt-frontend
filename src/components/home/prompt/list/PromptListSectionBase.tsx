"use client";

import { SortType, ViewType } from "@/apis/prompt/prompt.model";
import ScrollButton from "@/components/common/ScrollButton/ScrollButton";
import Text from "@/components/common/Text/Text";
import { Categories, Category, ImageCategories } from "@/core/Prompt";
import useScrollButtonControl from "@/hooks/ui/useScrollButtonControl";
import { prevPathState } from "@/states/navigationState";
import {
    keywordState,
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { sortTypeState } from "@/states/sortState";
import { useDeviceSize } from "@components/DeviceContext";
import { Flex } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
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
    const searchParams = useSearchParams();
    const { isMobile, isUnderTablet } = useDeviceSize();
    const limit = isUnderTablet ? 5 : 18;

    // Recoil 상태 관련 setter & reset
    const resetKeyword = useResetRecoilState(searchedKeywordState);
    const resetCategory = useResetRecoilState(searchedCategoryState);
    const resetSort = useResetRecoilState(sortTypeState);
    const setKeyword = useSetRecoilState(keywordState);
    const setSearchedKeyword = useSetRecoilState(searchedKeywordState);
    const setSearchedCategory = useSetRecoilState(searchedCategoryState);
    const setSortBy = useSetRecoilState(sortTypeState);
    const prevPath = useRecoilValue(prevPathState);

    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);

    // Refs로 이전 프롬프트 타입과 이전 pathname을 저장
    const hasMountedRef = useRef(false);
    const prevPromptTypeRef = useRef<string | null>(null);

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
        const currentPathType = pathname.split("/")[1]; // "text", "image", etc
        const isMainPage =
            currentPathType === "text" || currentPathType === "image";
        const isDetailPage = pathname.startsWith("/prompt/");
        const cameFromDetail = prevPath.startsWith("/prompt/");
        const prevPathType = prevPath.split("/")[1]; // ex. "text", "image"

        // 첫 마운트는 아무것도 하지 않음
        if (!hasMountedRef.current) {
            hasMountedRef.current = true;
            return;
        }

        // ✅ 조건 1: promptType 변경 (ex. text → image)
        if (currentPathType !== promptType) {
            resetKeyword();
            resetCategory();
            resetSort();
            setKeyword("");
            setSearchedCategory("total");
            setSearchedKeyword("");
            setSortBy("usages_7_days");
            return;
        }

        // ✅ 조건 2: 상세 → 같은 타입의 메인으로 뒤로가기 → 유지
        if (cameFromDetail && prevPathType === promptType && isMainPage) {
            return; // 상태 유지
        }

        // ✅ 조건 3: 상세/메인이 아닌 페이지 (ex. /mypage) → 초기화
        if (!isMainPage && !isDetailPage) {
            resetKeyword();
            resetCategory();
            resetSort();
            setKeyword("");
            setSearchedCategory("total");
            setSearchedKeyword("");
            setSortBy("usages_7_days");
            return;
        }

        // ✅ 그 외는 모두 초기화 (ex. 직접 접근)
        resetKeyword();
        resetCategory();
        resetSort();
        setKeyword("");
        setSearchedCategory("total");
        setSearchedKeyword("");
        setSortBy("usages_7_days");
    }, [
        pathname,
        promptType,
        prevPath,
        resetKeyword,
        resetCategory,
        resetSort,
        setKeyword,
        setSearchedCategory,
        setSearchedKeyword,
        setSortBy,
    ]);

    // ★ 렌더링 조건
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
                                {totalCategories[searchedCategory]?.ko ??
                                    "전체"}{" "}
                                프롬프트
                            </Text>
                        ),
                    })}
                </LargeWrapper>
            </PromptSectionContainer>
        );
    }

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
