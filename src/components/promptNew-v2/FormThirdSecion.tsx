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
import useDeviceSize from "@/hooks/useDeviceSize";

const CATEGORY = Object.entries(Categories).map(([key, value]) => ({
    key: key,
    label: value.ko,
    value: key,
}));

const AI = Object.entries(AIPlatforms).map(([key, value]) => ({
    key: key,
    value: value,
}));

interface FormSectionProps {
    onSubmit: () => void;
    isEdit: boolean;
}

function FormThirdSecion({ onSubmit, isEdit }: FormSectionProps) {
    const { control, watch } = useFormContext<PromptSchemaType>();
    const { isUnderTablet } = useDeviceSize();
    const promptTemplateValue = watch("prompt_template") || "";
    const isValid = promptTemplateValue.length > 0;

    return (
        <Box $isUnderTablet={isUnderTablet}>
            <FormWrapper onSubmit={onSubmit}>
                <FormItem
                    title="사용한 AI"
                    tags={["필수", "복수 선택 가능"]}
                    style={{ flex: 1 }}
                >
                    <Controller
                        name="ai_platforms_used"
                        control={control}
                        render={({ field }) => (
                            <Select
                                placeholder="사용한 AI를 선택해주세요."
                                style={{
                                    width: "100%",
                                    marginTop: "8px",
                                }}
                                mode="multiple"
                                options={AI}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    title="분야"
                    tags={["필수", " 최대 5개 선택 가능"]}
                    style={{ flex: 1 }}
                >
                    <Controller
                        name="categories"
                        control={control}
                        render={({ field }) => (
                            <Select
                                placeholder="프롬프트의 분야를 선택해주세요."
                                style={{
                                    width: "100%",
                                    marginTop: "8px",
                                }}
                                mode="multiple"
                                maxCount={5}
                                options={CATEGORY}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </FormItem>

                <ControllerWrapper>
                    <Text font="b1_18_semi" style={{ marginBottom: "10px" }}>
                        공개범위
                    </Text>
                    <Controller
                        name="visibility"
                        control={control}
                        render={({ field }) => (
                            <div style={{ width: "300px" }}>
                                <Toggle
                                    items={["Public", "Private"]}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </div>
                        )}
                    />
                </ControllerWrapper>
            </FormWrapper>
            {!isUnderTablet && (
                <Button
                    id="register-prompt"
                    size={52}
                    width="100%"
                    style={{ marginTop: "60px", justifyContent: "center" }}
                    onClick={onSubmit}
                    hierarchy={isValid ? "primary" : "disabled"}
                >
                    프롬프트 등록 완료하기
                </Button>
            )}
        </Box>
    );
}

export default FormThirdSecion;

const Box = styled.div<{ $isUnderTablet: boolean }>`
    flex: 7;
    border-radius: 16px;
    background: #fff;
    padding-right: ${({ $isUnderTablet }) => ($isUnderTablet ? "10%" : "20px")};
`;

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
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

const ControllerWrapper = styled.div``;
