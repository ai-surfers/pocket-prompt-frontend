import { getPromptsList } from "@/apis/prompt/prompt";
import { PromptDetails } from "@/apis/prompt/prompt.model";
import {
    keywordState,
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useDeviceSize } from "@components/DeviceContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";

export const useSearch = () => {
    const { isUnderTablet } = useDeviceSize();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [keyword, setKeyword] = useRecoilState(keywordState);
    const [searchedCategory, setSearchedCategory] = useRecoilState(
        searchedCategoryState
    );
    const setSearchedKeyword = useSetRecoilState(searchedKeywordState);
    const resetSearchedKeyword = useResetRecoilState(searchedKeywordState);
    const resetSearchedCategory = useResetRecoilState(searchedCategoryState);
    const [searchResults, setSearchResults] = useState<
        PromptDetails[] | undefined
    >(undefined);
    // 초기화 플래그: 새로고침 시에만 초기화 수행
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const promptType = pathname.includes("image") ? "image" : "text";

    const fetchSearchData = async (keyword: string, category: string) => {
        try {
            const params: any = {
                prompt_type: promptType,
                view_type: "open",
                limit: isUnderTablet ? 5 : 18,
                page: 1,
            };

            if (keyword) params.query = keyword;
            if (category && category !== "total") params.category = category;

            const res = await getPromptsList(params);
            const filteredResults =
                category && category !== "total"
                    ? res.prompt_info_list.filter((item: PromptDetails) =>
                          item.categories.includes(category)
                      )
                    : res.prompt_info_list;

            setSearchResults(filteredResults);
        } catch (err) {
            setSearchResults([]);
        }
    };

    // 초기화 로직: 새로고침 시에만 실행
    useEffect(() => {
        if (isInitialLoad) {
            // 새로고침 시 URL 파라미터가 있으면 초기화
            if (searchParams.get("keyword") || searchParams.get("category")) {
                setKeyword("");
                setSearchedKeyword("");
                setSearchedCategory("total");
                setSearchResults(undefined);
                router.replace(pathname); // URL 쿼리 파라미터 제거
            }
            setIsInitialLoad(false); // 초기 로드 완료
        }
    }, [isInitialLoad, pathname, router, searchParams]);

    // 검색 파라미터 처리: 초기 로드 후에만 실행
    useEffect(() => {
        if (isInitialLoad) return; // 초기 로드 중에는 실행하지 않음

        const keywordParam = searchParams.get("keyword");
        const categoryParam = searchParams.get("category");

        // 상세 페이지에서 돌아왔을 때 검색어와 카테고리 유지
        if (keywordParam !== null && keywordParam !== keyword) {
            setKeyword(keywordParam);
            setSearchedKeyword(keywordParam);
        }
        if (categoryParam !== null && categoryParam !== searchedCategory) {
            setSearchedCategory(categoryParam || "total");
        }

        // 검색 실행 조건
        if (keywordParam || (categoryParam && categoryParam !== "total")) {
            fetchSearchData(keywordParam || "", categoryParam || "total");
        } else {
            setSearchResults(undefined);
        }
    }, [searchParams, pathname, isInitialLoad]);

    const handleSearch = (newKeyword: string, newCategory: string) => {
        const query = new URLSearchParams();
        if (newKeyword) query.set("keyword", newKeyword);
        if (newCategory && newCategory !== "total")
            query.set("category", newCategory);

        router.push(
            `${pathname}${query.toString() ? `?${query.toString()}` : ""}`
        );
        setKeyword(newKeyword);
        setSearchedKeyword(newKeyword);
        setSearchedCategory(newCategory);
    };

    return {
        keyword: isInitialLoad ? "" : keyword,
        searchedCategory: isInitialLoad ? "total" : searchedCategory,
        searchResults,
        handleSearch,
        promptType,
        resetSearchedKeyword,
        resetSearchedCategory,
    };
};
