"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPromptsList } from "@/apis/prompt/prompt";
import {
    GetPromptsListResponse,
    SortType,
    ViewType,
} from "@/apis/prompt/prompt.model";
import { PROMPT_KEYS } from "@/hooks/queries/QueryKeys";

export interface PromptQueryProps {
    sortBy: SortType;
    limit?: number;
    query?: string;
    categories?: string;
    viewType?: ViewType;
}

const usePromptsListQuery = ({
    sortBy,
    limit,
    query,
    categories,
    viewType = "open",
}: PromptQueryProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18;
    const queryKey = PROMPT_KEYS.list({
        viewType,
        currentPage,
        itemsPerPage,
        sortBy,
        ...(limit !== undefined && { limit }),
        ...(query !== undefined && { query }),
        ...(categories !== undefined && { categories }),
    });

    const { data, isLoading } = useQuery<GetPromptsListResponse>({
        queryKey: queryKey,
        queryFn: () =>
            getPromptsList({
                view_type: viewType,
                sort_by: sortBy,
                page: currentPage,
                limit: limit ? limit : itemsPerPage,
                sort_order: "desc",
                query: query,
                categories: categories,
            }).then((res) => res),
        staleTime: 1000 * 60 * 5,
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
