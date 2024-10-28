import Button from "@/components/common/Button/Button";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const SearchChips = () => {
    const setSearchedCategory = useSetRecoilState(searchedCategoryState);
    const setSearchedKeyword = useSetRecoilState(searchedKeywordState);

    const chips = [
        { value: "total", title: "전체" },
        { value: "branding", title: "브랜딩" },
        { value: "blog", title: "블로그" },
        { value: "business", title: "비즈니스" },
        { value: "development", title: "개발" },
        { value: "marketing", title: "마케팅" },
        { value: "research", title: "연구" },
        { value: "writing", title: "글쓰기" },
        { value: "productivity", title: "생산성" },
        { value: "language", title: "언어" },
        { value: "entertainment", title: "재미" },
        { value: "video", title: "영상기획" },
    ];

    const handleChipClick = (chipValue: string) => {
        setSearchedKeyword("");
        setSearchedCategory(chipValue);
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
