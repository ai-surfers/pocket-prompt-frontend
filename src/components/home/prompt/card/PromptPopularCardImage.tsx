// src/components/home/prompt/card/PromptPopularCardImage.tsx
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
import { useState } from "react"; // useState 추가
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";

interface PromptCardImageWithTextProps {
    promptType: "text" | "image";
    title: string;
    description: string;
    views: number;
    star: number;
    usages: number;
    id: string;
    sampleMedia: string[];
    isMiniHeight?: boolean;
}

const PromptPopularCardImage = ({
    promptType,
    title,
    description,
    views,
    star,
    usages,
    id,
    sampleMedia,
    isMiniHeight = false,
}: PromptCardImageWithTextProps) => {
    const resetPocketRunState = useResetRecoilState(pocketRunState);
    const router = useRouter();
    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);

    const handleClick = () => {
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
    // thumbnail 계산 및 기본 이미지 설정
    const [thumbnail, setThumbnail] = useState(
        sampleMedia && sampleMedia.length > 0 && sampleMedia[0]
            ? sampleMedia[0]
            : "" // 기본 이미지
    );

    // 이미지 로딩 에러 처리
    const handleImageError = () => {
        setThumbnail("");
    };

    return (
        <PromptWrapper onClick={handleClick} $isMiniHeight={isMiniHeight}>
            {/* 이미지 영역 */}
            <ImageWrapper>
                <PromptImage
                    src={thumbnail}
                    alt={title}
                    onError={handleImageError}
                />
            </ImageWrapper>

            {/* 텍스트 영역 */}
            <ContentWrapper>
                <TitlesWrapper>
                    <Title>
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

                {/* 조회수, 사용 수, 북마크 수 */}
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
            </ContentWrapper>
        </PromptWrapper>
    );
};

export default PromptPopularCardImage;

const PromptWrapper = styled.div<{ $isMiniHeight: boolean }>`
    ${({ theme }) => theme.mixins.flexBox("row")};
    width: 100%;
    min-height: 120px;
    height: ${({ $isMiniHeight }) =>
        $isMiniHeight ? "150px" : "240px"}; // 이미지 포함 높이 조정
    box-sizing: border-box;
    border-radius: 12px;
    border: 1.5px solid ${({ theme }) => theme.colors.primary_20};
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    flex-shrink: 0;
    position: relative;

    &:hover {
        box-shadow: 0px 0px 64px 0px rgba(117, 128, 234, 0.18);
    }
`;

const ImageWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 130px;
    height: 100%;
    border-radius: 12px 0 0 12px;
    overflow: hidden;
`;

const PromptImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ContentWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "space-between")};
    flex: 1;
    margin-left: 142px;
    padding: 16px;
    padding-left: 0;
    gap: 8px;
    height: 90%;
`;

const TitlesWrapper = styled.div`
    width: 100%;

    flex: 1;
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

const Title = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${({ theme }) => theme.fonts.body1};
    ${({ theme }) => theme.fonts.semibold};
    color: ${({ theme }) => theme.colors.G_600};
    margin-bottom: 8px;
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
