"use client";

import { BaseResponse, POST } from "@/apis/client";
import { useMutation } from "@tanstack/react-query";

interface AddVocResponse {
    feedback_id: string;
}

interface PostVocMutationProps {
    onSuccess: (res: BaseResponse<AddVocResponse>) => void;
    onError: (e: Error) => void;
}

const addVoc = async (content: string) => {
    const { data } = await POST<AddVocResponse>(`/feedback`, {
        content: content,
    });
    return data;
};

export const usePostVoc = ({ onSuccess, onError }: PostVocMutationProps) => {
    return useMutation({
        mutationFn: (content: string) => addVoc(content),
        onSuccess: onSuccess,
        onError: onError,
    });
};
