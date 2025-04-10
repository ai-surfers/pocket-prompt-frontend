// src/components/home/prompt/cards/PromptCardImage.tsx

"use client";

import Icon from "@/components/common/Icon";
import Text from "@/components/common/Text/Text";
import { pocketRunState } from "@/states/pocketRunState";
import theme from "@/styles/theme";
import { useRouter } from "next/navigation";
import { useResetRecoilState } from "recoil";
import styled from "styled-components";

interface PromptCardImageProps {
    colored?: boolean;
    title: string;
    views: number;
    star: number;
    usages: number;
    id: string;
    sampleMedia: string;
    isMiniHeight: boolean;
}

const PromptCardImage = ({
    colored = false,
    title,
    views,
    star,
    usages,
    id,
    sampleMedia,
    isMiniHeight,
}: PromptCardImageProps) => {
    const pointColor = colored ? theme.colors.primary : theme.colors.G_400;
    const resetPocketRunState = useResetRecoilState(pocketRunState);
    const router = useRouter();

    const handleClick = () => {
        router.push(`/prompt/${id}`);
        resetPocketRunState();
    };

    return (
        <Card
            $image={sampleMedia}
            $colored={colored}
            onClick={handleClick}
            $isMiniHeight={isMiniHeight}
        >
            {/* 아래쪽을 어둡게 만드는 그라디언트 오버레이 */}
            <GradientOverlay />

            <ContentWrapper>
                {/* 타이틀 영역 */}
                <Title>
                    <Text font="b1_18_bold" color="white">
                        {title}
                    </Text>
                </Title>

                {/* 뷰/재생/북마크 수 표시 영역 */}
                <DetailsWrapper>
                    <Detail>
                        <Icon name="Eye" color="white" />
                        <DetailText>{views}</DetailText>
                    </Detail>
                    <Detail>
                        <Icon name="Play" color="white" />
                        <DetailText>{usages}</DetailText>
                    </Detail>
                    <Detail>
                        <Icon name="Bookmark" color="white" />
                        <DetailText>{star}</DetailText>
                    </Detail>
                </DetailsWrapper>
            </ContentWrapper>
        </Card>
    );
};

export default PromptCardImage;

/* --- styled components --- */
const Card = styled.div<{
    $image: string;
    $colored: boolean;
    $isMiniHeight: boolean;
}>`
    position: relative;
    width: 100%;
    /* 상황에 맞춰 높이, 비율 등을 조정하세요 */
    height: ${({ $isMiniHeight }) => ($isMiniHeight ? "133px" : "157px")};
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    background-image: url(${({ $image }) => $image});
    background-size: cover;
    background-position: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        /* 마우스 오버 시 살짝 올라오고 그림자 */
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

/** 카드 아래쪽에서 위로 올라오는 그라디언트(어두운 영역) */
const GradientOverlay = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    /* 카드 높이에 비례해 조정 가능. (예: 40% ~ 50% 등) */
    height: 70%;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0) 100%
    );
`;

/** 카드 안쪽에 내용(텍스트/아이콘)을 담는 컨테이너 */
const ContentWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    /* 내부 여백 */
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

/** 타이틀 영역 - 필요 시 간단한 마진 추가 */
const Title = styled.div`
    margin-top: auto;
`;

/** 하단 아이콘/숫자 표시 영역 */
const DetailsWrapper = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 8px;
`;

/** 하나의 아이콘/숫자 묶음 */
const Detail = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

/** 숫자 텍스트 */
const DetailText = styled.span`
    color: #fff;
    font-size: 14px;
`;
