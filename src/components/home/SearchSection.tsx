"use client";

import { useSearch } from "@/hooks/queries/usetenSearch";
import { useDeviceSize } from "@components/DeviceContext";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "./searchUI/SearchBar";
import SearchChips from "./searchUI/SearchChips";

interface SearchSectionProps {
    promptType: "text" | "image";
}

export default function SearchSection({ promptType }: SearchSectionProps) {
    const { isUnderTablet } = useDeviceSize();
    const {
        keyword,
        searchedCategory,
        handleSearch,
        searchResults,
        isLoading,
    } = useSearch(promptType);

    // 로컬 인풋 상태
    const [localKeyword, setLocalKeyword] = useState(keyword);
    useEffect(() => {
        setLocalKeyword(keyword);
    }, [keyword]);

    const onChangeKeyword = (value: string) => {
        setLocalKeyword(value);
    };
    const onEnter = () => {
        // 현재 카테고리 그대로 검색
        handleSearch(localKeyword, searchedCategory);
    };

    return (
        <SearchWrapper>
            <SearchBar
                value={localKeyword}
                onChange={onChangeKeyword}
                onEnter={onEnter}
                placeholder="필요한 프롬프트를 검색해보세요"
                id="search-input"
            />
            <SearchChips promptType={promptType} />
        </SearchWrapper>
    );
}

const SearchWrapper = styled.div`
    width: 100%;
    max-width: 809px;
    margin: 0 auto;
    ${({ theme }) => theme.mixins.flexBox("column")};
    gap: 20px;
`;
