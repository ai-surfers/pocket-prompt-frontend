import styled from "styled-components";
import PaginatedPrompt from "./PaginatedPrompt";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useRecoilValue } from "recoil";
import { ViewType } from "@/apis/prompt/prompt.model";
import { usePathname } from "next/navigation";

interface PaginatedPromptSectionProps {
    viewType?: ViewType;
}

const PaginatedPromptSection = ({
    viewType = "open",
}: PaginatedPromptSectionProps) => {
    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);
    const pathname = usePathname();

    const promptContent = () => {
        if (searchedKeyword && pathname === "/") {
            // 키워드 검색시
            return (
                <SectionWrapper>
                    <PaginatedPrompt searchType="search" viewType={viewType} />
                </SectionWrapper>
            );
        } else if (
            !!searchedCategory &&
            searchedCategory !== "total" &&
            pathname === "/"
        ) {
            // 카테고리 칩 검색시
            return (
                <SectionWrapper>
                    <PaginatedPrompt
                        searchType="category"
                        viewType={viewType}
                    />
                </SectionWrapper>
            );
        } else {
            if (viewType === "open") {
                // 기본 화면 (홈 화면 접근시 첫 화면)일 경우
                return (
                    <>
                        <SectionWrapper>
                            <PaginatedPrompt
                                searchType="popular"
                                usePage={false}
                                viewType={viewType}
                            />
                        </SectionWrapper>
                        <SectionWrapper>
                            <PaginatedPrompt
                                searchType="total"
                                viewType={viewType}
                            />
                        </SectionWrapper>
                    </>
                );
            } else if (viewType === "starred") {
                return (
                    <SectionWrapper>
                        <PaginatedPrompt
                            searchType="total"
                            viewType={viewType}
                        />
                    </SectionWrapper>
                );
            } else if (viewType === "my") {
                return (
                    <SectionWrapper>
                        <PaginatedPrompt
                            searchType="total"
                            viewType={viewType}
                        />
                    </SectionWrapper>
                );
            }
        }
    };

    return <PromptSectionContainer>{promptContent()}</PromptSectionContainer>;
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
