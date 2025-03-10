import HomeContent from "@/components/home/HomeContent";
import { prefetchPromptList } from "@/hooks/prefetches/useprefetchPromptList";
import { Suspense } from "react";

export default async function HomePage() {
    await prefetchPromptList();

    return (
        <Suspense fallback={null}>
            <HomeContent />
            {/* 사이드 광고가 렌더링 */}
        </Suspense>
    );
}
