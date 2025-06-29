import { MetadataRoute } from "next";
import { getPromptsList } from "@/apis/prompt/prompt";

export const dynamic = "force-static";

export async function GET(): Promise<MetadataRoute.Sitemap> {
    if (process.env.APP_ENV !== "production") {
      return [];
    }

    const baseUrl = process.env.NEXT_PUBLIC_WEB_URL ?? "https://www.pocket-prompt.com";

    const [textPrompts, imagePrompts] = await Promise.all([
      getPromptsList({
        view_type: "open",
        sort_by: "created_at",
        sort_order: "desc",
        limit: 1000,
        page: 1,
        prompt_type: "text",
      }),
      getPromptsList({
        view_type: "open",
        sort_by: "created_at",
        sort_order: "desc",
        limit: 1000,
        page: 1,
        prompt_type: "image",
      }),
    ]);

    const latestTextCreated = textPrompts.prompt_info_list[0]?.created_at;
    const latestImageCreated = imagePrompts.prompt_info_list[0]?.created_at;

    const staticEntries: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/prompt/text`,
        lastModified: latestTextCreated,
      },
      {
        url: `${baseUrl}/prompt/image`,
        lastModified: latestImageCreated,
      },
      {
        url: `${baseUrl}/extension`,
        lastModified: "2025-06-29",
      },
      {
        url: `${baseUrl}/price`,
        lastModified: "2025-06-29",
      },
    ];

    const dynamicEntries: MetadataRoute.Sitemap = [
      ...textPrompts.prompt_info_list.map((prompt) => ({
        url: `${baseUrl}/prompt/text/${prompt.id}`,
        lastModified: prompt.created_at,
      })),
      ...imagePrompts.prompt_info_list.map((prompt) => ({
        url: `${baseUrl}/prompt/image/${prompt.id}`,
        lastModified: prompt.created_at,
      })),
    ];

    return [...staticEntries, ...dynamicEntries];
}
