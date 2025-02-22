import styled from "styled-components";
import PromptList from "./PromptList";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useRecoilValue } from "recoil";
import { ViewType } from "@/apis/prompt/prompt.model";
import Text from "@/components/common/Text/Text";
import { useUser } from "@/hooks/useUser";
import { Flex } from "antd";
import { wrap } from "module";
import useDeviceSize from "@/hooks/useDeviceSize";

interface PromptListSectionProps {
    viewType?: ViewType;
}

const PromptListSection = ({ viewType = "open" }: PromptListSectionProps) => {
    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);
    const { userData } = useUser();
    const { isMobile } = useDeviceSize();

    const promptContent = () => {
        if (searchedKeyword) {
            // 키워드 검색시
            return (
                <LargeWrapper>
                    <PromptList
                        searchType="search"
                        viewType={viewType}
                        title={
                            <Text font="h2_20_semi" color="G_800">
                                검색 결과
                            </Text>
                        }
                    />
                </LargeWrapper>
            );
        } else if (!!searchedCategory && searchedCategory !== "total") {
            // 카테고리 칩 검색시
            return (
                <LargeWrapper>
                    <PromptList
                        searchType="category"
                        viewType={viewType}
                        title={
                            <Text font="h2_20_semi" color="G_800">
                                {searchedCategory}
                            </Text>
                        }
                    />
                </LargeWrapper>
            );
        } else {
            if (viewType === "open") {
                // 기본 화면 (홈 화면 접근시 첫 화면)일 경우
                return (
                    <Flex vertical gap={63.5}>
                        <Flex
                            gap={23}
                            justify="space-between"
                            wrap={isMobile ? "wrap" : "nowrap"}
                        >
                            <SmallWrapper>
                                <PromptList
                                    searchType="popular"
                                    usePage={false}
                                    viewType={viewType}
                                    title={
                                        <Text font="b1_18_semi" color="G_800">
                                            오늘의 인기 TOP 3
                                        </Text>
                                    }
                                />
                            </SmallWrapper>
                            <SmallWrapper>
                                <PromptList
                                    searchType="popular"
                                    usePage={false}
                                    viewType={viewType}
                                    title={
                                        <Text font="b1_18_semi" color="G_800">
                                            AI 전문가의 추천 TOP 3
                                        </Text>
                                    }
                                />
                            </SmallWrapper>
                        </Flex>

                        <LargeWrapper>
                            <PromptList
                                searchType="total"
                                viewType={viewType}
                                title={
                                    <Text font="h2_20_semi" color="G_800">
                                        전체 프롬프트
                                    </Text>
                                }
                            />
                        </LargeWrapper>
                    </Flex>
                );
            } else if (viewType === "starred") {
                return (
                    <LargeWrapper>
                        <PromptList
                            searchType="total"
                            viewType={viewType}
                            title={
                                <Text font="h2_20_semi" color="G_800">
                                    💾 <span>{userData.user?.nickname}</span>
                                    님이 저장한 프롬프트
                                </Text>
                            }
                        />
                    </LargeWrapper>
                );
            } else if (viewType === "my") {
                return (
                    <LargeWrapper>
                        <PromptList
                            searchType="total"
                            viewType={viewType}
                            title={
                                <Text font="h2_20_semi" color="G_800">
                                    내가 등록한 프롬프트
                                </Text>
                            }
                        />
                    </LargeWrapper>
                );
            }
        }
    };

    return <PromptSectionContainer>{promptContent()}</PromptSectionContainer>;
};

export default PromptListSection;

const PromptSectionContainer = styled.section`
    width: 100%;
    padding: 0 10px;
`;

const LargeWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
    gap: 12px;
    margin: 9px 0 44px 0;
`;

const SmallWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
    width: 540px;
    height: 502px;
    // margin-bottom: 63.5px;
    border-radius: 12px;
    border: 1.5px solid var(--primary-10, #f2f3fd);
    background: var(--primary-5, #f8f8fe);
    box-sizing: border-box;
    padding: 21px 12px;
`;
