"use client";

import { POST } from "@/apis/client";
import { useMutation } from "@tanstack/react-query";

/**
 *  VOC 피드백 등록하기
 */
export const createVoc = async (content: string) => {
    const { data } = await POST<{ feedback_id: string }>(`/feedback`, {
        content,
    });
    return data.data;
};

interface PostVocMutationProps {
    onSuccess: (res: { feedback_id: string }) => void;
    onError: (e: Error) => void;
}

export const usePostVoc = ({ onSuccess, onError }: PostVocMutationProps) => {
    return useMutation<{ feedback_id: string }, Error, string>({
        mutationFn: (content: string) => createVoc(content),
        onSuccess,
        onError,
    });
};
