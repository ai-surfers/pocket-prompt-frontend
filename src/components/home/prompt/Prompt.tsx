// 단일 프롬프트

import theme from "@/styles/theme";
import { useResetRecoilState } from "recoil";
import { pocketRunState } from "@/states/pocketRunState";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Icon from "@/components/common/Icon";

interface PromptProps {
    colored?: boolean;
    title: string;
    description: string;
    views: number;
    star: number;
    usages: number;
    index: number;
    id: string;
    isMiniHeight: boolean;
}

const Prompt = ({
    colored = false,
    title,
    description,
    views,
    star,
    usages,
    index,
    id,
    isMiniHeight,
}: PromptProps) => {
    const pointColor = colored ? theme.colors.primary : theme.colors.G_400;
    const resetPocketRunState = useResetRecoilState(pocketRunState);
    const router = useRouter();

    const handleClick = () => {
        router.push(`/prompt/${id}`);
        resetPocketRunState();
    };

    return (
        <PromptWrapper
            $colored={colored}
            onClick={handleClick}
            $isMiniHeight={isMiniHeight}
        >
            {colored && <NumberTag>{index}</NumberTag>}
            <TitlesWrapper>
                <Title $colored={colored}>{title}</Title>
                <Subtitle $isMiniHeight={isMiniHeight}>{description}</Subtitle>
            </TitlesWrapper>
            <DetailsWrapper>
                <Details>
                    <Icon name="Eye" color={colored ? "primary" : "G_400"} />
                    <Numbers color={pointColor}>{views}</Numbers>
                </Details>
                <Details>
                    <Icon name="Play" color={colored ? "primary" : "G_400"} />
                    <Numbers color={pointColor}>{usages}</Numbers>
                </Details>
                <Details>
                    <Icon
                        name="Bookmark"
                        color={colored ? "primary" : "G_400"}
                    />
                    <Numbers color={pointColor}>{star}</Numbers>
                </Details>
            </DetailsWrapper>
        </PromptWrapper>
    );
};

export default Prompt;

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
    padding: 16px;
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

const Numbers = styled.div`
    color: ${({ color }) => color};
    ${({ theme }) => theme.fonts.body3};
    ${({ theme }) => theme.fonts.regular};
`;
