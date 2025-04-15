"use client";

import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import { useDeviceSize } from "@/components/DeviceContext";
import { ImageCategories } from "@/core/Prompt"; // 이미지 카테고리
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import Total from "@public/svg/home/Total"; // 전체 아이콘
import { Flex } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const SearchChipsImage = () => {
    const [searchedCategory, setSearchedCategory] = useRecoilState(
        searchedCategoryState
    );
    const searchedkeyword = useRecoilValue(searchedKeywordState);
    const router = useRouter();
    const pathname = usePathname();
    const setCategory = useSetRecoilState(searchedCategoryState);
    const { isUnderTablet } = useDeviceSize();

    const handleCategoryClick = (categoryKey: string) => {
        setCategory(categoryKey);
    };

    const totalImageCategories = {
        total: { ko: "전체", en: "total", emoji: <Total /> },
        ...ImageCategories,
    };

    return (
        <SearchChipsWrapper $isVisible={true}>
            {Object.entries(totalImageCategories).map(([key, category]) => (
                <StyledButton
                    key={key}
                    id={`category-button-${category.en}`}
                    data-gtm-category={category.en}
                    onClick={() => handleCategoryClick(category.en)}
                    $selected={searchedCategory === category.en}
                    $mobile={isUnderTablet}
                    hierarchy="normal"
                >
                    <Flex vertical justify="center" align="center">
                        {category.emoji && (
                            <span style={{ fontSize: "20px" }}>
                                {category.emoji}
                            </span>
                        )}
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

export default SearchChipsImage;

const SearchChipsWrapper = styled.div<{ $isVisible: boolean }>`
    ${({ theme }) => theme.mixins.flexBox("row", "start", "center")};
    gap: 8px;
    box-sizing: content-box;
    overflow-x: scroll !important;
    overflow-y: hidden;
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;

    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    max-height: ${({ $isVisible }) => ($isVisible ? "92px" : "0px")};
    transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out;

    &::-webkit-scrollbar {
        height: 4px;
        display: block !important;
    }

    &::-webkit-scrollbar-track {
        border-radius: 4px;
        background: var(--gray-200, #dee0e8);
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: var(--primary-100, #7580ea);
    }
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
