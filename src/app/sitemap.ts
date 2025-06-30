import { getPromptsList } from "@/apis/prompt/prompt";
import { GetPromptsListParams } from "@/apis/prompt/prompt.model";
import { MetadataRoute } from "next";

export const dynamic = "force-static";

const WEB_URL =
    process.env.NEXT_PUBLIC_WEB_URL || "https://www.pocket-prompt.com";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

interface Prompt {
    id: string;
    created_at: string;
}

async function fetchPrompts(promptType: "text" | "image"): Promise<Prompt[]> {
    const allPrompts: Prompt[] = [];
    const LIMIT = 100;
    const MAX_PAGES = 10;

    for (let page = 1; page <= MAX_PAGES; page++) {
        try {
            const params: GetPromptsListParams = {
                view_type: "open",
                prompt_type: promptType,
                sort_by: "created_at",
                sort_order: "desc",
                limit: LIMIT,
                page,
            };
            const res = await getPromptsList(params);
            const list = res?.prompt_info_list ?? [];
            if (!Array.isArray(list) || list.length === 0) break;
            allPrompts.push(...list);
            if (list.length < LIMIT) break;
        } catch (error: any) {
            const msg = error?.response?.data || error;
            console.error(
                `[sitemap] Error fetching ${promptType} page ${page}:`,
                msg
            );
            break;
        }
    }
    return allPrompts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    if (process.env.APP_ENV !== "production") {
        return [];
    }

    try {
        const [textPrompts, imagePrompts] = await Promise.all([
            fetchPrompts("text"),
            fetchPrompts("image"),
        ]);

        const routes: MetadataRoute.Sitemap = [
            {
                url: `${WEB_URL}/prompt/text`,
                lastModified: textPrompts[0]
                    ? new Date(textPrompts[0].created_at)
                    : undefined,
            },
            {
                url: `${WEB_URL}/prompt/image`,
                lastModified: imagePrompts[0]
                    ? new Date(imagePrompts[0].created_at)
                    : undefined,
            },
            {
                url: `${WEB_URL}/extension`,
                lastModified: new Date("2025-06-29"),
            },
            {
                url: `${WEB_URL}/price`,
                lastModified: new Date("2025-06-29"),
            },
            ...textPrompts.map((p) => ({
                url: `${WEB_URL}/prompt/text/${p.id}`,
                lastModified: new Date(p.created_at),
            })),
            ...imagePrompts.map((p) => ({
                url: `${WEB_URL}/prompt/image/${p.id}`,
                lastModified: new Date(p.created_at),
            })),
        ];

        return routes;
    } catch (e) {
        console.error("[sitemap] Unexpected error generating sitemap", e);
        return [];
    }
}
