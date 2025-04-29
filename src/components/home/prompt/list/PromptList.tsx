"use client";

import { PromptDetails, SortType, ViewType } from "@/apis/prompt/prompt.model";
import { usePromptsListQuery } from "@/hooks/queries/prompts/usePromptsListQuery";
import { useSearch } from "@/hooks/queries/useSearch"; // ← 추가
import { usePromptList } from "@/hooks/ui/usePromptList";
import { sortTypeState } from "@/states/sortState";
import { Col, Flex, Pagination, Row } from "antd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import SortSelect from "../../searchUI/SortSelect";
import EmptyPrompt from "../EmptyPrompt";

interface PromptListProps {
    promptType: "text" | "image";
    searchType: "total" | "popular" | "search" | "category";
    viewType: ViewType;
    title: React.ReactNode;
    limit?: number;
    defaultSortBy?: SortType;
    items?: PromptDetails[]; // for popular only
    renderItem: (item: PromptDetails, index: number) => React.ReactNode;
}

export default function PromptList({
    promptType,
    searchType,
    viewType,
    title,
    limit = 18,
    defaultSortBy,
    items: popularItems,
    renderItem,
}: PromptListProps) {
    const sortBy = useRecoilValue(sortTypeState);

    // 🕵️‍♂️ 검색 키워드·카테고리
    const { keyword, searchedCategory } = useSearch(promptType);

    // ✅ 검색·전체일 때만 서버 호출, 인기(popuplar)면 skip
    const skipFetch = searchType === "popular";

    const {
        items: fetchedItems,
        totalItems,
        currentPage,
        itemsPerPage,
        handlePageChange,
        isFetching,
    } = usePromptsListQuery(
        {
            promptType,
            viewType,
            limit,
            sortBy: defaultSortBy ?? sortBy,
            // 검색 중이라면 query·categories 전달
            query: searchType === "search" ? keyword : undefined,
            categories:
                searchType === "search" && searchedCategory !== "total"
                    ? searchedCategory
                    : undefined,
        },
        skipFetch
    );

    // 인기일 때만 popularItems, 그 외는 fetchedItems 사용
    const dataSource = searchType === "popular" ? popularItems! : fetchedItems;

    // 훅으로 정렬·탭·카운트 처리
    const {
        filtered: sortedItems,
        effectiveSort,
        activeTab,
        setActiveTab,
        publicCount,
        privateCount,
    } = usePromptList(
        dataSource,
        promptType,
        searchType,
        viewType,
        defaultSortBy
    );

    const isPopularList = searchType === "popular";
    const showSortAndPage =
        viewType !== "my" && !isPopularList && sortedItems.length > 1;

    const renderContent = () => {
        // 1) 검색/전체 모드이고 fetch 중이면 Skeleton
        if (searchType !== "popular" && isFetching) {
            return Array.from({ length: limit ?? itemsPerPage }).map(
                (_, idx) => (
                    <Col
                        key={idx}
                        xs={24}
                        sm={isPopularList ? 24 : 12}
                        md={isPopularList ? 24 : 8}
                        style={{ flexShrink: 0, display: "flex" }}
                    >
                        <SkeletonBox />
                    </Col>
                )
            );
        }

        if (!isFetching && sortedItems.length === 0) {
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
                {viewType === "my" ? (
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
                ) : (
                    showSortAndPage && (
                        <SortSelect effectiveSortBy={effectiveSort} />
                    )
                )}
            </TitleWrapper>

            <Row gutter={[16, 16]} align="stretch" style={{ display: "flex" }}>
                {renderContent()}
            </Row>

            {showSortAndPage && (
                <div style={{ margin: "0 auto" }}>
                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={totalItems}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </div>
            )}
        </Flex>
    );
}
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
