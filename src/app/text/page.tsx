import HomeContentText from "@/components/home/prompt/HomeContentText";
import { usePrefetchPromptList } from "@/hooks/prefetches/usePrefetchPromptList";
import { Suspense } from "react";

export default async function TextPromptHomePage() {
    await usePrefetchPromptList();

    return (
        <Suspense fallback={null}>
            <HomeContentText />
        </Suspense>
    );
}
