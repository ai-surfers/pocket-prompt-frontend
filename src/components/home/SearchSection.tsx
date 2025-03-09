"use client";

import { styled } from "styled-components";
import SearchBar from "./searchUI/SearchBar";
import SearchChips from "./searchUI/SearchChips";

const SearchSection = () => {
    return (
        <SearchWrapper>
            <SearchBar />
            <SearchChips />
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
