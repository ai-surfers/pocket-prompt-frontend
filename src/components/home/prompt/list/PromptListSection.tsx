// src/components/home/prompt/PromptListSection.tsx
"use client";

import { PromptDetails } from "@/apis/prompt/prompt.model";
import Text from "@/components/common/Text/Text";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { Col, Row } from "antd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import PromptList from "./PromptList";

export interface PromptSectionConfig {
    promptType: "text" | "image";
    categoriesMap: Record<string, { ko: string; emoji?: React.ReactNode }>;
    PopularCard: React.ComponentType<any>;
    Card: React.ComponentType<any>;
}

type Props = {
    promptData: {
        top7Days: PromptDetails[];
        top30Days: PromptDetails[];
        allPrompts: PromptDetails[];
    };
    searchResults?: PromptDetails[];
    config: PromptSectionConfig;
    isLoading?: boolean;
};

export default function PromptListSection({
    promptData,
    searchResults,
    config: { promptType, categoriesMap, PopularCard, Card },
    isLoading = false,
}: Props) {
    const { top7Days, top30Days } = promptData;

    // popular
    const top7 = top7Days.slice(0, 3);
    const top7Ids = new Set(top7.map((p) => p.id));
    const top30 = top30Days.filter((p) => !top7Ids.has(p.id)).slice(0, 3);

    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);

    const categoryKoName =
        searchedCategory === "total"
            ? "전체"
            : categoriesMap[searchedCategory]?.ko || "전체";

    const isSearching =
        !!searchedKeyword || (searchedCategory && searchedCategory !== "total");

    // 검색 타이틀 구성
    let titleText = "전체 프롬프트";

    if (searchedKeyword && searchedCategory && searchedCategory !== "total") {
        titleText = `${categoryKoName}에서 "${searchedKeyword}" 검색 결과`;
    } else if (searchedKeyword) {
        titleText = `검색 결과: "${searchedKeyword}"`;
    } else if (searchedCategory && searchedCategory !== "total") {
        titleText = `${categoryKoName} 프롬프트`;
    }

    // searchResults 데이터 매핑
    const mappedSearchResults = searchResults?.map((item) => ({
        ...item,
        sampleMedia: item.sample_media,
    }));

    return (
        <>
            <FadeContainer visible={!isSearching}>
                <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
                    {/* 인기 7일 */}
                    <Col xs={24} md={12}>
                        <BackgroundBox>
                            <PromptList
                                promptType={promptType}
                                searchType="popular"
                                viewType="open"
                                title={
                                    <Text font="h2_20_semi">
                                        이번 주 인기 프롬프트 TOP 3
                                    </Text>
                                }
                                limit={3}
                                defaultSortBy="usages_7_days"
                                items={top7}
                                renderItem={(item, idx) => (
                                    <PopularCard
                                        {...item}
                                        index={idx + 1}
                                        isMiniHeight
                                    />
                                )}
                            />
                        </BackgroundBox>
                    </Col>
                    {/* 인기 30일 */}
                    <Col xs={24} md={12}>
                        <BackgroundBox>
                            <PromptList
                                promptType={promptType}
                                searchType="popular"
                                viewType="open"
                                title={
                                    <Text font="h2_20_semi">
                                        이번 달 인기 프롬프트 TOP 3
                                    </Text>
                                }
                                limit={3}
                                defaultSortBy="usages_30_days"
                                items={top30}
                                renderItem={(item, idx) => (
                                    <PopularCard
                                        {...item}
                                        index={idx + 1}
                                        isMiniHeight
                                    />
                                )}
                            />
                        </BackgroundBox>
                    </Col>
                </Row>
            </FadeContainer>

            {/* 전체 or 검색 결과 */}
            <PromptList
                promptType={promptType}
                searchType={searchResults ? "search" : "total"}
                viewType="open"
                title={<Text font="h2_20_semi">{titleText}</Text>}
                limit={18}
                items={mappedSearchResults} // 매핑된 데이터 전달
                renderItem={(item, idx) => (
                    <Card promptType={promptType} {...item} index={idx + 1} />
                )}
            />
        </>
    );
}

const FadeContainer = styled.div<{ visible: boolean }>`
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    height: ${({ visible }) => (visible ? "auto" : "0")};
    overflow: hidden;
    transition: opacity 0.4s ease, height 0.4s ease;
`;

const BackgroundBox = styled.div`
    background-color: ${({ theme }) => theme.colors.primary_10};
    border-radius: 12px;
    padding: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Centered = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "center", "center")};
    height: 80vh;
`;
