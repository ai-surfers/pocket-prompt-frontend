"use client";

import { GET } from "@/apis/client";
import { useQuery } from "@tanstack/react-query";

interface AiSuggestionResponse {
    success: boolean;
    detail: string;
    data: {
        title: string;
        description: string;
    };
}

/**
 * 프롬프트 등록 - 제목, 설명 AI 제안 받기
 */
const getAiSuggestion = async () => {
    const res = await GET<AiSuggestionResponse>("/prompts/suggestions");
    // success, detail, data
    return res.data.data;
};

export const useGetAiSuggestions = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["aiSuggestions"],
        queryFn: getAiSuggestion,
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
    };
};
