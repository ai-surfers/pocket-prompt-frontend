// src/hooks/queries/useSearch.ts
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
    const [isInitialized, setIsInitialized] = useState(false); // 초기화 완료 여부

    // 새로고침 감지를 위한 플래그
    const initializedRef = useRef(false);

    /**
     * 1) 새로고침 시 초기화 및 URL 동기화
     */
    useEffect(() => {
        if (initializedRef.current) return;

        // 브라우저 네비게이션 타입 확인
        let navType: string = "navigate";
        if (typeof performance !== "undefined") {
            const [entry] = performance.getEntriesByType(
                "navigation"
            ) as PerformanceNavigationTiming[];
            navType = entry?.type || "navigate";
        }

        if (navType === "reload" || navType === "navigate") {
            // 새로고침 또는 직접 진입 시: Recoil 상태 즉시 초기화
            setKeyword("");
            setSearchedKeyword("");
            setSearchedCategory("total");
            setSearchResults(undefined);
            // URL에 남아있을 수 있는 ?keyword=&category= 제거
            router.replace(pathname, { scroll: false });
        } else {
            // 뒤로/앞으로 가기 시: URL에서 상태 복원
            const kw = searchParams.get("keyword") || "";
            const cat = searchParams.get("category") || "total";
            setKeyword(kw);
            setSearchedKeyword(kw);
            setSearchedCategory(cat);
        }

        initializedRef.current = true;
        setIsInitialized(true); // 초기화 완료 표시
    }, [
        pathname,
        router,
        searchParams,
        setKeyword,
        setSearchedKeyword,
        setSearchedCategory,
    ]);

    /**
     * 2) URL 쿼리가 바뀔 때마다 Recoil 상태 동기화
     */
    useEffect(() => {
        // 초기화가 완료된 이후에만 URL 동기화 수행
        if (!isInitialized) return;

        const kw = searchParams.get("keyword") || "";
        const cat = searchParams.get("category") || "total";

        setKeyword(kw);
        setSearchedKeyword(kw);
        setSearchedCategory(cat);

        // 검색이 초기 상태(total)라면 결과 비우기
        if (!kw && cat === "total") {
            setSearchResults(undefined);
        }
    }, [
        searchParams,
        setKeyword,
        setSearchedKeyword,
        setSearchedCategory,
        isInitialized,
    ]);

    /**
     * 3) Recoil의 keyword/category가 바뀔 때마다 실제 API 호출
     */
    useEffect(() => {
        // 초기화가 완료된 이후에만 API 호출 수행
        if (!isInitialized) return;

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
    }, [
        keyword,
        searchedCategory,
        promptType,
        sortBy,
        isUnderTablet,
        isInitialized,
    ]);

    /**
     * 4) 사용자가 직접 검색(엔터 / 카테고리 클릭) 시
     *    → URL에만 반영 (2)번 Effect가 Recoil 동기화)
     */
    const handleSearch = (newKeyword: string, newCategory: string) => {
        const qp = new URLSearchParams();
        if (newKeyword) qp.set("keyword", newKeyword);
        if (newCategory && newCategory !== "total")
            qp.set("category", newCategory);

        router.push(`${pathname}?${qp.toString()}`);
    };

    return {
        keyword,
        searchedCategory,
        searchResults,
        handleSearch,
        promptType,
        isLoading,
        isInitialized,
    };
};
