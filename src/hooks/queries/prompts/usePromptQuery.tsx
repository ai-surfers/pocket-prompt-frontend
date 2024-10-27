import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getPrompts } from "@/apis/prompt/prompt";
import {
    GetPromptsResponse,
    SortType,
    ViewType,
} from "@/apis/prompt/prompt.model";

interface PromptQueryProps {
    viewType: ViewType;
    sortBy: SortType;
}

const usePromptQuery = ({ viewType, sortBy }: PromptQueryProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(18);

    const { data, isLoading } = useQuery<GetPromptsResponse>({
        queryKey: [viewType, currentPage, itemsPerPage, sortBy],
        queryFn: () =>
            getPrompts({
                view_type: viewType,
                sort_by: sortBy,
                page: currentPage,
                limit: itemsPerPage,
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
