import Icon from "@/components/common/Icon";
import Text from "@/components/common/Text/Text";
import CheckActiveIcon from "@public/svg/prompt-new/check-active";
import CheckDefaultIcon from "@public/svg/prompt-new/check-default";
import { Flex } from "antd";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

import { useGetAiSuggestions } from "@/hooks/mutations/prompts/useGetAiSuggestions";
import AIGenerateIcon from "@public/svg/prompt-new/ai-generate";

interface AiRunBoxProps {
    title: string;
    promptTemplate: string;
    onSelect: (selectedText: string) => void;
}

export const AiRunBox = ({
    title,
    promptTemplate,
    onSelect,
}: AiRunBoxProps) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [animationKey, setAnimationKey] = useState<number>(0);

    const {
        data: suggestionData,
        isLoading,
        isError,
        error,
        refetch: refetchSuggestionData,
    } = useGetAiSuggestions(
        promptTemplate,
        title as "제목" | "설명",
        animationKey
    );

    const handleRetry = () => {
        setAnimationKey((prev) => prev + 1);
        setChecked(false); // 체크 상태 초기화
        refetchSuggestionData();
    };

    const handleCheck = () => {
        setChecked((prev) => !prev);
        if (!checked && suggestionData) {
            if (title === "제목") {
                onSelect(suggestionData.title);
            } else {
                onSelect(suggestionData.description);
            }
        }
    };

    // useEffect(() => {
    //     setAnimationKey((prev) => prev + 1);
    // }, [suggestionData]);

    let displayContent;
    if (isLoading) {
        displayContent = "생성 중입니다..";
    } else if (isError) {
        displayContent = "생성하지 못했습니다. 다시 시도해주세요.";
    } else {
        displayContent =
            title === "제목"
                ? suggestionData?.title
                : suggestionData?.description;
    }

    return (
        <Flex vertical gap={16} style={{ width: "100%", height: "100%" }}>
            <EmptyBox>
                <Flex
                    justify="space-between"
                    align="center"
                    style={{ height: "100%", marginBottom: "15px" }}
                >
                    <Flex gap="10px">
                        <AIGenerateIcon />
                        <Text font="b2_16_semi">자동 생성된 {title}</Text>
                    </Flex>
                    <RetryWrapper gap={8} onClick={handleRetry}>
                        <Text font="b3_14_reg" color="G_400">
                            다시 생성하기
                        </Text>
                        <Icon name="Refresh" size={16} color="G_400" />
                    </RetryWrapper>
                </Flex>

                <TextBoxWrapper
                    key={animationKey}
                    justify="space-between"
                    onClick={handleCheck}
                    $checked={checked}
                >
                    <WrappedText font="b2_16_reg" color="G_500">
                        {displayContent}
                    </WrappedText>
                    <CheckIconWrapper>
                        {checked ? <CheckActiveIcon /> : <CheckDefaultIcon />}
                    </CheckIconWrapper>
                </TextBoxWrapper>
            </EmptyBox>
        </Flex>
    );
};

const EmptyBox = styled.div`
    box-sizing: border-box;
    border-radius: 8px;
    background: var(--gray-50, #f7f8f9);
    /* width: 100%; */
    height: 100%;
    padding: 20px;
`;

const RetryWrapper = styled(Flex)`
    ${({ theme }) => theme.mixins.flexBox()};
    cursor: pointer;
`;

const fadeSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TextBoxWrapper = styled(Flex)<{ $checked?: boolean }>`
    box-sizing: border-box;
    background-color: ${({ theme, $checked }) =>
        $checked ? theme.colors.primary_10 : theme.colors.white};
    border-radius: 8px;
    padding: 10px !important;
    animation: ${fadeSlide} 300ms ease-in-out;
    border: 1px solid
        ${({ theme, $checked }) =>
            $checked ? theme.colors.primary_60 : "transparent"};
    transition: border-color 300ms ease-in-out,
        background-color 300ms ease-in-out;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary_60};
    }
`;

const CheckIconWrapper = styled.div`
    cursor: pointer;
`;

const WrappedText = styled(Text)`
    white-space: pre-wrap;
    word-break: break-word;
    min-width: 0;
    flex: 1;
`;
