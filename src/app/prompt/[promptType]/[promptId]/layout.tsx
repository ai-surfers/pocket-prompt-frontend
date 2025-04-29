// src/app/prompt/[promptType]/[promptId]/layout.tsx

import { getPrompt } from "@/apis/prompt/prompt";
import { defaultMetadata } from "@/app/layout";
import type { Metadata } from "next";

interface Props {
    params: {
        promptType: string; // "text" | "image"
        promptId: string;
    };
}

const webUrl = process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3000";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { promptType, promptId } = params;

    try {
        const promptDetails = await getPrompt(promptId);

        return {
            ...defaultMetadata,
            description: promptDetails.description,
            keywords: promptDetails.title,
            openGraph: {
                ...defaultMetadata.openGraph,
                title: `[${promptType.toUpperCase()} 프롬프트] ${
                    promptDetails.title
                }`,
                description: promptDetails.description,
                url: `${webUrl}/prompt/${promptType}/${promptId}`,
            },
            twitter: {
                ...defaultMetadata.twitter,
                card: "summary_large_image",
                title: `[${promptType.toUpperCase()} 프롬프트] ${
                    promptDetails.title
                }`,
                description: promptDetails.description,
            },
        };
    } catch (error) {
        console.error("Error fetching prompt data for metadata:", error);
        return defaultMetadata;
    }
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <main>{children}</main>;
}
