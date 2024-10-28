import { Pagination, Select } from "antd";
import Prompt from "../Prompt/Prompt";
import styled from "styled-components";
import usePromptQuery, {
    PromptQueryProps,
} from "@/hooks/queries/prompts/usePromptQuery";
import { SortType } from "@/apis/prompt/prompt.model";
import { useState } from "react";

interface PaginatedPromptProps {
    usePage?: boolean;
    type: "total" | "popular";
}

const PaginatedPrompt = ({ type, usePage = true }: PaginatedPromptProps) => {
    const [sortBy, setSortBy] = useState<SortType>("created_at");

    const promptQueryParams: PromptQueryProps =
        type === "total"
            ? {
                  sortBy: sortBy,
                  limit: undefined,
              }
            : {
                  sortBy: "star",
                  limit: 3,
              };

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

    return (
        <>
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
