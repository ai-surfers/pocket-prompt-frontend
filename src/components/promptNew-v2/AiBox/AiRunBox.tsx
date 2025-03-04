import Text from "@/components/common/Text/Text";
import { Flex } from "antd";
import styled, { keyframes } from "styled-components";
import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import CheckDefaultIcon from "@public/svg/prompt-new/check-default";
import CheckActiveIcon from "@public/svg/prompt-new/check-active";
import { useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useGetAiSuggestions } from "@/hooks/mutations/prompts/useGetAiSuggestions";

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
    } = useGetAiSuggestions(promptTemplate);

    const handleRetry = () => {
        refetchSuggestionData();
        setAnimationKey((prev) => prev + 1);
    };

    const handleCheck = () => {
        setChecked((prev) => !prev);
        if (!checked && suggestionData) {
            onSelect(suggestionData.title || suggestionData.description);
        }
    };

    useEffect(() => {
        setAnimationKey((prev) => prev + 1);
    }, [suggestionData]);

    let displayContent;
    if (isLoading) {
        displayContent = "생성 중입니다..";
    } else if (isError) {
        displayContent = "생성하지 못했습니다. 다시 시도해주세요.";
    } else {
        displayContent = suggestionData?.title || suggestionData?.description;
    }

    return (
        <Flex vertical gap={16} style={{ height: "100%" }}>
            <EmptyBox>
                <Flex
                    justify="space-between"
                    style={{ height: "100%", marginBottom: "15px" }}
                >
                    <Text font="b2_16_semi">자동 생성된 {title}</Text>
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
                >
                    <Text font="b2_16_reg" color="G_500">
                        {displayContent}
                    </Text>
                    <CheckIconWrapper>
                        {checked ? <CheckActiveIcon /> : <CheckDefaultIcon />}
                    </CheckIconWrapper>
                </TextBoxWrapper>
            </EmptyBox>
        </Flex>
    );
};

const EmptyBox = styled.div`
    border-radius: 8px;
    background: var(--gray-50, #f7f8f9);
    width: 100%;
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

const TextBoxWrapper = styled(Flex)`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    padding: 10px;
    animation: ${fadeSlide} 300ms ease-in-out;
`;

const CheckIconWrapper = styled.div`
    cursor: pointer;
`;
