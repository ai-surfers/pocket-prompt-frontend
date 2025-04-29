import { getPrompt } from "@/apis/prompt/prompt";
import serverQueryClient from "@/apis/serverQueryClient";
import { PROMPT_KEYS } from "../queries/QueryKeys";

/**
 * 프롬프트 상세 정보를 서버 컴포넌트에서 미리 가져오는 함수
 * @param promptType "text" | "image"
 * @param promptId
 */
export const prefetchPrompt = async (
    promptType: "text" | "image",
    promptId: string
) => {
    const queryClient = serverQueryClient();
    const QUERY_KEY = PROMPT_KEYS.detail(promptId);

    try {
        await queryClient.prefetchQuery({
            queryKey: QUERY_KEY,

            queryFn: () => getPrompt(promptId),
        });
    } catch (error) {
        console.error(
            `[usePrefetchPrompt] 프리페치 실패 (type: ${promptType}, id: ${promptId})`,
            error
        );
    }
};
