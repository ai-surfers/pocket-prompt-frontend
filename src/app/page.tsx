import HomeContent from "@/components/home/HomeContent";
import { prefetchPrompts } from "@/hooks/prefetches/usePrefetchPrompts";
import { Suspense } from "react";

export default async function HomePage() {
    await prefetchPrompts();

    return (
        <Suspense fallback={null}>
            <HomeContent />
            {/* 사이드 광고가 렌더링 */}
        </Suspense>
    );
}
