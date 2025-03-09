import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import { Categories } from "@/core/Prompt";
import useDeviceSize from "@/hooks/useDeviceSize";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import Total from "@public/svg/home/Total";
import { Flex } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const SearchChips = () => {
    const [searchedCategory, setSearchedCategory] = useRecoilState(
        searchedCategoryState
    );
    const searchedkeyword = useRecoilValue(searchedKeywordState);

    const { isUnderTablet } = useDeviceSize();

    const handleChipClick = (chipValue: string) => {
        setSearchedCategory(chipValue);
    };

    const totalCategories = {
        total: { ko: "전체", en: "total", emoji: <Total /> },
        ...Categories,
    };

    return (
        <SearchChipsWrapper $isVisible={searchedkeyword === ""}>
            {Object.entries(totalCategories).map(([key, category]) => (
                <StyledButton
                    key={key}
                    id={`category-button-${category.en}`}
                    data-gtm-category={category.en}
                    onClick={() => handleChipClick(category.en)}
                    $selected={searchedCategory === category.en}
                    $mobile={isUnderTablet}
                    hierarchy="normal"
                >
                    <Flex vertical justify="center">
                        {category.emoji}
                        <Text
                            font={isUnderTablet ? "c1_12_semi" : "c1_12_reg"}
                            color={
                                searchedCategory === category.en
                                    ? "primary"
                                    : "G_400"
                            }
                        >
                            {category.ko}
                        </Text>
                    </Flex>
                </StyledButton>
            ))}
        </SearchChipsWrapper>
    );
};

export default SearchChips;

const SearchChipsWrapper = styled.div<{ $isVisible: boolean }>`
    ${({ theme }) => theme.mixins.flexBox("row", "start", "center")};
    gap: 8px;
    overflow-x: scroll;
    width: 100%;

    // 사라지는 모션
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    max-height: ${({ $isVisible }) =>
        $isVisible ? "80px" : "0px"}; /* 배너 높이 지정 */
    overflow-y: hidden;
    transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out;
`;

const StyledButton = styled(Button)<{ $selected: boolean; $mobile: boolean }>`
    width: 60px;
    height: 80px;
    background-color: ${({ $selected, theme }) =>
        $selected ? theme.colors.primary_10 : theme.colors.G_50};
    border: ${({ $selected, theme }) =>
        $selected ? "1px solid var(--primary-40, #C8CCF7)" : "none"};
    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")}
`;
