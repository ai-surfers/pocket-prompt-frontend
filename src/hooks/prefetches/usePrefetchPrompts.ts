import { getPromptsList } from "@/apis/prompt/prompt";
import serverQueryClient from "@/apis/serverQueryClient";
import {
    PROMPT_KEYS,
    PROMPT_QUERY_KEYS_FOR_PREFETCH,
} from "@/hooks/queries/QueryKeys";
import { detectDevice } from "@/utils/deviceUtils";
import { headers } from "next/headers";

/**
 * 프롬프트 리스트를 서버 컴포넌트에서 미리 가져오는 함수
 */
export const prefetchPrompts = async () => {
    const queryClient = serverQueryClient();
    const { isUnderTablet } = detectDevice(headers().get("user-agent") || "");
    const queries = [
        {
            key: isUnderTablet
                ? PROMPT_QUERY_KEYS_FOR_PREFETCH.ALL_PROMPTS_MOBILE
                : PROMPT_QUERY_KEYS_FOR_PREFETCH.ALL_PROMPTS,
            fn: () =>
                getPromptsList({
                    view_type: "open",
                    sort_by: "created_at",
                    page: 1,
                    limit: isUnderTablet ? 5 : 18,
                    sort_order: "desc",
                }),
        },
        {
            key: PROMPT_QUERY_KEYS_FOR_PREFETCH.POPULAR_PROMPTS,
            fn: () =>
                getPromptsList({
                    view_type: "open",
                    sort_by: "star",
                    page: 1,
                    limit: 3,
                    sort_order: "desc",
                }),
        },
        {
            key: PROMPT_QUERY_KEYS_FOR_PREFETCH.FEATURED_PROMPTS,
            fn: () =>
                getPromptsList({
                    view_type: "featured",
                    sort_by: "created_at",
                    page: 1,
                    limit: 3,
                    sort_order: "desc",
                }),
        },
    ];

    await Promise.all(
        queries.map(({ key, fn }) =>
            queryClient.prefetchQuery({
                queryKey: PROMPT_KEYS.list(key),
                queryFn: fn,
            })
        )
    );
};
