import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPrompts } from "@/apis/prompt/prompt";
import { PAGINATION_KEYS } from "../QueryKeys";
import { GetPromptsResponse } from "@/apis/prompt/prompt.model";

const usePromptQuery = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(18);

    const { data, isLoading } = useQuery<GetPromptsResponse>({
        queryKey: [PAGINATION_KEYS, currentPage, itemsPerPage],
        queryFn: () =>
            getPrompts({
                view_type: "open",
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
