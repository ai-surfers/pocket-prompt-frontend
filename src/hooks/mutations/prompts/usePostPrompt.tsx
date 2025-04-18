"use client";

import { InputType } from "@/core/Prompt";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BaseResponse, POST } from "../../../apis/client";

/**
 * CreatePromptRequest
 */
export interface CreatePromptRequest {
    type: string;
    title: string;
    description: string;
    visibility: string;
    categories: string[];
    prompt_template: string;
    user_input_format: InputFormat[];
    ai_platforms_used: string[];
    sample_media: string[];
}

export interface InputFormat {
    name: string;
    type: InputType;
    placeholder: string;
}

/**
 * CreatePromptResponse
 */
export interface CreatePromptResponse {
    prompt_id: string;
}

interface ErrorResponse {
    detail: string;
}

/**
 *  프롬프트 등록하기
 */
export const createPrompt = async (prompt: CreatePromptRequest) => {
    const { data } = await POST<CreatePromptResponse>(`/prompts`, prompt);
    return data;
};

export interface PostPromptProps {
    onSuccess: (res: BaseResponse<CreatePromptResponse>) => void;
    onError: (e: AxiosError<ErrorResponse>) => void;
}

export const usePostPrompt = ({ onSuccess, onError }: PostPromptProps) => {
    return useMutation({
        mutationFn: (req: CreatePromptRequest) => createPrompt(req),
        onSuccess: onSuccess,
        onError: onError,
    });
};
