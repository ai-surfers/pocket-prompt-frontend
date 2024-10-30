import { AxiosError } from "axios";
import { GET } from "../client";
import {
    GetPromptsResponse,
    GetPromptsParams,
} from "@/apis/prompt/prompt.model";

export const getPrompts = async (
    params: GetPromptsParams
): Promise<GetPromptsResponse> => {
    try {
        const res = await GET<GetPromptsResponse>("/prompts-list", {
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
