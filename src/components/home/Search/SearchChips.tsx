import Button from "@/components/common/Button/Button";
import { Categories } from "@/core/Prompt";
import useDeviceSize from "@/hooks/useDeviceSize";
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
    const [searchedCategory, setSearchedCategory] = useRecoilState(
        searchedCategoryState
    );
    const [selectedButton, setSelectedButton] = useState("total");

    const { isUnderTablet } = useDeviceSize();

    const handleChipClick = (chipValue: string) => {
        setSearchedCategory(chipValue);
    };

    const totalCategories = {
        total: { ko: "전체", en: "total", emoji: "" },
        ...Categories,
    };

    return (
        <SearchChipsWrapper>
            {Object.entries(totalCategories).map(([key, category]) => (
                <StyledButton
                    key={key}
                    id={`category-button-${category.en}`}
                    data-gtm-category={category.en}
                    onClick={() => handleChipClick(category.en)}
                    $selected={searchedCategory === category.en}
                    $mobile={isUnderTablet}
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
    width: 100%;
    max-width: 445px;
    flex-wrap: wrap;
    gap: 8px;
`;

const StyledButton = styled(Button)<{ $selected: boolean; $mobile: boolean }>`
    height: 32px;
    ${({ $mobile, theme }) =>
        $mobile ? theme.fonts.c1_12_semi : theme.fonts.b3_14_med}

    background-color: ${({ $selected, theme }) =>
        $selected ? theme.colors.primary : theme.colors.white};
    color: ${({ $selected, theme }) =>
        $selected ? theme.colors.white : theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary_30};
`;
