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

    // 디버깅: sampleMedia 출력
    console.log("sampleMedia:", sampleMedia);

    const handleClick = () => {
        const query = new URLSearchParams();
        if (searchedKeyword && searchedKeyword.trim() !== "") {
            query.set("keyword", searchedKeyword);
        }
        if (searchedCategory && searchedCategory !== "total") {
            query.set("category", searchedCategory);
        }

        const queryString = query.toString();
        router.push(`/prompt/${id}${queryString ? `?${queryString}` : ""}`);
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
        <PromptWrapper onClick={handleClick}>
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
                    <Subtitle>
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

const PromptWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row")}; // 가로 배치로 변경
    width: 100%;
    min-height: 120px; // 최소 높이 설정
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
    margin-left: 142px; // 이미지 너비(130px) + 간격(12px)
    padding: 16px;
    padding-left: 0;
    gap: 8px;
`;

const TitlesWrapper = styled.div`
    width: 100%;
    flex: 1;
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

const Subtitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    ${({ theme }) => theme.fonts.body3};
    ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.G_400};
`;

const DetailsWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "flex-start")};
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
