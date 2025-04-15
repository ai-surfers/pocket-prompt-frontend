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

    const thumbnail =
        sampleMedia && sampleMedia.length > 0 ? sampleMedia[0] : "";

    return (
        <Card
            $image={thumbnail}
            $colored={colored}
            onClick={handleClick}
            $isMiniHeight={isMiniHeight}
        >
            <GradientOverlay />

            <ContentWrapper>
                <Title>
                    <Text font="b1_18_bold" color="white">
                        {title}
                    </Text>
                </Title>

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
    height: ${({ $isMiniHeight }) => ($isMiniHeight ? "133px" : "157px")};
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    background-image: url(${({ $image }) => $image});
    background-size: cover;
    background-position: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

const GradientOverlay = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 70%;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0) 100%
    );
`;

const ContentWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const Title = styled.div`
    margin-top: auto;
`;

const DetailsWrapper = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 8px;
`;

const Detail = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

const DetailText = styled.span`
    color: #fff;
    font-size: 14px;
`;
