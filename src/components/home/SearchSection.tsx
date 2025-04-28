"use client";

import { useSearch } from "@/hooks/queries/UseSearch";
import { useDeviceSize } from "@components/DeviceContext";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "./searchUI/SearchBar";
import SearchChips from "./searchUI/SearchChips";

// @/components/home/prompt/SearchSection.tsx
const SearchSection = () => {
    const { isUnderTablet } = useDeviceSize();
    const { keyword, searchedCategory, handleSearch, promptType } = useSearch();
    const [localKeyword, setLocalKeyword] = useState(keyword);

    useEffect(() => {
        setLocalKeyword(keyword);
    }, [keyword]);

    const handleKeywordChange = (value: string) => {
        setLocalKeyword(value);
    };

    const handleEnter = () => {
        handleSearch(localKeyword, "total");
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
            {["text", "image"].includes(promptType) && (
                <SearchChips promptType={promptType as "text" | "image"} />
            )}
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
