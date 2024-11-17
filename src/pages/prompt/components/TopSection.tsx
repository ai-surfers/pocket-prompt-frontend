// TopSection.tsx
import { PromptDetails } from "@/apis/prompt/prompt.model";
import BookMark from "@/assets/svg/home/BookMark";
import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import { Wrapper } from "@/layouts/Layout";
import Icon from "@/pages/home/components/common/Icon";
import BookmarkButton from "@/pages/prompt/components/BookmarkButton";
import { formatDate, formatNumber } from "@/utils/textUtils";
import { Flex } from "antd";
import { ReactNode } from "react";
import styled from "styled-components";

interface TopSectionProps {
    prompt: PromptDetails;
}
export const TopSection = ({ prompt }: TopSectionProps) => {
    return (
        <TopContainer>
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
                            size={44}
                            hierarchy="secondary"
                            suffix={
                                (<Icon name="Send" size={20} />) as ReactNode
                            }
                            style={{ padding: "12px" }}
                        />
                        <BookmarkButton
                            is_starred={prompt.is_starred_by_user}
                        />
                        <Button
                            size={44}
                            hierarchy="normal"
                            suffix={<Icon name="Edit2" />}
                            style={{ padding: "12px" }}
                        >
                            프롬프트 편집
                        </Button>
                    </Flex>
                </Flex>

                <InformationContainer wrap>
                    <Flex gap={8}>
                        {prompt.categories.map((cat) => (
                            <Chip key={cat}>
                                <Text font="b2_16_semi" color="G_600">
                                    {cat}
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

const TopContainer = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 40px 80px 32px;
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
