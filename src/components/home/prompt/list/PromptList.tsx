"use client";

import { PromptDetails, SortType, ViewType } from "@/apis/prompt/prompt.model";
import { usePromptsListQuery } from "@/hooks/queries/prompts/usePromptsListQuery";
import { usePromptList } from "@/hooks/ui/usePromptList";
import { sortTypeState } from "@/states/sortState";
import { Col, Flex, Pagination, Row } from "antd";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import SortSelect from "../../searchUI/SortSelect";
import EmptyPrompt from "../EmptyPrompt";

interface PromptListProps {
    promptType?: "text" | "image";
    searchType: "total" | "popular" | "search" | "category";
    viewType: ViewType;
    title?: React.ReactNode;
    limit?: number;
    defaultSortBy?: SortType;
    items?: PromptDetails[];
    renderItem: (item: PromptDetails, index: number) => React.ReactNode;
    keyword?: string;
    searchedCategory?: string;
    activeTab?: "text" | "image" | "public" | "private";
    setActiveTab?: (tab: "text" | "image" | "public" | "private") => void;
    isLoading?: boolean;
}

const PromptList = ({
    promptType,
    searchType,
    viewType,
    title,
    limit = 18,
    defaultSortBy,
    items: popularItems,
    renderItem,
    keyword,
    searchedCategory,
    activeTab,
    setActiveTab,
    isLoading: externalIsLoading, // 외부에서 전달된 isLoading
}: PromptListProps) => {
    const sortBy = useRecoilValue(sortTypeState);
    const effectivePromptType = promptType;

    const skipFetch = searchType === "popular";

    // 서버 데이터 패칭
    const {
        items: fetchedItems = [],
        totalItems = 0,
        currentPage,
        itemsPerPage,
        handlePageChange,
        isLoading: isFetching,
    } = usePromptsListQuery(
        {
            ...(effectivePromptType ? { promptType: effectivePromptType } : {}),
            viewType,
            limit,
            sortBy: defaultSortBy ?? sortBy,
            query: searchType === "search" ? keyword : undefined,
            categories:
                searchType === "search" && searchedCategory !== "total"
                    ? searchedCategory
                    : undefined,
        },
        skipFetch
    );

    // 데이터 소스 결정
    const dataSource =
        searchType === "popular"
            ? popularItems?.map((item) => ({
                  ...item,
                  sampleMedia: item.sample_media,
              })) ?? []
            : fetchedItems.map((item) => ({
                  ...item,
                  sampleMedia: item.sample_media,
              }));

    // usePromptList로 데이터 필터링 및 정렬
    const {
        filtered: sortedItems,
        effectiveSort,
        publicCount,
        privateCount,
        textCount,
        imageCount,
    } = usePromptList(
        dataSource,
        effectivePromptType ?? "text",
        searchType,
        viewType,
        defaultSortBy,
        activeTab
    );

    const isPopularList = searchType === "popular";
    const showSortAndPage = viewType !== "my" && !isPopularList;

    // 콘텐츠 렌더링
    const renderContent = () => {
        // 외부 isLoading 또는 내부 isFetching이 true일 때 로딩 UI 표시
        if (externalIsLoading || (!isPopularList && isFetching)) {
            return Array.from({ length: limit }).map((_, idx) => (
                <Col
                    key={`skeleton-${idx}`}
                    xs={24}
                    sm={isPopularList ? 24 : 12}
                    md={isPopularList ? 24 : 8}
                    style={{ flexShrink: 0, display: "flex" }}
                >
                    <SkeletonBox />
                </Col>
            ));
        }
        if (!externalIsLoading && !isFetching && sortedItems.length === 0) {
            return <EmptyPrompt viewType={viewType} />;
        }
        return sortedItems.map((item, idx) => (
            <Col
                key={item.id}
                xs={24}
                sm={isPopularList ? 24 : 12}
                md={isPopularList ? 24 : 8}
                style={{ flexShrink: 0, display: "flex" }}
            >
                {renderItem(item, idx)}
            </Col>
        ));
    };

    return (
        <Flex vertical gap={20} style={{ width: "100%" }}>
            <TitleWrapper $viewType={viewType}>
                {title}
                {viewType === "my" && activeTab && setActiveTab && (
                    <TabBarContainer>
                        <MyPageContentTab
                            className={activeTab === "public" ? "active" : ""}
                            onClick={() => setActiveTab("public")}
                        >
                            Public <CountText>{publicCount}개</CountText>
                        </MyPageContentTab>
                        <MyPageContentTab
                            className={activeTab === "private" ? "active" : ""}
                            onClick={() => setActiveTab("private")}
                        >
                            Private <CountText>{privateCount}개</CountText>
                        </MyPageContentTab>
                    </TabBarContainer>
                )}
                {viewType === "starred" && activeTab && setActiveTab && (
                    <TabBarContainer>
                        <MyPageContentTab
                            className={activeTab === "text" ? "active" : ""}
                            onClick={() => setActiveTab("text")}
                        >
                            텍스트 프롬프트 <CountText>{textCount}개</CountText>
                        </MyPageContentTab>
                        <MyPageContentTab
                            className={activeTab === "image" ? "active" : ""}
                            onClick={() => setActiveTab("image")}
                        >
                            이미지 프롬프트{" "}
                            <CountText>{imageCount}개</CountText>
                        </MyPageContentTab>
                    </TabBarContainer>
                )}
                {showSortAndPage && (
                    <SortSelect effectiveSortBy={effectiveSort} />
                )}
            </TitleWrapper>

            <Row gutter={[16, 16]} align="stretch" style={{ display: "flex" }}>
                {renderContent()}
            </Row>

            {showSortAndPage && (
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalItems}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    style={{ margin: "0 auto" }}
                />
            )}
        </Flex>
    );
};

export default React.memo(PromptList);

const SkeletonBox = styled.div`
    ${({ theme }) => theme.mixins.skeleton()};
    width: 100%;
    flex: 1;
    height: 157px;
    border-radius: 8px;
`;

const TitleWrapper = styled.div<{ $viewType: ViewType }>`
    ${({ theme, $viewType }) =>
        theme.mixins.flexBox(
            $viewType === "my" ? "column" : "row",
            "space-between",
            $viewType === "my" ? "start" : "center"
        )};
    width: 100%;
    ${({ $viewType }) => $viewType === "my" && "gap: 10px;"}
`;

const TabBarContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    gap: 30px;
`;

const MyPageContentTab = styled.div`
    ${({ theme }) => theme.fonts.body2};
    ${({ theme }) => theme.fonts.semibold};
    color: ${({ theme }) => theme.colors.G_400};
    cursor: pointer;
    height: 100%;
    text-decoration: none;
    padding: 6px 0px;
    border-bottom: 3px solid transparent;

    &.active {
        ${({ theme }) => theme.fonts.semibold};
        color: ${({ theme }) => theme.colors.primary};
        border-bottom-color: ${({ theme }) => theme.colors.primary};
    }
`;

const CountText = styled.span`
    ${({ theme }) => theme.fonts.body2};
    ${({ theme }) => theme.fonts.regular};
    color: inherit;
`;
