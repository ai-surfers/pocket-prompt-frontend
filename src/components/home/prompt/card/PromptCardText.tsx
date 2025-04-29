"use client";

import Icon from "@/components/common/Icon";
import Text from "@/components/common/Text/Text";
import { pocketRunState } from "@/states/pocketRunState";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import theme from "@/styles/theme";
import { useRouter } from "next/navigation";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";

interface PromptCardTextProps {
    promptType: "text";
    colored?: boolean;
    title: string;
    description: string;
    views: number;
    star: number;
    usages: number;
    id: string;
    index?: number;
    isMiniHeight: boolean;
}

const PromptCardText = ({
    promptType,
    colored = false,
    title,
    description,
    views,
    star,
    usages,
    id,
    index,
    isMiniHeight,
}: PromptCardTextProps) => {
    const pointColor = colored ? theme.colors.primary : theme.colors.G_400;
    const resetPocketRunState = useResetRecoilState(pocketRunState);
    const router = useRouter();
    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);

    const handleClick = () => {
        // 1) promptType 과 id 를 모두 경로에 포함
        let href = `/prompt/${promptType}/${id}`;

        const params = new URLSearchParams();
        if (searchedKeyword) params.set("keyword", searchedKeyword);
        if (searchedCategory && searchedCategory !== "total")
            params.set("category", searchedCategory);

        if ([...params].length) {
            href += `?${params.toString()}`;
        }

        router.push(href);
        resetPocketRunState();
    };

    return (
        <PromptWrapper
            $colored={colored}
            onClick={handleClick}
            $isMiniHeight={isMiniHeight}
        >
            {/* {index && (
                <NumberTag>
                    <Text font="body2" color="white">
                        {index}
                    </Text>
                </NumberTag>
            )} */}

            {colored && <NumberTag>{index}</NumberTag>}
            <TitlesWrapper>
                <Title $colored={colored}>
                    <Text font="body1" color="G_600">
                        {title}
                    </Text>
                </Title>
                <Subtitle $isMiniHeight={isMiniHeight}>
                    <Text font="body3" color="G_400">
                        {description}
                    </Text>
                </Subtitle>
            </TitlesWrapper>
            <DetailsWrapper>
                <Details>
                    <Icon name="Eye" color="G_400" />
                    <Numbers color={theme.colors.G_400}>{views}</Numbers>
                </Details>
                <Details>
                    <Icon name="Play" color="G_400" />
                    <Numbers color={theme.colors.G_400}>{usages}</Numbers>
                </Details>
                <Details>
                    <Icon name="Bookmark" color="G_400" />
                    <Numbers color={theme.colors.G_400}>{star}</Numbers>
                </Details>
            </DetailsWrapper>
        </PromptWrapper>
    );
};

export default PromptCardText;

const PromptWrapper = styled.div<{ $colored: boolean; $isMiniHeight: boolean }>`
    ${({ theme }) => theme.mixins.flexBox("column", "space-between")};
    padding: 16px;
    width: 100%;
    height: ${({ $isMiniHeight }) => ($isMiniHeight ? "133px" : "157px")};
    box-sizing: border-box;
    border-radius: 12px;
    border: 1.5px solid;
    border-color: ${({ theme, $colored }) =>
        $colored ? "#ACB3F2" : theme.colors.primary_20};
    gap: 9.5px;
    background-color: ${({ $colored, theme }) =>
        $colored ? "#F2F3FD" : theme.colors.white};
    position: relative;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    flex-shrink: 0;

    &:hover {
        box-shadow: 0px 0px 64px 0px rgba(117, 128, 234, 0.18);
    }
`;

const NumberTag = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
    position: absolute;
    width: 33px;
    height: 35px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 0px 11px 0px 12px;
    top: 0;
    right: 0;
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.body2};
    ${({ theme }) => theme.fonts.bold};
`;

const TitlesWrapper = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: content-box;
    padding-bottom: 15.5px;
    border-bottom: 1.5px solid;
    border-color: ${({ theme }) => theme.colors.primary_20};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const Title = styled.div<{ $colored: boolean }>`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${({ theme }) => theme.fonts.body1};
    ${({ theme }) => theme.fonts.semibold};
    color: ${({ theme }) => theme.colors.G_600};
    margin-bottom: 8px;
    width: ${({ $colored }) => ($colored ? "calc(100% - 33px)" : "100%")};
`;

const Subtitle = styled.div<{ $isMiniHeight: boolean }>`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${({ $isMiniHeight }) => ($isMiniHeight ? 1 : 2)};
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    ${({ theme }) => theme.fonts.body3};
    ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.G_400};
`;

const DetailsWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "flex-end")};
    width: 100%;
    height: 21px;
    gap: 20px;
`;

const Details = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row")};
    gap: 4px;
`;

const Numbers = styled.div<{ color: string }>`
    color: ${({ color }) => color};
    ${({ theme }) => theme.fonts.body3};
    ${({ theme }) => theme.fonts.regular};
`;
