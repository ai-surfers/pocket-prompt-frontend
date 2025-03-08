"use client";

import { styled } from "styled-components";
import SearchBar from "./Search/SearchBar";
import SearchChips from "./Search/SearchChips";

const SearchSection = () => {
    return (
        <Wrapper>
            <SearchWrapper>
                <SearchBar />
                <SearchChips />
            </SearchWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
`;

const SearchWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    ${({ theme }) => theme.mixins.flexBox("column")};
    gap: 12px;
`;

export default SearchSection;
