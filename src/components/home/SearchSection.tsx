"use client";

import { styled } from "styled-components";
import SearchBar from "./Search/SearchBar";
import SearchChips from "./Search/SearchChips";

const SearchSection = () => {
    return (
        <SearchWrapper>
            <SearchBar />
            <SearchChips />
        </SearchWrapper>
    );
};

const SearchWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    ${({ theme }) => theme.mixins.flexBox("column")};
    gap: 12px;
`;

export default SearchSection;
