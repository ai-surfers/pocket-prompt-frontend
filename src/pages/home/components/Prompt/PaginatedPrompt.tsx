import { Pagination, Select } from "antd";
import Prompt from "../Prompt/Prompt";
import styled from "styled-components";
import usePromptQuery, {
    PromptQueryProps,
} from "@/hooks/queries/prompts/usePromptQuery";
import { SortType } from "@/apis/prompt/prompt.model";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import {
    searchedKeywordState,
    searchedCategoryState,
} from "@/states/searchState";

interface PaginatedPromptProps {
    usePage?: boolean;
    type: "total" | "popular" | "search" | "category";
}

const PaginatedPrompt = ({ type, usePage = true }: PaginatedPromptProps) => {
    const [sortBy, setSortBy] = useState<SortType>("created_at");
    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchCategory = useRecoilValue(searchedCategoryState);

    const promptQueryParams: PromptQueryProps = (() => {
        switch (type) {
            case "total":
                return { sortBy: sortBy, limit: undefined };
            case "popular":
                return { sortBy: "star", limit: 3 };
            case "search":
                return {
                    sortBy: sortBy,
                    limit: undefined,
                    query: searchedKeyword,
                };
            case "category":
                return {
                    sortBy: sortBy,
                    limit: undefined,
                    categories: Array.from(searchCategory) as string[],
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
    } = usePromptQuery({ ...promptQueryParams });

    const handleChange = (value: SortType) => {
        setSortBy(value);
    };

    const promptTitle = (() => {
        switch (type) {
            case "total":
                return "📖 전체 프롬프트";
            case "popular":
                return "🔥 지금 인기 있는 프롬프트";
            case "search":
                return "검색된 프롬프트";
            case "category":
                return "카테고리 프롬프트";
        }
    })();

    return (
        <>
            <TitleWrapper>
                <Title>{promptTitle}</Title>
                {usePage && (
                    <SelectWrapper>
                        <Select
                            defaultValue="created_at"
                            style={{ width: 123 }}
                            onChange={handleChange}
                            options={[
                                { value: "created_at", label: "최신 순" },
                                { value: "relevance", label: "관련도 순" },
                                { value: "star", label: "인기 순" },
                            ]}
                        />
                    </SelectWrapper>
                )}
            </TitleWrapper>

            <PromptWrapper>
                {isLoading
                    ? Array.from({ length: itemsPerPage }).map((_, idx) => (
                          <SkeletonBox key={idx} />
                      ))
                    : items.map((item) => (
                          <Prompt
                              key={item.id}
                              title={item.title}
                              description={item.description}
                              views={item.views}
                              star={item.star}
                              usages={item.usages}
                          />
                      ))}
            </PromptWrapper>
            {usePage && (
                <Pagination
                    current={currentPage}
                    pageSize={itemsPerPage}
                    total={totalItems || 0}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            )}
        </>
    );
};

export default PaginatedPrompt;

const PromptWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "start", "start")};
    align-content: flex-start;
    gap: 16px;
    flex-wrap: wrap;
    box-sizing: border-box;
    width: 1107px;
    min-height: 157px;
`;

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
`;
