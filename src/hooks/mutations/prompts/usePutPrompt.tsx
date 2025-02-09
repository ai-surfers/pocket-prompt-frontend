"use client";

import { useMutation } from "@tanstack/react-query";
import {
    CreatePromptRequest,
    CreatePromptResponse,
    PostPromptProps,
} from "./usePostPrompt";
import { PUT } from "@/apis/client";

/**
 * 프롬프트 수정하기
 */

export const updatePrompt = async ({
    prompt,
    id,
}: {
    prompt: CreatePromptRequest;
    id: string;
}) => {
    const { data } = await PUT<CreatePromptResponse>(`/prompts/${id}`, prompt);
    return data;
};

export const usePutPrompt = ({ onSuccess, onError }: PostPromptProps) => {
    return useMutation({
        mutationFn: ({
            prompt,
            id,
        }: {
            prompt: CreatePromptRequest;
            id: string;
        }) => updatePrompt({ prompt, id }),
        onSuccess,
        onError,
    });
};
