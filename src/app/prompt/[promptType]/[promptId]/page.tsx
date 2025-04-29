import PromptContent from "@/components/prompt/PromptContent";
import { prefetchPrompt } from "@/hooks/prefetches/usePrefetchPrompt";

export interface PromptPageProps {
    params: {
        promptType: "text" | "image";
        promptId: string;
    };
}

const PromptPage = async ({ params }: PromptPageProps) => {
    const { promptType, promptId } = params;

    await prefetchPrompt(promptType, promptId);

    return <PromptContent promptType={promptType} promptId={promptId} />;
};

export default PromptPage;
