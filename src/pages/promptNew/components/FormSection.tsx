import { IcInfoCircle } from "@/assets/svg";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Text from "@/components/common/Text/Text";
import Textarea from "@/components/common/Textarea/Textarea";
import Toggle from "@/components/common/Toggle/Toggle";
import { AIPlatforms, Categories } from "@/core/Prompt";
import FormItem from "@/pages/promptNew/components/Form/FormItem";
import { PromptSchemaType } from "@/schema/PromptSchema";
import { Flex, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";

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
    onSumbit: () => void;
}
function FormSection({ onSumbit }: FormSectionProps) {
    const {
        control,
        formState: { isValid },
    } = useFormContext<PromptSchemaType>();

    function goToGuide() {
        const url =
            "https://pocket-prompt.notion.site/da477857a0cc44888b06dd23cf6682ff";
        window.open(url, "_blank");
    }

    return (
        <Box>
            <Flex justify="space-between" align="center">
                <Text font="h2_20_bold">내 프롬프트 입력하기</Text>

                <Controller
                    name="visibility"
                    control={control}
                    render={({ field }) => (
                        <Toggle
                            items={["Public", "Private"]}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </Flex>

            <form onSubmit={onSumbit}>
                <Flex vertical gap={32} style={{ marginTop: "9px" }}>
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

                    <FormItem
                        title="프롬프트 템플릿"
                        tags={["필수"]}
                        description=" [주제], [청중] 처럼 다른 사용자들에게 입력 받고 싶은 항목을 대괄호로 감싸주세요."
                    >
                        <HelpBox>
                            <Text
                                font="b3_14_reg"
                                color="primary_100"
                                onClick={goToGuide}
                            >
                                어떻게 작성해야 할지 모르겠다면?
                            </Text>
                            <IcInfoCircle width={20} />
                        </HelpBox>

                        <Controller
                            name="prompt_template"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    placeholder="예시: [주제]를 주제로 한 파워포인트의 초안을 작성해줘.
총 10 슬라이드로 이루어져있고, 청중은 [청중]을 대상으로 고려해줘."
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </FormItem>

                    <Flex style={{ width: "100%" }} gap={16}>
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
                    </Flex>
                </Flex>
            </form>

            <Button
                size={52}
                width="100%"
                style={{ marginTop: "60px" }}
                onClick={onSumbit}
                hierarchy={isValid ? "primary" : "disabled"}
            >
                프롬프트 등록 완료하기
            </Button>
        </Box>
    );
}

export default FormSection;

const Box = styled.div`
    flex: 7;

    border-radius: 16px;
    border: 1.5px solid ${({ theme }) => theme.colors.primary_50};
    background: #fff;
    padding: 20px;
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
