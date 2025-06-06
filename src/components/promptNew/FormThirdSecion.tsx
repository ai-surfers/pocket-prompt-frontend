"use client";

import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import Toggle from "@/components/common/Toggle/Toggle";
import {
    AIPlatforms,
    Categories,
    ImageCategories,
    ImgAIPlatforms,
} from "@/core/Prompt";
import { PromptSchemaType } from "@/schema/PromptSchema";
import { useDeviceSize } from "@components/DeviceContext";
import { Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import FormItem from "./Form/FormItem";

const CATEGORY = Object.entries(Categories).map(([key, value]) => ({
    key: key,
    label: value.ko,
    value: key,
}));

const IMAGE_CATEGORY_OPTIONS = Object.entries(ImageCategories).map(
    ([key, value]) => ({
        key,
        value: key,
        label: (
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {value.ko}
            </span>
        ),
    })
);

const AI = Object.entries(AIPlatforms).map(([key, value]) => ({
    key: key,
    value: value,
}));

const IMG_AI = Object.entries(ImgAIPlatforms).map(([key, value]) => ({
    key: key,
    value: value,
}));

interface FormSectionProps {
    onSubmit: () => void;
    isEdit: boolean;
    isImagePrompt: boolean;
}

function FormThirdSecion({
    onSubmit,
    isEdit,
    isImagePrompt,
}: FormSectionProps) {
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
                                options={isImagePrompt ? IMG_AI : AI}
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
                                options={
                                    isImagePrompt
                                        ? IMAGE_CATEGORY_OPTIONS
                                        : CATEGORY
                                }
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
                    {isEdit
                        ? "프롬프트 수정 완료하기"
                        : "프롬프트 등록 완료하기"}
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
    width: ${({ $isUnderTablet }) => ($isUnderTablet ? "100%" : "")};
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
