// src/components/home/prompt/cards/PromptCardImage.tsx

"use client";

import Text from "@/components/common/Text/Text";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

interface PromptCardImageProps {
    id: string;
    title: string;
    author: string;
    sampleMedia?: string;
    views: number;
    star: number;
    usages: number;
}

const PromptCardImage = ({
    id,
    title,
    author,
    sampleMedia,
    views,
    star,
    usages,
}: PromptCardImageProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/image/${id}`);
    };

    return (
        <CardWrapper onClick={handleClick}>
            <ImageWrapper>
                <Image
                    src={sampleMedia || "/img/default-sample-image.jpg"}
                    alt={title}
                    fill
                    style={{ objectFit: "cover", borderRadius: "12px" }}
                />
            </ImageWrapper>
            <TextWrapper>
                <Text font="b1_16_bold" color="G_900">
                    {title}
                </Text>
                <Text font="c1_12_reg" color="G_500">
                    by {author}
                </Text>
            </TextWrapper>
        </CardWrapper>
    );
};

export default PromptCardImage;

const CardWrapper = styled.div`
    width: 100%;
    max-width: 360px;
    height: 320px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 240px;
    border-radius: 12px;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.G_100};
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;
