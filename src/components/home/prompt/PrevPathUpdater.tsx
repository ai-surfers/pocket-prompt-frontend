// components/PrevPathUpdater.tsx
"use client";

import { prevPathState } from "@/states/navigationState";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function PrevPathUpdater() {
    const pathname = usePathname();
    const setPrevPath = useSetRecoilState(prevPathState);

    useEffect(() => {
        // 경로 변경 시 이전 경로를 저장
        return () => {
            setPrevPath(pathname);
        };
    }, [pathname, setPrevPath]);

    return null;
}
