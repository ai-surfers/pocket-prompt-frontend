"use client";

import Button from "@/components/common/Button/Button";
import Textarea from "@/components/common/Textarea/Textarea";
import { PromptSchemaType } from "@/schema/PromptSchema";
import { useDeviceSize } from "@components/DeviceContext";
import { Flex } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import FormItem from "./Form/FormItem";

interface FormSectionProps {
    isEdit: boolean;
    goToNextTab: (templateValue?: string) => void;
}

function FormFirstSection({ isEdit, goToNextTab }: FormSectionProps) {
    const {
        control,
        // formState: { isValid },
        watch,
    } = useFormContext<PromptSchemaType>();
    const { isUnderTablet, isMobile } = useDeviceSize();
    const promptTemplateValue = watch("prompt_template") || "";
    const isValid = promptTemplateValue.length > 0;

    return (
        <Box $isUnderTablet={isUnderTablet}>
            <form>
                <Flex vertical gap={32}>
                    <FormItem
                        title="프롬프트 템플릿"
                        tags={["필수"]}
                        description=" [주제], [청중] 처럼 다른 사용자들에게 입력 받고 싶은 항목을 대괄호로 감싸주세요."
                    >
                        <Controller
                            name="prompt_template"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    defaultHeight="350px"
                                    placeholder={
                                        "예시: [주제]를 주제로 한 파워포인트의 초안을 작성해줘.\n총 10 슬라이드로 이루어져있고, 청중은 [청중]을 대상으로 고려해줘."
                                    }
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </FormItem>
                </Flex>
            </form>
            {!isUnderTablet && (
                <Button
                    id="register-prompt"
                    size={52}
                    width="100%"
                    style={{ marginTop: "40px", justifyContent: "center" }}
                    onClick={() => goToNextTab(promptTemplateValue)}
                    hierarchy={isValid ? "primary" : "disabled"}
                >
                    다음
                </Button>
            )}
        </Box>
    );
}

export default FormFirstSection;

const Box = styled.div<{ $isUnderTablet: boolean }>`
    flex: 7;
    background: #fff;
    padding-right: 20px;
    width: ${({ $isUnderTablet }) => ($isUnderTablet ? "100%" : "")};
    margin-bottom: ${({ $isUnderTablet }) => ($isUnderTablet ? "20px" : "")};
`;
