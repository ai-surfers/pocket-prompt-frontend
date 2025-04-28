import { PromptDetails, SortType, ViewType } from "@/apis/prompt/prompt.model";
import usePromptsListQuery from "@/hooks/queries/prompts/usePromptsListQuery";
import { usePromptList } from "@/hooks/ui/usePromptList";
import { Col, Flex, Pagination, Row } from "antd";
import styled from "styled-components";
import SortSelect from "../searchUI/SortSelect";
import EmptyPrompt from "./EmptyPrompt";

interface PromptListProps {
    items?: PromptDetails[]; // ✅ optional로 변경
    usePage?: boolean;
    searchType: "total" | "popular" | "search" | "category";
    viewType: ViewType;
    title: React.ReactNode;
    limit?: number;
    defaultSortBy?: SortType;
    promptType?: "text" | "image" | "video";
    renderItem: (item: any, index: number) => React.ReactNode;
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
    const isUsingExternalItems = !!externalItems; // ✅

    const {
        items: queriedItems,
        totalItems,
        currentPage,
        itemsPerPage,
        handlePageChange,
        isLoading,
    } = usePromptsListQuery(
        {
            viewType,
            sortBy: defaultSortBy,
            limit,
            prompt_type: promptType,
        },
        isUsingExternalItems // ✅ 외부 데이터 있으면 쿼리 skip
    );

    // ✅ 데이터 소스 결정
    const dataSource = externalItems ?? queriedItems ?? [];

    const {
        sortedItems,
        effectiveSortBy,
        activeTab,
        setActiveTab,
        publicCount,
        privateCount,
    } = usePromptList({
        items: dataSource,
        searchType,
        viewType,
        defaultSortBy,
    });

    const isPopularList = searchType === "popular";
    const shouldShowSortAndPage = usePage && !isPopularList;
    const isPopularOrFeatured =
        searchType === "popular" || viewType === "featured";

    const renderContent = () => {
        if (isUsingExternalItems === false && isLoading) {
            // ✅ 외부 데이터 없고 로딩중일 때만 스켈레톤
            return Array.from({ length: limit ?? itemsPerPage }).map(
                (_, idx) => (
                    <Col
                        key={`skeleton-${idx}`}
                        xs={24}
                        sm={isPopularOrFeatured ? 24 : 12}
                        md={isPopularOrFeatured ? 24 : 8}
                        style={{ flexShrink: 0, display: "flex" }}
                    >
                        <SkeletonBox />
                    </Col>
                )
            );
        }

        if (!isLoading && sortedItems.length === 0) {
            return <EmptyPrompt viewType={viewType} />;
        }

        return sortedItems.map((item, index) => (
            <Col
                key={item.id}
                xs={24}
                sm={isPopularOrFeatured ? 24 : 12}
                md={isPopularOrFeatured ? 24 : 8}
                style={{ flexShrink: 0, display: "flex" }}
            >
                {renderItem(item, index)}
            </Col>
        ));
    };

    return (
        <Flex vertical gap={20} style={{ width: "100%" }}>
            <TitleWrapper $viewType={viewType}>
                {title}

                {/* 마이페이지 탭 */}
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
                    shouldShowSortAndPage &&
                    sortedItems.length > 1 && (
                        <SortSelect effectiveSortBy={effectiveSortBy} />
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

            {/* ✅ 페이지네이션은 외부 items 없을 때만 */}
            {shouldShowSortAndPage && sortedItems.length > 1 && (
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
