// src/components/home/prompt/promptConfig.ts
import { Categories, ImageCategories } from "@/core/Prompt";
import PromptCardImage from "./card/PromptCardImage";
import {
    default as PromptCardText,
    default as PromptPopularCardText,
} from "./card/PromptCardText";
import PromptPopularCardImage from "./card/PromptPopularCardImage";

export const promptConfigs = {
    text: {
        promptType: "text" as const,
        categoriesMap: Categories,
        PopularCard: PromptPopularCardText,
        Card: PromptCardText,
    },
    image: {
        promptType: "image" as const,
        categoriesMap: ImageCategories,
        PopularCard: PromptPopularCardImage,
        Card: PromptCardImage,
    },
};
