/**
 * @component PromptList
 * @description 프롬프트 리스트 api 결과를 보여 주고, pagination, sort, tab을 관리하는 컴포넌트.
 *
 * @props {boolean} usePage - 페이지네이션 사용 여부. 기본값은 true.
 * @props {"total" | "popular" | "search" | "category"} searchType - API 요청 시 사용할 검색 타입을 결정.
 * @props {ViewType} viewType - API 요청할 viewType을 결정. ("open" | "starred" | "my") -> 검색어의 경우에는 "open".
 * @props {React.ReactNode} title - 리스트 상단에 표시할 타이틀 컴포넌트.
 *
 * @features
 * - 프롬프트 종류에 따라 api 요청
 * - props에 따라 pagination, sort, tab 관리
 */

import { SortType, ViewType } from "@/apis/prompt/prompt.model";
import usePromptsListQuery from "@/hooks/queries/prompts/usePromptsListQuery";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { sortTypeState } from "@/states/sortState";
import { Col, Flex, Pagination, Row, Select } from "antd";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import PromptCardText from "./ card/PromptCardText";
import EmptyPrompt from "./EmptyPrompt";

interface PromptListProps {
    usePage?: boolean;
    searchType: "total" | "popular" | "search" | "category";
    viewType: ViewType;
    title: React.ReactNode;
    limit?: number;
    defaultSortBy?: SortType;
    promptType?: "text" | "image" | "video";
    renderItem?: (item: any, index: number) => React.ReactNode;
}

const PromptList = ({
    searchType,
    usePage = true,
    viewType,
    title,
    limit,
    defaultSortBy,
    promptType,
    renderItem,
}: PromptListProps) => {
    const pathname = usePathname();
    const [sortBy, setSortBy] = useRecoilState(sortTypeState);
    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchCategory = useRecoilValue(searchedCategoryState);

    // 쿼리 파라미터 로직
    const queryParams = {
        viewType: viewType,
        sortBy: defaultSortBy || sortBy,
        limit,
        ...(promptType ? { prompt_type: promptType } : {}),
        ...(searchedKeyword ? { query: searchedKeyword } : {}),
        ...(searchCategory && searchCategory !== "total"
            ? { categories: searchCategory }
            : {}),
    };

    const {
        items,
        totalItems,
        currentPage,
        itemsPerPage,
        handlePageChange,
        isLoading,
        // refetch,
    } = usePromptsListQuery(queryParams);

    useEffect(() => {
        if (pathname !== "/" && !pathname.startsWith("/prompt/")) {
            setSortBy("created_at");
        }
    }, [pathname, setSortBy]);

    const handleSortChange = (value: SortType) => {
        setSortBy(value);
    };

    // Select Box 옵션 구성
    const selectOptions = [
        { value: "created_at", label: "최신 순" },
        ...(searchedKeyword
            ? [{ value: "relevance", label: "관련도 순" }]
            : []),
        { value: "star", label: "인기 순" },
    ];

    // 검색어나 카테고리가 변경되면 정렬 기준 초기화
    // useEffect(() => {
    //     setSortBy("created_at");
    // }, [searchCategory, searchedKeyword]);

    //myPage 일 때 탭 추가
    const [activeTab, setActiveTab] = useState<"public" | "private">("public");
    // 각 탭들의 임시 카운트 값 (실제 데이터에 맞게 설정)
    const publicCount = 0;
    const privateCount = 0;
    const isPopularOrFeatured =
        searchType === "popular" || viewType === "featured";

    // 콘텐츠 렌더링 분리 (로딩 중 스켈레톤, 데이터 없을 때, 데이터 있을 때)
    const renderContent = () => {
        if (isLoading) {
            return Array.from({ length: limit ?? itemsPerPage }).map(
                (_, idx) => (
                    <Col
                        key={idx}
                        xs={24}
                        sm={isPopularOrFeatured ? 24 : 12}
                        md={isPopularOrFeatured ? 24 : 8}
                    >
                        <SkeletonBox />
                    </Col>
                )
            );
        }

        if (!isLoading && items.length === 0) {
            return <EmptyPrompt viewType={viewType} />;
        }

        return items.map((item, index) => (
            <Col
                key={item.id}
                xs={24}
                sm={isPopularOrFeatured ? 24 : 12}
                md={isPopularOrFeatured ? 24 : 8}
                style={{ flexShrink: 0, display: "flex" }}
            >
                {renderItem ? (
                    renderItem(item, index)
                ) : (
                    <PromptCardText
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        views={item.views}
                        star={item.star}
                        usages={item.usages}
                        colored={false}
                        index={index + 1}
                        isMiniHeight={isPopularOrFeatured}
                    />
                )}
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
                    usePage &&
                    items.length > 1 && (
                        <SelectWrapper>
                            <Select
                                id="prompt-sort-select"
                                value={sortBy}
                                // defaultValue="created_at"
                                style={{ width: 123 }}
                                onChange={handleSortChange}
                                options={selectOptions}
                            />
                        </SelectWrapper>
                    )
                )}
            </TitleWrapper>

            <Row
                gutter={[16, 16]}
                align="stretch"
                style={{ display: "flex", alignItems: "stretch" }}
            >
                {renderContent()}
            </Row>

            {usePage && items.length > 1 && (
                <div style={{ margin: "0 auto" }}>
                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={totalItems || 0}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </div>
            )}
        </Flex>
    );
};

export default PromptList;

const SkeletonBox = styled.div`
    ${({ theme }) => theme.mixins.skeleton()};
    width: 100%;
    flex: 1;
    height: 157px;
    border-radius: 8px;
`;

const SelectWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "end")};
    width: 100%;
    flex: 1;
`;

const TitleWrapper = styled.div<{ $viewType: ViewType }>`
    ${({ theme, $viewType }) =>
        theme.mixins.flexBox(
            $viewType === "my" ? "column" : "row",
            "space-between",
            $viewType === "my" ? "start" : "center"
        )};
    width: 100%;
    ${({ $viewType }) => $viewType === "my" && "gap: 10px;"};
`;

const TabBarContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    gap: 30px;
    /* margin-left: 60px; */
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
