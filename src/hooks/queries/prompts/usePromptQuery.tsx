"use client";

import { getPrompt } from "@/apis/prompt/prompt";
import { PromptDetails } from "@/apis/prompt/prompt.model";
import { PROMPT_KEYS } from "@/hooks/queries/QueryKeys";
import { useQuery } from "@tanstack/react-query";

const usePromptQuery = (id: string) => {
    const QUERY_KEY = PROMPT_KEYS.detail(id);

    return useQuery<PromptDetails>({
        queryKey: QUERY_KEY,
        queryFn: () => getPrompt(id).then((res) => res),
        enabled: !!id,
    });
};

export default usePromptQuery;
