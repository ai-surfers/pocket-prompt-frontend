import styled from "styled-components";
import PaginatedPrompt from "./PaginatedPrompt";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useRecoilValue } from "recoil";

const PaginatedPromptSection = () => {
    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);

    return (
        <>
            {searchedKeyword && (
                <SectionWrapper>
                    <PaginatedPrompt type="search" />
                </SectionWrapper>
            )}
            {searchedCategory && (
                <SectionWrapper>
                    <PaginatedPrompt type="search" />
                </SectionWrapper>
            )}
            {!searchedKeyword && !searchedCategory && (
                <>
                    <SectionWrapper>
                        <PaginatedPrompt type="popular" usePage={false} />
                    </SectionWrapper>
                    <SectionWrapper>
                        <PaginatedPrompt type="total" />
                    </SectionWrapper>
                </>
            )}
        </>
    );
};

export default PaginatedPromptSection;

const SectionWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
    gap: 12px;
    margin: 9px 0 44px 0;
`;
