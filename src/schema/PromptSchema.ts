import { z } from "zod";

export type PromptSchemaType = z.infer<typeof promptSchema>;

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
