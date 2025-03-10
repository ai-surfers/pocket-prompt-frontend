import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Text from "@/components/common/Text/Text";
import Textarea from "@/components/common/Textarea/Textarea";
import Toggle from "@/components/common/Toggle/Toggle";
import { AIPlatforms, Categories } from "@/core/Prompt";
import FormItem from "./Form/FormItem";
import { PromptSchemaType } from "@/schema/PromptSchema";
import { Flex, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import Icon from "../common/Icon";
import TextArea from "antd/es/input/TextArea";
import { AiRunBox } from "./AiBox/AiRunBox";
import { useGetAiSuggestions } from "@/hooks/mutations/prompts/useGetAiSuggestions";
import { useEffect, useState } from "react";
import useDeviceSize from "@/hooks/useDeviceSize";

interface FormSectionProps {
    isEdit: boolean;
    promptTemplate: string;
    setSelectedTitle: (selectedText: string) => void;
    setSelectedDescription: (selectedText: string) => void;
    goToNextTab: () => void;
}

function FormSecSection({
    isEdit,
    goToNextTab,
    setSelectedTitle,
    setSelectedDescription,
}: FormSectionProps) {
    const {
        control,
        setValue,
        // formState: { isValid },
        watch,
    } = useFormContext<PromptSchemaType>();
    const { isUnderTablet, isMobile } = useDeviceSize();
    const promptTemplateValue = watch("prompt_template") || "";

    const isValid = promptTemplateValue.length > 0;

    const handleSelectTitle = (selectedText: string) => {
        setSelectedTitle(selectedText);
        setValue("title", selectedText);
    };

    const handleSelectDescription = (selectedText: string) => {
        setSelectedDescription(selectedText);
        setValue("description", selectedText);
    };

    return (
        <Box $isUnderTablet={isUnderTablet}>
            <form>
                <FormContainer>
                    {/* <Flex vertical gap={32} style={{ marginTop: "9px" }}> */}

                    <FormItem title="프롬프트 제목" tags={["필수"]}>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    placeholder="프롬프트의 제목을 입력해주세요."
                                    value={field.value}
                                    onChange={field.onChange}
                                    count={50}
                                />
                            )}
                        />
                    </FormItem>

                    <AiRunBox
                        title="제목"
                        promptTemplate={promptTemplateValue}
                        onSelect={handleSelectTitle}
                    />

                    <FormItem
                        title="프롬프트 설명"
                        tags={["필수"]}
                        description=" 다른 사람들이 프롬프트를 더 쉽게 이해할 수 있도록 설명을 입력해주세요!"
                    >
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    placeholder="예시: 주제와 청중을 입력하면 근사한 파워포인트 초안을 만들어주는 프롬프트"
                                    value={field.value}
                                    onChange={field.onChange}
                                    count={200}
                                />
                            )}
                        />
                    </FormItem>

                    <AiRunBox
                        title="설명"
                        promptTemplate={promptTemplateValue}
                        onSelect={handleSelectDescription}
                    />

                    {/* </Flex> */}
                </FormContainer>
            </form>

            {!isUnderTablet && (
                <Button
                    id="register-prompt"
                    size={52}
                    width="100%"
                    style={{ marginTop: "40px", justifyContent: "center" }}
                    onClick={goToNextTab}
                    hierarchy={isValid ? "primary" : "disabled"}
                >
                    다음
                </Button>
            )}
        </Box>
    );
}

export default FormSecSection;

const Box = styled.div<{ $isUnderTablet: boolean }>`
    flex: 7;
    border-radius: 16px;
    /* border: 1.5px solid ${({ theme }) => theme.colors.primary_50}; */
    background: #fff;
`;

const FormContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "")};
    gap: 20px;
`;

const HelpBox = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    gap: 4px;
    justify-self: flex-end;

    cursor: pointer;
    transition: opacity 0.2s;
    &:hover {
        opacity: 0.6;
    }
`;
