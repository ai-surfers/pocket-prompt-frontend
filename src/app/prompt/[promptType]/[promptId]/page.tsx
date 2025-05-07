// "/prompt/{type}/{id}"
import PromptContent from "@/components/prompt/PromptContent";
import { prefetchPrompt } from "@/hooks/prefetches/usePrefetchPrompt";

interface PromptPageProps {
    params: {
        promptType: "text" | "image";
        promptId: string;
    };
}

export default async function PromptPage({ params }: PromptPageProps) {
    const { promptType, promptId } = params;
    await prefetchPrompt(promptType, promptId);

    return <PromptContent promptType={promptType} promptId={promptId} />;
}
