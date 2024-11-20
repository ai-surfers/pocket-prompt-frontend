import { useMutation } from "@tanstack/react-query";
import { CreatePromptResponse, PostPromptProps } from "./usePostPrompt";
import { DELETE } from "@/apis/client";

/**
 * 프롬프트 삭제하기
 */
export const deletePrompt = async ({ id }: { id: string }) => {
    const { data } = await DELETE<CreatePromptResponse>(`/prompts/${id}`);
    return data;
};

export const useDeletePrompt = ({ onSuccess, onError }: PostPromptProps) => {
    return useMutation({
        mutationFn: ({ id }: { id: string }) => deletePrompt({ id }),
        onSuccess,
        onError,
    });
};
