"use client";

import { Flex, Modal } from "antd";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import Text from "../common/Text/Text";

interface SampleImagesProps {
    sampleImages: string[];
}

const SampleImages = ({ sampleImages }: SampleImagesProps) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageClick = (imgSrc: string) => {
        setPreviewImage(imgSrc);
    };

    const handleClosePreview = () => {
        setPreviewImage(null);
    };

    return (
        <>
            <Flex vertical gap={8} style={{ marginTop: "40px" }}>
                <Text font="c1_12_reg" color="G_400">
                    미리보기의 이미지들은 실제 포켓런 결과와 차이가 있을 수
                    있습니다.
                </Text>
                <SampleImageContainer style={{ paddingBottom: "10px" }}>
                    {sampleImages.map((imgSrc, index) => (
                        <ImageWrapper
                            key={index}
                            onClick={() => handleImageClick(imgSrc)}
                        >
                            <CustomImage
                                src={imgSrc}
                                alt={`sample${index}`}
                                width={112}
                                height={112}
                                style={{ objectFit: "cover" }}
                                sizes="(max-width: 768px) 100vw, 112px"
                            />
                        </ImageWrapper>
                    ))}
                </SampleImageContainer>
            </Flex>

            <Modal
                open={!!previewImage}
                onCancel={handleClosePreview}
                footer={null}
                centered
                width="auto"
                styles={{
                    body: {
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    },
                }}
            >
                {previewImage && (
                    <PreviewImage
                        src={previewImage}
                        alt="Image Preview"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "90vw",
                            maxHeight: "80vh",
                            objectFit: "contain",
                        }}
                    />
                )}
            </Modal>
        </>
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

const ImageWrapper = styled.div`
    cursor: pointer;
    flex: 0 0 auto;
`;

const CustomImage = styled(Image)`
    border-radius: 12px;
    width: 112px;
    height: 112px;
`;

const PreviewImage = styled(Image)`
    border-radius: 12px;
`;
