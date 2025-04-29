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

    // “첫 사용” 플래그
    const initializedRef = useRef(false);

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
            // ✨ 새로고침/직접 주소창 진입인 경우: 완전 초기화
            setKeyword("");
            setSearchedKeyword("");
            setSearchedCategory("total");
            setSearchResults(undefined);
            // URL 에 남아있을 수 있는 ?keyword=&category= 를 지웁니다
            router.replace(pathname, { scroll: false });
        } else {
            // ✨ 뒤로/앞으로(=detail → list) 복귀인 경우: URL 에서 읽어와서 복원
            const kw = searchParams.get("keyword") || "";
            const cat = searchParams.get("category") || "total";
            setKeyword(kw);
            setSearchedKeyword(kw);
            setSearchedCategory(cat);
        }

        initializedRef.current = true;
        // 최초 한 번만 실행
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 검색어·카테고리가 바뀔 때마다 실제 호출
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

    // 사용자가 엔터 or 카테고리 클릭 했을 때
    const handleSearch = (newKeyword: string, newCategory: string) => {
        setKeyword(newKeyword);
        setSearchedKeyword(newKeyword);
        setSearchedCategory(newCategory);
        // URL 에도 반영
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
    };
};
