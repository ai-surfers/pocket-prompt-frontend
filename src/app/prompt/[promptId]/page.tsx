import PromptContent from "@/components/prompt/PromptContent";
import { prefetchPrompt } from "@/hooks/prefetches/usePrefetchPrompt";
import React from "react";

export interface PromptPageProps {
    params: { promptId: string };
}

const PromptPage = async ({ params }: PromptPageProps) => {
    const { promptId } = params;

    await prefetchPrompt(promptId);

    return <PromptContent promptId={promptId} />;
};

export default PromptPage;
