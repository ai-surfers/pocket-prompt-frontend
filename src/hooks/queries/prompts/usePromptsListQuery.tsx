import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPromptsList } from "@/apis/prompt/prompt";
import { GetPromptsListResponse, SortType } from "@/apis/prompt/prompt.model";

export interface PromptQueryProps {
    sortBy: SortType;
    limit?: number;
    query?: string;
    categories?: string[];
}

const usePromptsListQuery = ({
    sortBy,
    limit,
    query,
    categories,
}: PromptQueryProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18;

    const { data, isLoading } = useQuery<GetPromptsListResponse>({
        queryKey: [currentPage, itemsPerPage, sortBy, limit, query],
        queryFn: () =>
            getPromptsList({
                view_type: "open",
                sort_by: sortBy,
                page: currentPage,
                limit: limit ? limit : itemsPerPage,
                sort_order: "desc",
                query: query,
                categories: categories,
            }).then((res) => res),
    });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [sortBy]);

    return {
        items: data?.prompt_info_list || [],
        totalItems: data?.page_meta_data.total_count || 0,
        isLoading,
        currentPage,
        itemsPerPage,
        handlePageChange,
    };
};

export default usePromptsListQuery;
