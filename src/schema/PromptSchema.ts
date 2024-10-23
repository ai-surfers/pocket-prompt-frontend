import { z } from "zod";

export type PromptSchemaType = z.infer<typeof promptSchema>;

export const promptSchema = z.object({
    title: z.string(),
    description: z.string(),
    visibility: z.string(),
    categories: z.array(z.string()),
    prompt_template: z.string(),
});
