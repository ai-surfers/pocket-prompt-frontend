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

import { PromptDetails, SortType, ViewType } from "@/apis/prompt/prompt.model";
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
import PromptCardImage from "./card/PromptCardImage";
import PromptCardText from "./card/PromptCardText";
import EmptyPrompt from "./EmptyPrompt";

interface PromptListProps {
    items?: PromptDetails[];
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
    items: externalItems,
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

    // externalItems가 있으면 API 호출을 스킵
    const shouldUseQuery = !externalItems;

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
        items: queriedItems,
        totalItems,
        currentPage,
        itemsPerPage,
        handlePageChange,
        isLoading,
    } = usePromptsListQuery(queryParams, !shouldUseQuery);

    // externalItems가 있으면 그것을 사용, 없으면 쿼리된 데이터 사용
    const items = externalItems ?? queriedItems;

    // Public과 Private 프롬프트 개수 계산
    const [publicCount, setPublicCount] = useState(0);
    const [privateCount, setPrivateCount] = useState(0);

    useEffect(() => {
        if (items && viewType === "my") {
            const publicItems = items.filter(
                (item) => item.visibility === "public"
            ).length;
            const privateItems = items.filter(
                (item) => item.visibility === "private"
            ).length;
            setPublicCount(publicItems);
            setPrivateCount(privateItems);
        }
    }, [items, viewType]);

    useEffect(() => {
        // 다른 페이지로 이동했을 때 기본 정렬 재설정
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

    // “인기 프롬프트”일 때 정렬/페이지네이션을 숨기기 위한 플래그
    const isPopularList = searchType === "popular";
    const shouldShowSortAndPage = usePage && !isPopularList;

    // 페이지 내부 탭 예시(마이페이지 등)
    const [activeTab, setActiveTab] = useState<"public" | "private">("public");

    const isPopularOrFeatured =
        searchType === "popular" || viewType === "featured";

    // 콘텐츠 렌더링 분리 (로딩 중 / 데이터 없을 때 / 데이터 있을 때)
    const renderContent = () => {
        if (isLoading && !externalItems) {
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

        // viewType이 "my"일 때 탭에 따라 필터링
        let filteredItems = items;
        if (viewType === "my") {
            filteredItems = items.filter((item) =>
                activeTab === "public"
                    ? item.visibility === "public"
                    : item.visibility === "private"
            );
        }

        if (!isLoading && filteredItems.length === 0) {
            return <EmptyPrompt viewType={viewType} />;
        }

        return filteredItems.map((item, index) => (
            <Col
                key={item.id}
                xs={24}
                sm={isPopularOrFeatured ? 24 : 12}
                md={isPopularOrFeatured ? 24 : 8}
                style={{ flexShrink: 0, display: "flex" }}
            >
                {renderItem ? (
                    renderItem(item, index)
                ) : promptType === "image" ? (
                    <PromptCardImage
                        id={item.id}
                        title={item.title}
                        views={item.views}
                        star={item.star}
                        usages={item.usages}
                        sampleMedia={item.sample_media ?? []}
                        isMiniHeight={isPopularOrFeatured}
                    />
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

                {/* 마이페이지의 public/private 탭 */}
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
                    // 인기 프롬프트가 아닐 경우에만 정렬 SelectBox 표시
                    shouldShowSortAndPage &&
                    items.length > 1 && (
                        <SelectWrapper>
                            <Select
                                id="prompt-sort-select"
                                value={sortBy}
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

            {/* 인기 프롬프트가 아닐 경우에만 페이지네이션 표시 */}
            {shouldShowSortAndPage && items.length > 1 && (
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
