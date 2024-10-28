import styled from "styled-components";
import PaginatedPrompt from "./PaginatedPrompt";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";

const PaginatedPromptSection = () => {
    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);

    useEffect(() => {
        console.log("키워드 변경", searchedKeyword);
    }, [searchedKeyword]);

    useEffect(() => {
        console.log("카테고리 변경", searchedCategory);
    }, [searchedCategory]);

    return (
        <>
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
        </>
    );
};

export default PaginatedPromptSection;

const SectionWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
    gap: 12px;
    margin: 9px 0 44px 0;
`;
