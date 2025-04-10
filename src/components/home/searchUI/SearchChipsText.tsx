import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import { useDeviceSize } from "@/components/DeviceContext";
import { Categories } from "@/core/Prompt";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import Total from "@public/svg/home/Total";
import { Flex } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const SearchChips = () => {
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

    const totalCategories = {
        total: { ko: "전체", en: "total", emoji: <Total /> },
        ...Categories,
    };

    return (
        <SearchChipsWrapper $isVisible={true}>
            {Object.entries(totalCategories).map(([key, category]) => (
                <StyledButton
                    key={key}
                    id={`category-button-${category.en}`}
                    data-gtm-category={category.en}
                    onClick={() => handleCategoryClick(category.en)}
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
    box-sizing: content-box;
    overflow-x: scroll !important;
    overflow-y: hidden;
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;

    // 사라지는 모션
    /* opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    max-height: ${({ $isVisible }) => ($isVisible ? "92px" : "0px")}; =
    transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out;
    */
    opacity: 1;
    max-height: 92px;
    transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out;

    /* 전체 스크롤바 크기 조정 */
    &::-webkit-scrollbar {
        height: 4px;
        display: block !important;
    }

    /* 스크롤바 트랙 (배경) */
    &::-webkit-scrollbar-track {
        border-radius: 4px;
        background: var(--gray-200, #dee0e8);
        position: relative;
        margin-left: calc(50vw - 30px);
        margin-right: calc(50vw - 30px);
    }

    /* 스크롤바 핸들 */
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
