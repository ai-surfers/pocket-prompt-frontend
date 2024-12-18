import { Col, Flex, Pagination, Row, Select } from "antd";
import Prompt from "../Prompt/Prompt";
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
    const promptQueryParams: PromptQueryProps = (() => {
        switch (searchType) {
            case "total":
                return { sortBy: sortBy, limit: limit, viewType: viewType };
            case "popular":
                return { sortBy: "star", limit: 3 };
            case "search":
                return {
                    sortBy: sortBy,
                    limit: limit,
                    query: searchedKeyword,
                };
            case "category":
                if (searchCategory === "total") {
                    return { sortBy: sortBy, limit: limit };
                }
                return {
                    sortBy: sortBy,
                    limit: limit,
                    categories: searchCategory,
                };
        }
    })();

    const {
        items,
        totalItems,
        currentPage,
        itemsPerPage,
        handlePageChange,
        isLoading,
    } = usePromptsListQuery({ ...promptQueryParams });

    const handleChange = (value: SortType) => {
        setSortBy(value);
    };

    const promptTitle = (() => {
        switch (searchType) {
            case "total":
                switch (viewType) {
                    case "open":
                        return "📖 전체 프롬프트";
                    case "starred":
                        return (
                            <>
                                💾 <span>{userData.user?.nickname}</span>님이
                                저장한 프롬프트
                            </>
                        );
                    case "my":
                        return "내가 등록한 프롬프트";
                    default:
                        return null;
                }
            case "popular":
                return "🔥 지금 인기 있는 프롬프트";
            case "search":
                return "검색된 프롬프트";
            case "category":
                return `${Categories[searchCategory].emoji} ${Categories[searchCategory].ko} 프롬프트`;
        }
    })();

    useEffect(() => {
        setSortBy("created_at");
    }, [searchCategory, searchedKeyword]);

    return (
        <Flex vertical gap={20} style={{ width: "100%" }}>
            <TitleWrapper>
                <Title>{promptTitle}</Title>
                {usePage && items.length > 1 && (
                    <SelectWrapper>
                        <Select
                            value={sortBy}
                            defaultValue="created_at"
                            style={{ width: 123 }}
                            onChange={handleChange}
                            options={[
                                { value: "created_at", label: "최신 순" },
                                ...(!searchedKeyword
                                    ? []
                                    : [
                                          {
                                              value: "relevance",
                                              label: "관련도 순",
                                          },
                                      ]),
                                { value: "star", label: "인기 순" },
                            ]}
                        />
                    </SelectWrapper>
                )}
            </TitleWrapper>

            <Row gutter={[16, 16]}>
                {isLoading ? (
                    Array.from({ length: itemsPerPage }).map((_, idx) => (
                        <Col key={idx} xs={24} sm={12} md={8}>
                            <SkeletonBox key={idx} />
                        </Col>
                    ))
                ) : items.length < 1 ? (
                    <EmptyPrompt viewType={viewType} />
                ) : (
                    items.map((item, index) => (
                        <Col key={item.id} xs={24} sm={12} md={8}>
                            <Prompt
                                key={item.id}
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
                    ))
                )}
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

export default PaginatedPrompt;

const SkeletonBox = styled.div`
    ${({ theme }) => theme.mixins.skeleton()};
    width: 358px;
    height: 157px;
    border-radius: 8px;
`;

const SelectWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "end")};
    width: 100%;
`;

const TitleWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "space-between")};
    width: 100%;
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
