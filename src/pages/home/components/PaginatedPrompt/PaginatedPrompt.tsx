import { Pagination } from "antd";
import Prompt from "../Prompt/Prompt";
import styled from "styled-components";
import usePromptQuery from "@/hooks/queries/prompts/usePromptQuery";
import { ViewType } from "@/apis/prompt/prompt.model";

interface PaginatedPromptProps {
    viewType: ViewType;
    usePage?: boolean;
}

const PaginatedPrompt = ({
    viewType,
    usePage = true,
}: PaginatedPromptProps) => {
    const {
        items,
        totalItems,
        currentPage,
        itemsPerPage,
        handlePageChange,
        isLoading,
    } = usePromptQuery(viewType);

    return (
        <>
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
