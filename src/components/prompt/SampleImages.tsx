import { Flex } from "antd";
import React from "react";
import styled from "styled-components";
import Text from "../common/Text/Text";
import Image from "next/image";

const SampleImages = ({ sampleImages }: { sampleImages: string[] }) => {
    return (
        <Flex vertical gap={8} style={{ marginTop: "40px" }}>
            <Text font="c1_12_reg" color="G_400">
                미리보기의 이미지들은 실제 포켓런 결과와 차이가 있을 수
                있습니다.
            </Text>
            <SampleImageContainer style={{ paddingBottom: "10px" }}>
                {sampleImages.map((imgSrc, index) => (
                    <CustomImage
                        src={imgSrc}
                        alt={`sample${index}`}
                        width={112}
                        height={112}
                    />
                ))}
            </SampleImageContainer>
        </Flex>
    );
};

export default SampleImages;

const SampleImageContainer = styled(Flex)`
    overflow-x: scroll;
    gap: 8px;
    box-sizing: content-box;
    padding-bottom: 15px;

    /* 전체 스크롤바 크기 조정 */
    &::-webkit-scrollbar {
        height: 4px;
        display: block !important;
    }

    /* 스크롤바 트랙 (배경) */
    &::-webkit-scrollbar-track {
        border-radius: 4px;
        background: var(--gray-200, #dee0e8);
        position: relative;
        margin-left: calc(50vw - 40px);
        margin-right: calc(50vw - 40px);
    }

    /* 스크롤바 핸들 */
    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: var(--primary-100, #7580ea);
    }
`;

const CustomImage = styled(Image)`
    border-radius: 12px;
`;
