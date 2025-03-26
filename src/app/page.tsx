import HomeContent from "@/components/home/HomeContent";
import { usePrefetchPromptList } from "@/hooks/prefetches/usePrefetchPromptList";
import { usePrefetchSubscription } from "@/hooks/prefetches/usePrefetchSubscription";
import { Suspense } from "react";

export default async function HomePage() {
    await usePrefetchPromptList();

    return (
        <Suspense fallback={null}>
            <HomeContent />
        </Suspense>
    );
}
