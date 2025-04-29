// src/app/prompt/text/page.tsx
import HomeContentBase from "@/components/home/HomeContentBase";
import { usePrefetchPromptList } from "@/hooks/prefetches/usePrefetchPromptList";

export default async function TextPromptPage() {
    await usePrefetchPromptList();

    return <HomeContentBase promptType="image" initialMenu="2" />;
}
