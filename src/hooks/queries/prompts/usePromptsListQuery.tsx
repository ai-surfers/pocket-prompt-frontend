// src/hooks/queries/prompts/usePromptsListQuery.ts
"use client";

import { getPromptsList } from "@/apis/prompt/prompt";
import type {
    GetPromptsListResponse,
    PromptDetails,
    SortType,
    ViewType,
} from "@/apis/prompt/prompt.model";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Params {
    promptType?: "text" | "image";
    query?: string;
    categories?: string;
    viewType?: ViewType;
    limit?: number;
    sortBy?: SortType;
}

export function usePromptsListQuery(
    {
        promptType,
        query,
        categories,
        viewType = "open",
        limit = 18,
        sortBy = "created_at",
    }: Params,
    skip = false
) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = limit;

    // 1) 세 가지 인자를 받는 오버로드를 명시적으로 사용
    const { data, isLoading, isFetching } = useQuery<
        GetPromptsListResponse,
        Error
    >({
        // ··· (1) queryKey
        queryKey: [
            "prompts",
            promptType,
            { query, categories, viewType, currentPage, itemsPerPage, sortBy },
        ],
        // ··· (2) queryFn
        queryFn: () =>
            getPromptsList({
                // promptType 이 있을 때만 prompt_type 키를 추가
                ...(promptType ? { prompt_type: promptType } : {}),
                view_type: viewType,
                query,
                categories: categories === "total" ? undefined : categories,
                page: currentPage,
                limit: itemsPerPage,
                sort_by: sortBy,
                sort_order: "desc",
            }),
        // ··· (3) options
        enabled: !skip,
        placeholderData: undefined,
        staleTime: 1000,
    });

    const handlePageChange = (page: number) => setCurrentPage(page);

    useEffect(() => {
        setCurrentPage(1);
    }, [sortBy, query, categories]);

    return {
        items: data?.prompt_info_list ?? ([] as PromptDetails[]),
        totalItems: data?.page_meta_data.total_count ?? 0,
        isLoading, // 첫 로드 전용
        isFetching, // 모든 재요청(페이징, 정렬, 검색) 전용
        currentPage,
        itemsPerPage,
        handlePageChange,
    };
}
