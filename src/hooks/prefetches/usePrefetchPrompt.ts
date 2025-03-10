import serverQueryClient from "@/apis/serverQueryClient";
import { PROMPT_KEYS } from "../queries/QueryKeys";
import { getPrompt } from "@/apis/prompt/prompt";

/**
 * 프롬프트 상세 정보를 서버 컴포넌트에서 미리 가져오는 함수
 * @param promptId
 */

export const prefetchPrompt = async (promptId: string) => {
    const queryClient = serverQueryClient();
    const QUERY_KEY = PROMPT_KEYS.detail(promptId);

    try {
        await queryClient.prefetchQuery({
            queryKey: QUERY_KEY,
            queryFn: () => getPrompt(promptId).then((res) => res),
        });
    } catch (error) {
        console.error(
            `[usePrefetchPrompt] 프리페치 실패 (ID: ${promptId})`,
            error
        );
    }
};
