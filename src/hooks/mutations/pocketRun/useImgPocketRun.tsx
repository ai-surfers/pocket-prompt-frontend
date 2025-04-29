"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { POST } from "../../../apis/client";

interface PostPocketRunRequest {
    promptId: string;
    context: Record<string, string>;
    model: string;
}

interface PostPocketRunResponse {
    response: string;
}

export interface PocketRunReturnTypes {
    response: string;
    model: string;
    context: Record<string, string>;
}

interface ErrorResponse {
    detail: string;
}

interface PostPocketRunOptions {
    onSuccess?: (res: PocketRunReturnTypes) => void;
    onError?: (e: AxiosError<ErrorResponse>) => void;
}

// API 호출 함수
const postPocketRun = async ({
    promptId,
    context,
    model,
}: PostPocketRunRequest): Promise<PocketRunReturnTypes> => {
    const res = await POST<PostPocketRunResponse>(
        `/prompts/${promptId}/image-pocket-run`,
        {
            context: context,
            model: model,
        }
    );

    return {
        response: res.data.data.response,
        model: model,
        context: context,
    };
};

const useImgPocketRun = (options: PostPocketRunOptions = {}) => {
    const { onSuccess, onError } = options;

    return useMutation<
        PocketRunReturnTypes,
        AxiosError<ErrorResponse>,
        PostPocketRunRequest
    >({
        mutationFn: postPocketRun,
        onSuccess,
        onError,
    });
};

export default useImgPocketRun;
