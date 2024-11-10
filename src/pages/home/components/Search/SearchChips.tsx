import Button from "@/components/common/Button/Button";
import { Categories } from "@/core/Prompt";
import {
    keywordState,
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

const SearchChips = () => {
    const setKeyword = useSetRecoilState(keywordState);
    const setSearchedCategory = useSetRecoilState(searchedCategoryState);
    const [searchedKeyword, setSearchedKeyword] =
        useRecoilState(searchedKeywordState);
    const [selectedButton, setSelectedButton] = useState("total");

    const handleChipClick = (chipValue: string) => {
        setSearchedKeyword("");
        setSearchedCategory(chipValue);
        setSelectedButton(chipValue);
        setKeyword("");
    };

    const totalCategories = {
        total: { ko: "전체", en: "total", emoji: "" },
        ...Categories,
    };

    useEffect(() => {
        if (searchedKeyword) setSelectedButton("total");
    }, [searchedKeyword]);

    return (
        <SearchChipsWrapper>
            {Object.entries(totalCategories).map(([key, category]) => (
                <StyledButton
                    key={key}
                    onClick={() => handleChipClick(category.en)}
                    selected={selectedButton === category.en}
                >
                    {category.ko}
                </StyledButton>
            ))}
        </SearchChipsWrapper>
    );
};

export default SearchChips;

const SearchChipsWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    width: 445px;
    flex-wrap: wrap;
    gap: 8px;
`;

const StyledButton = styled(Button)<{ selected: boolean }>`
    height: 32px;
    ${({ theme }) => theme.fonts.b3_14_med}
    background-color: ${({ selected, theme }) =>
        selected ? theme.colors.primary : theme.colors.white};
    color: ${({ selected, theme }) =>
        selected ? theme.colors.white : theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary_30};
`;