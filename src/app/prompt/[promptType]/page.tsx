// src/app/prompt/[promptType]/page.tsx
"use client";

import HomeContentBase from "@/components/home/HomeContentBase";
import { usePrefetchPromptList } from "@/hooks/prefetches/usePrefetchPromptList";
import { Suspense } from "react";

interface Props {
    params: { promptType: "text" | "image" };
}

export default async function PromptTypePage({ params }: Props) {
    // 프리패치 훅
    await usePrefetchPromptList();

    // LNB 메뉴 인덱스 결정
    const initialMenu = params.promptType === "text" ? "1" : "2";

    return (
        <Suspense fallback={null}>
            <HomeContentBase
                promptType={params.promptType}
                initialMenu={initialMenu}
            />
        </Suspense>
    );
}
