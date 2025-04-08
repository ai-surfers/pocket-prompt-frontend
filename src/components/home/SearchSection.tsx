"use client";

import { usePathname } from "next/navigation";
import { styled } from "styled-components";
import SearchBar from "./searchUI/SearchBar";
import SearchChipsImage from "./searchUI/SearchChipsImage";
import SearchChipsText from "./searchUI/SearchChipsText";

const SearchSection = () => {
    const pathname = usePathname();

    const renderSearchChips = () => {
        switch (pathname) {
            case "/image":
                return <SearchChipsImage />;
            case "/text":
            default:
                return <SearchChipsText />;
        }
    };

    return (
        <SearchWrapper>
            <SearchBar />
            {renderSearchChips()}
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
