import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPrompts } from "@/apis/prompt/prompt";
import { GetPromptsResponse, ViewType } from "@/apis/prompt/prompt.model";

const usePromptQuery = (viewType: ViewType) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(18);

    const { data, isLoading } = useQuery<GetPromptsResponse>({
        queryKey: [viewType, currentPage, itemsPerPage],
        queryFn: () =>
            getPrompts({
                view_type: viewType,
                page: currentPage,
                limit: itemsPerPage,
            }).then((res) => res),
    });

    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setItemsPerPage(pageSize);
    };

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
