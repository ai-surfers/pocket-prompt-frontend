"use client";

import { PromptDetails } from "@/apis/prompt/prompt.model";
import Text from "@/components/common/Text/Text";
import { Categories, ImageCategories } from "@/core/Prompt";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { Col, Row } from "antd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import PromptCardImage from "../card/PromptCardImage";
import PromptCardImageWithText from "../card/PromptPopularCardImage";
import PromptList from "../PromptList";

interface PromptData {
    top7Days: PromptDetails[];
    top30Days: PromptDetails[];
    allPrompts: PromptDetails[];
}

interface PromptListSectionImageProps {
    promptData: PromptData;
    searchResults?: PromptDetails[];
}

const PromptListSectionImage = ({
    promptData,
    searchResults,
}: PromptListSectionImageProps) => {
    const { top7Days, top30Days, allPrompts } = promptData;

    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);

    const top7 = top7Days.slice(0, 3);
    const top7Ids = new Set(top7.map((item) => item.id));
    const top30 = top30Days.filter((item) => !top7Ids.has(item.id)).slice(0, 3);

    const promptType: "text" | "image" = "text";

    const categoryKoName =
        promptType === "text"
            ? Categories[searchedCategory]?.ko
            : ImageCategories[searchedCategory]?.ko;

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

    return (
        <>
            {/* 인기 프롬프트 (주간/월간) - 검색 중이면 자연스럽게 사라짐 */}
            <FadeContainer visible={!isSearching}>
                <Row gutter={[24, 24]} style={{ marginBottom: "32px" }}>
                    <Col xs={24} md={12}>
                        <BackgroundBox>
                            <PromptList
                                promptType="image"
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
                                renderItem={(item, index) => (
                                    <PromptCardImageWithText
                                        id={item.id}
                                        title={item.title}
                                        description={item.description ?? ""}
                                        views={item.views}
                                        star={item.star}
                                        usages={item.usages}
                                        imageUrl={item.sample_media?.[0] ?? ""}
                                        isMiniHeight={true}
                                    />
                                )}
                            />
                        </BackgroundBox>
                    </Col>

                    <Col xs={24} md={12}>
                        <BackgroundBox>
                            <PromptList
                                promptType="image"
                                searchType="popular"
                                viewType="open"
                                title={
                                    <Text font="h2_20_bold">
                                        이번 달 인기 프롬프트 TOP 3
                                    </Text>
                                }
                                limit={3}
                                defaultSortBy="usages_30_days"
                                items={top30}
                                renderItem={(item, index) => (
                                    <PromptCardImageWithText
                                        id={item.id}
                                        title={item.title}
                                        description={item.description ?? ""}
                                        views={item.views}
                                        star={item.star}
                                        usages={item.usages}
                                        imageUrl={item.sample_media?.[0] ?? ""}
                                        isMiniHeight={true}
                                    />
                                )}
                            />
                        </BackgroundBox>
                    </Col>
                </Row>
            </FadeContainer>

            {/* 전체 프롬프트 or 검색 결과 */}
            <PromptList
                promptType="image"
                searchType={searchResults ? "search" : "total"}
                viewType="open"
                title={<Text font="h2_20_semi">{titleText}</Text>}
                limit={18}
                defaultSortBy="created_at"
                items={searchResults ? searchResults : undefined}
                renderItem={(item, index) => (
                    <PromptCardImage
                        id={item.id}
                        title={item.title}
                        sampleMedia={item.sample_media ?? []}
                        views={item.views}
                        star={item.star}
                        usages={item.usages}
                        isMiniHeight={false}
                    />
                )}
            />
        </>
    );
};

export default PromptListSectionImage;

const FadeContainer = styled.div<{ visible: boolean }>`
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    height: ${({ visible }) => (visible ? "auto" : "0")};
    overflow: hidden;
    transition: opacity 0.4s ease, height 0.4s ease;
`;

const BackgroundBox = styled.div`
    background-color: ${({ theme }) => theme.colors.primary_10};
    border-radius: 12px;
    padding: 20px 16px 16px 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
