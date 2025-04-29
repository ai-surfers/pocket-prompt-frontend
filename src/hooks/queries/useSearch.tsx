"use client";

import { getPromptsList } from "@/apis/prompt/prompt";
import type { PromptDetails } from "@/apis/prompt/prompt.model";
import {
    keywordState,
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
    const [keyword, setKeyword] = useRecoilState(keywordState);
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
            // 새로고침 시 초기화
            setKeyword("");
            setSearchedKeyword("");
            setSearchedCategory("total");
            setSearchResults(undefined);
            router.replace(pathname, { scroll: false });
        } else {
            // 뒤로/앞으로 가기 또는 최초 진입 시 URL에서 상태 복원
            const kw = searchParams.get("keyword") || "";
            const cat = searchParams.get("category") || "total";
            setKeyword(kw);
            setSearchedKeyword(kw);
            setSearchedCategory(cat);
        }

        initializedRef.current = true;
        setIsInitialized(true);
    }, [
        pathname,
        router,
        searchParams,
        setKeyword,
        setSearchedKeyword,
        setSearchedCategory,
    ]);

    /**
     * 2) URL 쿼리 변경 시 상태 동기화
     */
    useEffect(() => {
        const kw = searchParams.get("keyword") || "";
        const cat = searchParams.get("category") || "total";

        // 상태가 변경된 경우에만 업데이트
        if (kw !== keyword || cat !== searchedCategory) {
            setKeyword(kw);
            setSearchedKeyword(kw);
            setSearchedCategory(cat);
        }

        // 검색이 초기 상태라면 결과 비우기
        if (!kw && cat === "total") {
            setSearchResults(undefined);
        }
    }, [
        searchParams,
        keyword,
        searchedCategory,
        setKeyword,
        setSearchedKeyword,
        setSearchedCategory,
    ]);

    /**
     * 3) Recoil 상태 변경 시 API 호출
     */
    useEffect(() => {
        if (!keyword && searchedCategory === "total") {
            setSearchResults(undefined);
            return;
        }

        let mounted = true;
        setIsLoading(true);
        getPromptsList({
            prompt_type: promptType,
            view_type: "open",
            query: keyword || undefined,
            categories:
                searchedCategory !== "total" ? searchedCategory : undefined,
            limit: isUnderTablet ? 5 : 18,
            page: 1,
            sort_by: sortBy,
        })
            .then((res) => {
                if (mounted) setSearchResults(res.prompt_info_list);
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
    }, [keyword, searchedCategory, promptType, sortBy, isUnderTablet]);

    /**
     * 4) 검색 실행 및 URL 업데이트
     */
    const handleSearch = (newKeyword: string, newCategory: string) => {
        const qp = new URLSearchParams();
        if (newKeyword) qp.set("keyword", newKeyword);
        if (newCategory && newCategory !== "total")
            qp.set("category", newCategory);

        router.push(`${pathname}?${qp.toString()}`, { scroll: false });
    };

    /**
     * 5) 상세 페이지로 이동 (쿼리 파라미터 유지)
     */
    const navigateToDetail = (promptId: string) => {
        const qp = new URLSearchParams();
        if (keyword) qp.set("keyword", keyword);
        if (searchedCategory && searchedCategory !== "total")
            qp.set("category", searchedCategory);

        router.push(`/prompt/${promptType}/${promptId}?${qp.toString()}`, {
            scroll: false,
        });
    };

    return {
        keyword,
        searchedCategory,
        searchResults,
        handleSearch,
        navigateToDetail,
        promptType,
        isLoading,
        isInitialized,
    };
};
