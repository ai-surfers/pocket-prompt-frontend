// TopSection.tsx
import { PromptDetails } from "@/apis/prompt/prompt.model";
import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import { Categories } from "@/core/Prompt";
import { useUser } from "@/hooks/useUser";
import { Wrapper } from "../layout/LayoutClient";
import Icon from "@/components/common/Icon";
import BookmarkButton from "./BookmarkButton";
import EditDropdown from "./EditDropdown";
import { copyClipboard } from "@/utils/promptUtils";
import { formatDate, formatNumber } from "@/utils/textUtils";
import { Flex } from "antd";
import { ReactNode } from "react";
import styled from "styled-components";
import useToast from "@/hooks/useToast";
import { useDeviceSize } from "@components/DeviceContext";

interface TopSectionProps {
    prompt: PromptDetails;
}

export const TopSection = ({ prompt }: TopSectionProps) => {
    const { userData } = useUser();
    const showToast = useToast();
    const { isMobile } = useDeviceSize();

    const handleShare = () => {
        const url = window.location.href;
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
                <Flex justify="space-between" align="center" wrap gap={10}>
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

                <InformationContainer wrap>
                    <Flex gap={8}>
                        {prompt.categories.map((cat) => (
                            <Chip key={cat}>
                                <Text font="b2_16_semi" color="G_600">
                                    {Categories[cat].ko}
                                </Text>
                            </Chip>
                        ))}
                    </Flex>

                    <Flex gap={20} wrap>
                        <Flex gap={8} align="center">
                            <Icon name="Profile" color="G_400" size={20} />
                            <Text font="b3_14_med" color="G_400">
                                {prompt.author_nickname}
                            </Text>
                        </Flex>

                        <Flex gap={8} align="center">
                            <Icon name="Calendar2" color="G_400" size={20} />
                            <Text font="b3_14_med" color="G_400">
                                {formatDate(prompt.created_at)}
                            </Text>
                        </Flex>

                        <Flex gap={8} align="center">
                            <Icon name="Eye" color="G_400" size={20} />
                            <Text font="b3_14_med" color="G_400">
                                {formatNumber(prompt.views)}
                            </Text>
                        </Flex>

                        <Flex gap={8} align="center">
                            <Icon name="Play" color="G_400" size={20} />
                            <Text font="b3_14_med" color="G_400">
                                {formatNumber(prompt.usages)}
                            </Text>
                        </Flex>

                        <Flex gap={8} align="center">
                            <Icon name="Save2" color="G_400" size={20} />
                            <Text font="b3_14_med" color="G_400">
                                {formatNumber(prompt.star)}
                            </Text>
                        </Flex>
                    </Flex>
                </InformationContainer>
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
    gap: 32px;
`;

const Chip = styled.div`
    padding: 6px 12px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.G_100};
`;
