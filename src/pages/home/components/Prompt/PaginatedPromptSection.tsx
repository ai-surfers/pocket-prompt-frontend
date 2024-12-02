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
        <PromptSectionContainer>
            {searchedKeyword && (
                <SectionWrapper>
                    <PaginatedPrompt type="search" />
                </SectionWrapper>
            )}
            {!!searchedCategory && searchedCategory !== "total" && (
                <SectionWrapper>
                    <PaginatedPrompt type="category" />
                </SectionWrapper>
            )}
            {!searchedKeyword &&
                (!searchedCategory || searchedCategory === "total") && (
                    <>
                        <SectionWrapper>
                            <PaginatedPrompt type="popular" usePage={false} />
                        </SectionWrapper>
                        <SectionWrapper>
                            <PaginatedPrompt type="total" />
                        </SectionWrapper>
                    </>
                )}
        </PromptSectionContainer>
    );
};

export default PaginatedPromptSection;

const PromptSectionContainer = styled.section`
    width: 100%;
    padding: 0 10px;
`;

const SectionWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
    gap: 12px;
    margin: 9px 0 44px 0;
`;
