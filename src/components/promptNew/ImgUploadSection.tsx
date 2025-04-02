"use client";

import Text from "@/components/common/Text/Text";
import useToast from "@/hooks/useToast";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeviceSize } from "@components/DeviceContext";
import ImgUploadIcon from "@public/svg/prompt-new/img-upload";
import { Flex, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import styled from "styled-components";

interface ImgUploadSectionProps {
    maxCount?: number;
    fileList: UploadFile[];
    onFileListChange?: (files: UploadFile[]) => void;
}

const ImgUploadSection = ({
    maxCount = 8,
    fileList,
    onFileListChange,
}: ImgUploadSectionProps) => {
    const { isUnderTablet } = useDeviceSize();
    const showToast = useToast();

    const handleChange = ({ fileList: newFiles }: any) => {
        const combinedList = [...fileList, ...newFiles];

        // 중복 제거 (같은 uid 기준)
        const deduplicatedList = Array.from(
            new Map(combinedList.map((file) => [file.uid, file])).values()
        );

        // 유효한 파일만 (originFileObj가 있는) 필터링
        const validFiles = deduplicatedList.filter((f) => f.originFileObj);

        if (validFiles.length > maxCount) {
            showToast({
                title: `이미지는 최대 ${maxCount}개까지만 업로드할 수 있어요!`,
                subTitle: "업로드한 이미지를 삭제 후 다시 시도해주세요.",
                iconName: "TickCircle",
            });
            return;
        }

        // 유효한 파일만 부모로 전달
        onFileListChange?.(validFiles);
    };

    const handleRemove = (file: UploadFile) => {
        const newList = fileList.filter((f) => f.uid !== file.uid);
        onFileListChange?.(newList);
    };

    return (
        <Box $isUnderTablet={isUnderTablet}>
            <Flex justify="space-between">
                <Text font="b2_16_bold">썸네일, 참고 이미지</Text>
                <Text font="c1_12_reg" color="G_600">
                    최소 1개, 최대 {maxCount}개
                </Text>
            </Flex>

            <UploadWrapper>
                {fileList.length < maxCount && (
                    <Upload.Dragger
                        multiple
                        listType="text"
                        showUploadList={false}
                        beforeUpload={(file) => {
                            const totalCount = fileList.length + 1;

                            if (totalCount > maxCount) {
                                showToast({
                                    title: `이미지는 최대 ${maxCount}개까지만 업로드할 수 있어요!`,
                                    subTitle:
                                        "업로드한 이미지를 삭제 후 다시 시도해주세요.",
                                    iconName: "TickCircle",
                                });
                                return Upload.LIST_IGNORE; // 업로드 무시
                            }

                            const uploadFile: UploadFile = {
                                uid: `${Date.now()}-${Math.random()}`,
                                name: file.name,
                                status: "uploading",
                                originFileObj: file,
                            };

                            onFileListChange?.([...fileList, uploadFile]);

                            return false; // 기본 업로드 막기
                        }}
                        accept="image/jpeg,image/png,image/webp"
                        fileList={fileList}
                        // onChange={handleChange}
                        style={{
                            background: "#f2f3fd",
                            border: "1.5px dashed #d6d9f9",
                            marginTop: "16px",
                        }}
                    >
                        <UploadContent>
                            <ImgUploadIcon />
                            <Text
                                font="c1_12_reg"
                                color="G_500"
                                style={{ textAlign: "center" }}
                            >
                                JPEG, PNG, WEBP
                                <br />
                                이미지를 추가하시려면 클릭하거나 파일을
                                드래그해주세요.
                            </Text>
                        </UploadContent>
                    </Upload.Dragger>
                )}

                <ThumbList>
                    {fileList.map((file) => (
                        <ThumbCard key={file.uid}>
                            <img
                                src={
                                    file.thumbUrl ||
                                    (file.originFileObj
                                        ? URL.createObjectURL(
                                              file.originFileObj
                                          )
                                        : "")
                                }
                                alt="thumb"
                            />
                            <DeleteBtn onClick={() => handleRemove(file)}>
                                <DeleteOutlined />
                            </DeleteBtn>
                        </ThumbCard>
                    ))}
                </ThumbList>
            </UploadWrapper>
        </Box>
    );
};

export default ImgUploadSection;

const Box = styled.div<{ $isUnderTablet: boolean }>`
    border-radius: 16px;
    border: 1.5px solid ${({ theme }) => theme.colors.G_100};
    background: #fff;
    padding: 20px;
    width: ${({ $isUnderTablet }) => ($isUnderTablet ? "100%" : "30%")};
    height: fit-content;
`;

const UploadWrapper = styled.div`
    width: 100%;
`;

const UploadContent = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
    gap: 8px;
    min-height: 100px;
    border-radius: 8px;
`;

const ThumbList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
    margin-top: 16px;
`;

const ThumbCard = styled.div`
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #eee;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
    }
`;

const DeleteBtn = styled.button`
    position: absolute;
    top: 6px;
    right: 6px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
