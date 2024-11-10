import { AxiosError } from "axios";
import { GET } from "../client";
import {
    GetPromptsListResponse,
    GetPromptsListParams,
    PromptDetails,
} from "@/apis/prompt/prompt.model";

export const getPromptsList = async (
    params: GetPromptsListParams
): Promise<GetPromptsListResponse> => {
    try {
        const res = await GET<GetPromptsListResponse>("/prompts-list", {
            params,
        });
        return res.data.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Network error:", error.message);
            throw new Error("Failed to fetch prompts data");
        } else {
            throw error;
        }
    }
};

export const getPrompt = async (id: string): Promise<PromptDetails> => {
    try {
        const res = await GET<PromptDetails>(`/prompts/${id}`);
        return res.data.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Network error:", error.message);
            throw new Error("Failed to fetch prompt data");
        } else {
            throw error;
        }
    }
};
