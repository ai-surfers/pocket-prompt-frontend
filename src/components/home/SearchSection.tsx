"use client";

import {
    keywordState,
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useDeviceSize } from "@components/DeviceContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import SearchBar from "./searchUI/SearchBar";
import SearchChips from "./searchUI/SearchChips";

const SearchSection = () => {
    const { isUnderTablet } = useDeviceSize();
    const pathname = usePathname();
    const router = useRouter();

    const [keyword, setKeyword] = useRecoilState(keywordState);
    const [searchedCategory, setSearchedCategory] = useRecoilState(
        searchedCategoryState
    );
    const setSearchedKeyword = useSetRecoilState(searchedKeywordState);

    const [localKeyword, setLocalKeyword] = useState(keyword);

    // 프롬프트 타입 결정
    const promptType = pathname.includes("image") ? "image" : "text";

    // keyword 상태가 변경될 때 localKeyword 동기화
    useEffect(() => {
        console.log("localKeyword:", keyword);
        setLocalKeyword(keyword);
    }, [keyword]);

    const handleSearch = () => {
        const query = new URLSearchParams();
        if (localKeyword && localKeyword.trim() !== "") {
            query.set("keyword", localKeyword);
        }
        if (searchedCategory && searchedCategory !== "total") {
            query.set("category", searchedCategory);
        }

        const queryString = query.toString();

        router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
        setKeyword(localKeyword);
        setSearchedKeyword(localKeyword);
    };

    // SearchBar의 onChange 핸들러
    const handleKeywordChange = (value: string) => {
        setLocalKeyword(value);
    };

    // SearchBar의 onEnter 핸들러
    const handleEnter = () => {
        handleSearch();
        // 카테고리를 "전체"로 초기화 (기존 로직 유지)
        setSearchedCategory("total");
    };

    return (
        <SearchWrapper>
            <SearchBar
                value={localKeyword}
                onChange={handleKeywordChange}
                onEnter={handleEnter}
                placeholder="필요한 프롬프트를 검색해보세요"
                id="search-input"
            />

            <SearchChips promptType={promptType} />
        </SearchWrapper>
    );
};

const SearchWrapper = styled.div`
    width: 100%;
    max-width: 809px;
    margin: 0 auto;
    ${({ theme }) => theme.mixins.flexBox("column")};
    gap: 20px;
`;

export default SearchSection;
