"use client";

import { getPromptsList } from "@/apis/prompt/prompt";
import type { PromptDetails } from "@/apis/prompt/prompt.model";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { sortTypeState } from "@/states/sortState";
import { useDeviceSize } from "@components/DeviceContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export const useSearch = (promptType: "text" | "image") => {
    const { isUnderTablet } = useDeviceSize();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Recoil
    const [searchedCategory, setSearchedCategory] = useRecoilState(
        searchedCategoryState
    );
    const setSearchedKeyword = useSetRecoilState(searchedKeywordState);
    const sortBy = useRecoilValue(sortTypeState);

    // Local
    const [searchResults, setSearchResults] = useState<PromptDetails[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // 새로고침 감지 플래그
    const initializedRef = useRef(false);

    /**
     * 1) 페이지 초기화 및 새로고침 처리
     */
    useEffect(() => {
        if (initializedRef.current) return;

        let navType: string = "navigate";
        if (typeof performance !== "undefined") {
            const [entry] = performance.getEntriesByType(
                "navigation"
            ) as PerformanceNavigationTiming[];
            navType = entry?.type || "navigate";
        }

        if (navType === "reload") {
            setSearchedKeyword("");
            setSearchedCategory("total");
            setSearchResults(undefined);
            router.replace(pathname, { scroll: false });
        } else {
            const kw = searchParams.get("keyword") || "";
            const cat = searchParams.get("category") || "total";
            setSearchedKeyword(kw);
            setSearchedCategory(cat);
        }

        initializedRef.current = true;
        setIsInitialized(true);
    }, [
        pathname,
        router,
        searchParams,
        setSearchedKeyword,
        setSearchedCategory,
    ]);

    /**
     * 2) URL 쿼리 변경 시 상태 동기화
     */
    useEffect(() => {
        const kw = searchParams.get("keyword") || "";
        const cat = searchParams.get("category") || "total";

        if (kw !== searchParams.get("keyword") || cat !== searchedCategory) {
            setSearchedKeyword(kw);
            setSearchedCategory(cat);
        }

        if (!kw && cat === "total") {
            setSearchResults(undefined);
        }
    }, [
        searchParams,
        searchedCategory,
        setSearchedKeyword,
        setSearchedCategory,
    ]);

    /**
     * 3) 검색 실행 및 URL 업데이트
     */
    const handleSearch = (newKeyword: string, newCategory: string) => {
        const qp = new URLSearchParams();
        if (newKeyword) qp.set("keyword", newKeyword);
        if (newCategory && newCategory !== "total")
            qp.set("category", newCategory);

        router.push(`${pathname}?${qp.toString()}`, { scroll: false });

        if (!newKeyword && newCategory === "total") {
            setSearchResults(undefined);
            return;
        }

        let mounted = true;
        setIsLoading(true);
        getPromptsList({
            view_type: "starred",
            query: newKeyword || undefined,
            categories: newCategory !== "total" ? newCategory : undefined,
            limit: isUnderTablet ? 5 : 18,
            page: 1,
            sort_by: sortBy,
            prompt_type: promptType,
        })
            .then((res) => {
                if (mounted) {
                    const filteredResults = res.prompt_info_list.filter(
                        (item) => item.type === promptType
                    );
                    setSearchResults(filteredResults);
                }
            })
            .catch(() => {
                if (mounted) setSearchResults([]);
            })
            .finally(() => {
                if (mounted) setIsLoading(false);
            });

        return () => {
            mounted = false;
        };
    };

    /**
     * 4) 상세 페이지로 이동
     */
    const navigateToDetail = (promptId: string) => {
        const qp = new URLSearchParams();
        if (searchParams.get("keyword"))
            qp.set("keyword", searchParams.get("keyword")!);
        if (searchedCategory && searchedCategory !== "total")
            qp.set("category", searchedCategory);

        router.push(`/prompt/${promptType}/${promptId}?${qp.toString()}`, {
            scroll: false,
        });
    };

    return {
        searchedCategory,
        searchResults,
        handleSearch,
        navigateToDetail,
        promptType,
        isLoading,
        isInitialized,
    };
};
