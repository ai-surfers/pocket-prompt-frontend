"use client";

/**
 * @component PromptListSection
 * @description 어떤 프롬프트 리스트를 불러올지 결정하는 컴포넌트.
 *
 * @props {ViewType} viewType - api 요청할 viewtype 결정. ("open" | "starred" | "my") -> 검색어의 경우에는 open
 *
 * @features
 * - 프롬프트 종류 결정 (키워드 검색 / 검색어 검색 / 저장한 프롬프트 / 전체 프롬프트 / 인기 또는 추천 프롬프트)
 * - 프롬프트 종류에 따른 ui, 타이틀 결정
 */

import { ViewType } from "@/apis/prompt/prompt.model";
import ScrollButton from "@/components/common/ScrollButton/ScrollButton";
import Text from "@/components/common/Text/Text";
import { Categories, Category } from "@/core/Prompt";
import useScrollButtonControl from "@/hooks/ui/useScrollButtonControl";
import { useUser } from "@/hooks/useUser";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useDeviceSize } from "@components/DeviceContext";
import { Flex } from "antd";
import { usePathname } from "next/navigation";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import PromptList from "./PromptList";

interface PromptListSectionProps {
    viewType?: ViewType;
}

const PromptListSection = ({ viewType = "open" }: PromptListSectionProps) => {
    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);
    const { userData } = useUser();
    const { isMobile, isUnderTablet } = useDeviceSize();
    const limit = isUnderTablet ? 5 : 18;
    const pathname = usePathname();

    const { scrollLeftRef, scrollRightRef, handleScroll, currentScroll } =
        useScrollButtonControl();

    const totalCategories: Category = {
        total: { ko: "전체", en: "total", emoji: <></> },
        ...Categories,
    };

    const promptContent = () => {
        if (viewType === "open" && searchedKeyword && pathname === "/") {
            // 홈 화면에서 키워드 검색 시
            return (
                <LargeWrapper>
                    <PromptList
                        searchType="search"
                        viewType={viewType}
                        title={
                            <Text font="h2_20_semi" color="G_800">
                                검색 결과
                            </Text>
                        }
                        limit={limit}
                    />
                </LargeWrapper>
            );
        } else if (
            viewType === "open" &&
            !!searchedCategory &&
            searchedCategory !== "total" &&
            pathname === "/"
        ) {
            // 홈 화면에서 카테고리 칩 검색 시
            return (
                <LargeWrapper>
                    <PromptList
                        searchType="category"
                        viewType={viewType}
                        title={
                            <Text font="h2_20_semi" color="G_800">
                                {totalCategories[searchedCategory].ko} 프롬프트
                            </Text>
                        }
                        limit={limit}
                    />
                </LargeWrapper>
            );
        } else {
            if (viewType === "open") {
                // 홈 화면 기본: 인기 프롬프트 & 전체 프롬프트 (검색 쿼리 무시)
                return (
                    <Flex vertical gap={63.5} justify="center">
                        <Flex
                            gap={23}
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
                                <PromptList
                                    searchType="popular"
                                    usePage={false}
                                    viewType="open"
                                    title={
                                        <Text font="b1_18_semi" color="G_800">
                                            이번 주 인기 프롬프트 TOP 3
                                        </Text>
                                    }
                                    limit={3}
                                    defaultSortBy="usages_7_days"
                                />
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
                                <PromptList
                                    searchType="popular"
                                    usePage={false}
                                    viewType="open"
                                    title={
                                        <Text font="b1_18_semi" color="G_800">
                                            이번 달 인기 프롬프트 TOP 3
                                        </Text>
                                    }
                                    limit={3}
                                    defaultSortBy="usages_30_days"
                                />
                            </SmallWrapper>
                        </Flex>

                        <LargeWrapper>
                            <PromptList
                                searchType="total"
                                viewType={viewType}
                                title={
                                    <Text font="h2_20_semi" color="G_800">
                                        전체 프롬프트
                                    </Text>
                                }
                                limit={limit}
                            />
                        </LargeWrapper>
                    </Flex>
                );
            } else if (viewType === "starred") {
                // 저장한 프롬프트는 검색 쿼리 무시
                return (
                    <LargeWrapper>
                        <PromptList
                            searchType="total"
                            viewType={viewType}
                            title={
                                <Text font="h2_20_semi" color="G_800">
                                    💾 <span>{userData.user?.nickname}</span>
                                    님이 저장한 프롬프트
                                </Text>
                            }
                        />
                    </LargeWrapper>
                );
            } else if (viewType === "my") {
                // 내가 등록한 프롬프트는 검색 쿼리 무시
                return (
                    <LargeWrapper>
                        <PromptList
                            searchType="total"
                            viewType={viewType}
                            title={
                                <Text font="h2_20_semi" color="G_800">
                                    내가 등록한 프롬프트
                                </Text>
                            }
                        />
                    </LargeWrapper>
                );
            }
        }
    };

    return <PromptSectionContainer>{promptContent()}</PromptSectionContainer>;
};

export default PromptListSection;

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
