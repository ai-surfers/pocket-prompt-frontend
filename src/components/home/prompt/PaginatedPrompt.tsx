import { Col, Flex, Pagination, Row, Select } from "antd";
import PromptBox from "./PromptBox";
import styled from "styled-components";
import usePromptsListQuery, {
    PromptQueryProps,
} from "@/hooks/queries/prompts/usePromptsListQuery";
import { SortType, ViewType } from "@/apis/prompt/prompt.model";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
    searchedKeywordState,
    searchedCategoryState,
} from "@/states/searchState";
import { Categories } from "@/core/Prompt";
import useDeviceSize from "@/hooks/useDeviceSize";
import { useUser } from "@/hooks/useUser";
import EmptyPrompt from "./EmptyPrompt";

interface PaginatedPromptProps {
    usePage?: boolean;
    searchType: "total" | "popular" | "search" | "category";
    viewType: ViewType;
}

const PaginatedPrompt = ({
    searchType,
    usePage = true,
    viewType,
}: PaginatedPromptProps) => {
    const [sortBy, setSortBy] = useState<SortType>("created_at");
    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchCategory = useRecoilValue(searchedCategoryState);
    const { userData } = useUser();
    const { isUnderTablet } = useDeviceSize();

    const limit = isUnderTablet ? 5 : undefined;

    // 쿼리 파라미터 로직
    const getQueryParams = (): PromptQueryProps => {
        switch (searchType) {
            case "total":
                return { sortBy, limit, viewType };
            case "popular":
                return { sortBy: "star", limit: 3 };
            case "search":
                return { sortBy, limit, query: searchedKeyword };
            case "category":
                return searchCategory === "total"
                    ? { sortBy, limit }
                    : { sortBy, limit, categories: searchCategory };
        }
    };

    const promptQueryParams = getQueryParams();

    const {
        items,
        totalItems,
        currentPage,
        itemsPerPage,
        handlePageChange,
        isLoading,
    } = usePromptsListQuery(promptQueryParams);

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

    // 타이틀 생성 로직
    const getPromptTitle = () => {
        if (searchType === "total") {
            if (viewType === "open") return "📖 전체 프롬프트";
            if (viewType === "starred")
                return (
                    <>
                        💾 <span>{userData.user?.nickname}</span>님이 저장한
                        프롬프트
                    </>
                );
            if (viewType === "my") return "내가 등록한 프롬프트";
        }
        if (searchType === "popular") return "🔥 지금 인기 있는 프롬프트";
        if (searchType === "search") return "검색된 프롬프트";
        if (searchType === "category")
            return `${Categories[searchCategory].emoji} ${Categories[searchCategory].ko} 프롬프트`;
        return null;
    };

    const promptTitle = getPromptTitle();

    // 검색어나 카테고리가 변경되면 정렬 기준 초기화
    useEffect(() => {
        setSortBy("created_at");
    }, [searchCategory, searchedKeyword]);

    //myPage 일 때 탭 추가
    const [activeTab, setActiveTab] = useState<"public" | "private">("public");
    // 각 탭들의 임시 카운트 값 (실제 데이터에 맞게 설정)
    const publicCount = 0;
    const privateCount = 0;

    // 콘텐츠 렌더링 분리 (로딩 중 스켈레톤, 데이터 없을 때, 데이터 있을 때)
    const renderContent = () => {
        if (isLoading) {
            return Array.from({ length: itemsPerPage }).map((_, idx) => (
                <Col key={idx} xs={24} sm={12} md={8}>
                    <SkeletonBox />
                </Col>
            ));
        }
        if (!isLoading && items.length === 0) {
            return <EmptyPrompt viewType={viewType} />;
        }
        return items.map((item, index) => (
            <Col key={item.id} xs={24} sm={12} md={8} style={{ flexShrink: 0 }}>
                <PromptBox
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    views={item.views}
                    star={item.star}
                    usages={item.usages}
                    colored={searchType === "popular"}
                    index={index + 1}
                />
            </Col>
        ));
    };

    return (
        <Flex vertical gap={20} style={{ width: "100%" }}>
            <TitleWrapper viewType={viewType}>
                <Title>{promptTitle}</Title>
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
                                value={sortBy}
                                defaultValue="created_at"
                                style={{ width: 123 }}
                                onChange={handleSortChange}
                                options={selectOptions}
                            />
                        </SelectWrapper>
                    )
                )}
            </TitleWrapper>

            <Row gutter={[16, 16]}>{renderContent()}</Row>

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

export default PaginatedPrompt;

const SkeletonBox = styled.div`
    ${({ theme }) => theme.mixins.skeleton()};
    max-width: 358px;
    height: 157px;
    border-radius: 8px;
`;

const SelectWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "end")};
    width: 100%;
`;

const TitleWrapper = styled.div<{ viewType: ViewType }>`
    ${({ theme, viewType }) =>
        theme.mixins.flexBox(
            viewType === "my" ? "column" : "row",
            "space-between",
            viewType === "my" ? "start" : "center"
        )};
    width: 100%;
    ${({ viewType }) => viewType === "my" && "gap: 10px;"}
`;

const Title = styled.div`
    text-align: start;
    width: 100%;
    ${({ theme }) => theme.colors.G_800};
    ${({ theme }) => theme.fonts.header1};
    ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.G_800};

    span {
        color: ${({ theme }) => theme.colors.primary};
    }
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
