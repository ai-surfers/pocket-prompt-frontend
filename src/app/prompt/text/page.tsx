// src/app/prompt/text/page.tsx
import HomeContentBase from "@/components/home/HomeContentBase";
import { usePrefetchPromptList } from "@/hooks/prefetches/usePrefetchPromptList";
import { Suspense } from "react";

export default async function TextPromptPage() {
    await usePrefetchPromptList();

    return (
        <Suspense fallback={null}>
            <HomeContentBase promptType="text" initialMenu="1" />
        </Suspense>
    );
}
