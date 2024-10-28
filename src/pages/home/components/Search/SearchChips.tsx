import Button from "@/components/common/Button/Button";
import { searchedCategoryState } from "@/states/searchState";
import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const SearchChips = () => {
    const setsearchedCategory = useSetRecoilState(searchedCategoryState);
    const chips = [
        { value: "브랜딩", title: "브랜딩" },
        { value: "블로그", title: "블로그" },
        { value: "비즈니스", title: "비즈니스" },
        { value: "개발", title: "개발" },
        { value: "마케팅", title: "마케팅" },
        { value: "연구", title: "연구" },
        { value: "글쓰기", title: "글쓰기" },
        { value: "생산성", title: "생산성" },
        { value: "언어", title: "언어" },
        { value: "재미", title: "재미" },
        { value: "영상기획", title: "영상기획" },
    ];

    const handleChipClick = (chipValue: string) => {
        setsearchedCategory((prevState) => new Set(prevState).add(chipValue));
    };

    return (
        <SearchChipsWrapper>
            {chips.map((chip) => (
                <StyledButton onClick={() => handleChipClick(chip.value)}>
                    {chip.title}
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

const StyledButton = styled(Button)`
    height: 32px;
    ${({ theme }) => theme.fonts.b3_14_med}
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary_30};
`;
