import { z } from "zod";

/**
 * 프롬프트 등록 시 사용하는 프롬프트 폼 스키마
 */
export const promptSchema = z.object({
    title: z.string(),
    description: z.string(),
    visibility: z.string(),
    categories: z.array(z.string()).min(1).max(5),
    ai_platforms_used: z.array(z.string()).min(1),
    prompt_template: z.string(),
});

export const defaultPromptSchema = {
    visibility: "Public",
};

export type PromptSchemaType = z.infer<typeof promptSchema>;
