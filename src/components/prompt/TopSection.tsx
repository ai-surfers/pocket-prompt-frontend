"use client";

// TopSection.tsx

import { PromptDetails } from "@/apis/prompt/prompt.model";
import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import Text from "@/components/common/Text/Text";
import { Categories, Category, ImageCategories } from "@/core/Prompt";
import useToast from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { copyClipboard, getShareUrl } from "@/utils/promptUtils";
import { formatDate, formatNumber } from "@/utils/textUtils";
import { useDeviceSize } from "@components/DeviceContext";
import { Flex } from "antd";
import { ReactNode } from "react";
import styled from "styled-components";
import { Wrapper } from "../layout/LayoutClient";
import BookmarkButton from "./BookmarkButton";
import EditDropdown from "./EditDropdown";
import SampleImages from "./SampleImages";

interface TopSectionProps {
    prompt: PromptDetails;
}

export const TopSection = ({ prompt }: TopSectionProps) => {
    const { userData } = useUser();
    const showToast = useToast();
    const { isMobile } = useDeviceSize();

    const handleShare = () => {
        const baseUrl = getShareUrl(window.location.href);
        const url = `${baseUrl}?utm_source=prompt_share_btn&utm_medium=share&utm_campaign=prompt_share&utm_term=${prompt.id}`;
        copyClipboard(url)
            .then(() => {
                showToast({
                    title: "현재 주소가 복사되었어요.",
                    subTitle: "",
                    iconName: "TickCircle",
                });
            })
            .catch((err) => {
                console.error("클립보드 복사 실패:", err);
                alert("클립보드 복사에 실패하였습니다.");
            });
    };

    return (
        <TopContainer $isMobile={isMobile}>
            <Wrapper>
                <Flex
                    justify="space-between"
                    align="center"
                    wrap
                    gap={10}
                    style={{ marginBottom: "12px" }}
                >
                    <Flex vertical>
                        <Text font="h1_24_semi">{prompt.title}</Text>
                        <Text font="b1_18_reg" color="G_400">
                            {prompt.description}
                        </Text>
                    </Flex>

                    <Flex gap={12}>
                        <Button
                            id="share-toggle"
                            size={44}
                            hierarchy="secondary"
                            suffix={
                                (<Icon name="Send" size={20} />) as ReactNode
                            }
                            style={{ padding: "12px" }}
                            onClick={handleShare}
                        />
                        <BookmarkButton
                            promptId={prompt.id}
                            is_starred={prompt.is_starred_by_user}
                        />

                        {prompt.author_nickname === userData.user?.nickname && (
                            <EditDropdown prompt={prompt} />
                        )}
                    </Flex>
                </Flex>

                <InformationContainer
                    wrap
                    style={{ padding: "12px 16px 12px 12px" }}
                >
                    <Flex gap={8}>
                        {(prompt.categories ?? []).map((cat) => {
                            const categoryMap: Category =
                                prompt.type === "image"
                                    ? ImageCategories
                                    : Categories;

                            const categoryInfo = categoryMap[cat];

                            if (!categoryInfo) return null; // 잘못된 키일 경우 무시

                            return (
                                <Chip key={cat}>
                                    <Text font="b3_14_med" color="white">
                                        {categoryInfo.ko}
                                    </Text>
                                </Chip>
                            );
                        })}
                    </Flex>

                    <Flex gap={20} wrap>
                        <Flex gap={4} align="center">
                            <Icon name="Profile" color="G_400" size={16} />
                            <Text font="b3_14_reg" color="G_400">
                                {prompt.author_nickname}
                            </Text>
                        </Flex>

                        <Flex gap={4} align="center">
                            <Icon name="Calendar2" color="G_400" size={16} />
                            <Text font="b3_14_reg" color="G_400">
                                {formatDate(prompt.created_at)}
                            </Text>
                        </Flex>

                        <Flex gap={4} align="center">
                            <Icon name="Eye" color="G_400" size={16} />
                            <Text font="b3_14_reg" color="G_400">
                                {formatNumber(prompt.views)}
                            </Text>
                        </Flex>

                        <Flex gap={4} align="center">
                            <Icon name="Play" color="G_400" size={16} />
                            <Text font="b3_14_reg" color="G_400">
                                {formatNumber(prompt.usages)}
                            </Text>
                        </Flex>

                        <Flex gap={4} align="center">
                            <Icon name="Save2" color="G_400" size={16} />
                            <Text font="b3_14_reg" color="G_400">
                                {formatNumber(prompt.star)}
                            </Text>
                        </Flex>
                    </Flex>
                </InformationContainer>
                {prompt.sample_media?.length > 0 && (
                    <SampleImages sampleImages={prompt.sample_media} />
                )}
            </Wrapper>
        </TopContainer>
    );
};

const TopContainer = styled.div<{ $isMobile: boolean }>`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    padding: ${({ $isMobile }) =>
        $isMobile ? "40px 20px 32px 20px" : "40px 80px 32px"};
`;

const InformationContainer = styled(Flex)`
    margin-top: 32px;
    gap: 20px;
    background-color: ${({ theme }) => theme.colors.G_50};
    border-radius: 12px;
`;

const Chip = styled.div`
    padding: 6px 12px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.G_600};
`;
