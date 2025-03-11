import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import Toggle from "@/components/common/Toggle/Toggle";
import { AIPlatforms, Categories } from "@/core/Prompt";
import { PromptSchemaType } from "@/schema/PromptSchema";
import { Flex, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import FormItem from "./Form/FormItem";

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
    const {
        control,
        // formState: { isValid },
        watch,
    } = useFormContext<PromptSchemaType>();

    const promptTemplateValue = watch("prompt_template") || "";
    const isValid = promptTemplateValue.length > 0;

    return (
        <Box>
            <form onSubmit={onSubmit}>
                <Flex vertical gap={32} style={{ marginTop: "9px" }}>
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
                        <Text
                            font="b1_18_semi"
                            style={{ marginBottom: "10px" }}
                        >
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
                </Flex>
            </form>

            <Button
                id="register-prompt"
                size={52}
                width="100%"
                style={{ marginTop: "60px", justifyContent: "center" }}
                onClick={onSubmit}
                hierarchy={isValid ? "primary" : "disabled"}
            >
                {isEdit ? "프롬프트 수정 완료하기" : "프롬프트 등록 완료하기"}
            </Button>
        </Box>
    );
}

export default FormThirdSecion;

const Box = styled.div`
    flex: 7;
    border-radius: 16px;
    /* border: 1.5px solid ${({ theme }) => theme.colors.primary_50}; */
    background: #fff;
    padding-right: 20px;
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
