import { POST } from "../../../apis/client";
import { useMutation } from "@tanstack/react-query";

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

interface PostPocketRunOptions {
    onSuccess?: (res: PocketRunReturnTypes) => void;
    onError?: (e: Error) => void;
}

// API 호출 함수
const postPocketRun = async ({
    promptId,
    context,
    model,
}: PostPocketRunRequest): Promise<PocketRunReturnTypes> => {
    const res = await POST<PostPocketRunResponse>(
        `/prompts/${promptId}/pocket-run`,
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

const usePocketRun = (options: PostPocketRunOptions = {}) => {
    const { onSuccess, onError } = options;

    return useMutation<PocketRunReturnTypes, Error, PostPocketRunRequest>({
        mutationFn: postPocketRun,
        onSuccess,
        onError,
    });
};

export default usePocketRun;
