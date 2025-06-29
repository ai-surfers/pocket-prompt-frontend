"use client";

import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import { useDeviceSize } from "@/components/DeviceContext";
import { Categories, ImageCategories } from "@/core/Prompt";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import Total from "@public/svg/home/Total";
import { Flex } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

interface SearchChipsProps {
    promptType: "text" | "image";
}

export default function SearchChips({ promptType }: SearchChipsProps) {
    const [searchedCategory, setSearchedCategory] = useRecoilState(
        searchedCategoryState
    );
    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const router = useRouter();
    const pathname = usePathname();
    const { isUnderTablet } = useDeviceSize();

    // 텍스트/이미지별 카테고리 맵
    const totalCategories = {
        total: { ko: "전체", en: "total", emoji: <Total /> },
        ...(promptType === "image" ? ImageCategories : Categories),
    };

    const handleCategoryClick = (categoryKey: string) => {
        setSearchedCategory(categoryKey);

        // URL 파라미터에 키워드·카테고리 설정
        const query = new URLSearchParams();
        if (searchedKeyword) query.set("keyword", searchedKeyword);
        if (categoryKey !== "total") query.set("category", categoryKey);

        router.push(
            `${pathname}${query.toString() ? `?${query.toString()}` : ""}`
        );
    };

    return (
        <SearchChipsWrapper $isVisible>
            {Object.entries(totalCategories).map(([key, cat]) => (
                <StyledButton
                    key={key}
                    id={`category-button-${cat.en}`}
                    data-gtm-category={cat.en}
                    onClick={() => handleCategoryClick(cat.en)}
                    $selected={searchedCategory === cat.en}
                    $mobile={isUnderTablet}
                    hierarchy="normal"
                >
                    <Flex vertical justify="center" align="center">
                        {cat.emoji && (
                            <span style={{ fontSize: 20 }}>{cat.emoji}</span>
                        )}
                        <Text
                            font={isUnderTablet ? "c1_12_semi" : "c1_12_reg"}
                            color={
                                searchedCategory === cat.en
                                    ? "primary"
                                    : "G_400"
                            }
                        >
                            {cat.ko}
                        </Text>
                    </Flex>
                </StyledButton>
            ))}
        </SearchChipsWrapper>
    );
}

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

    opacity: 1;
    max-height: 92px;
    transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out;

    &::-webkit-scrollbar {
        height: 4px;
        display: block !important;
    }

    &::-webkit-scrollbar-track {
        border-radius: 4px;
        background: var(--gray-200, #dee0e8);
        position: relative;
        margin-left: calc(50vw - 30px);
        margin-right: calc(50vw - 30px);
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
