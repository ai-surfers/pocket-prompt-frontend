import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPrompts } from "@/apis/prompt/prompt";
import { GetPromptsResponse, SortType } from "@/apis/prompt/prompt.model";

export interface PromptQueryProps {
    sortBy: SortType;
    limit?: number;
    query?: string;
}

const usePromptQuery = ({ sortBy, limit, query }: PromptQueryProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(18);

    const { data, isLoading } = useQuery<GetPromptsResponse>({
        queryKey: [currentPage, itemsPerPage, sortBy, limit, query],
        queryFn: () =>
            getPrompts({
                view_type: "open",
                sort_by: sortBy,
                page: currentPage,
                limit: limit ? limit : itemsPerPage,
                sort_order: "desc",
                query: query,
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
        totalItems: data?.page_meta_data.total_pages || 0,
        isLoading,
        currentPage,
        itemsPerPage,
        handlePageChange,
    };
};

export default usePromptQuery;
