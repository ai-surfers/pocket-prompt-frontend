import { IcInfoCircle } from "@/assets/svg";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Text from "@/components/common/Text/Text";
import Textarea from "@/components/common/Textarea/Textarea";
import Toggle from "@/components/common/Toggle/Toggle";
import { AIPlatforms, Categories } from "@/core/Prompt";
import { Wrapper } from "@/layouts/Layout";
import FormItem from "@/pages/promptNew/components/FormItem";
import { promptSchema, PromptSchemaType } from "@/schema/PromptSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Select } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";

const CATEGORY = Object.entries(Categories).map(([key, value]) => ({
    key: key,
    value: value.ko,
}));
const AI = Object.entries(AIPlatforms).map(([key, value]) => ({
    key: key,
    value: value,
}));
export default function PromptNewPage() {
    const form = useForm<PromptSchemaType>({
        resolver: zodResolver(promptSchema),
        defaultValues: {
            visibility: "Public",
            categories: [],
        },
    });
    const {
        control,
        handleSubmit,
        watch,
        formState: { isValid },
    } = form;

    useEffect(() => {
        const subscription = watch((values) => {
            console.log(">>", values);
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const handleClickSubmit = async () => {
        console.log(">> handleClickSubmit");
        handleSubmit(
            async (values: unknown) => {
                const input = values as z.infer<typeof promptSchema>;
                console.log(">> value", input);
            },
            (errors) => {
                console.error(">> error", errors);
            }
        )();
    };

    return (
        <Container>
            <PromptNewWrapper>
                <Text font="large_32_bold" style={{ marginTop: "40px" }}>
                    나만의 프롬프트 등록하기
                </Text>

                <Text font="h2_20_reg" color="G_400">
                    실시간으로 미리보기 화면을 보면서 등록하는 나만의 프롬프트
                </Text>

                <Flex
                    justify="space-between"
                    align="stretch"
                    gap={16}
                    wrap="wrap"
                    style={{ marginTop: "32px" }}
                >
                    <Box flex="3">
                        <Text font="h2_20_bold">내 프롬프트 미리보기</Text>

                        <Flex vertical gap={30} style={{ marginTop: "24px" }}>
                            <Flex vertical gap={6}>
                                <ExampleBox font="b3_14_reg" color="G_300">
                                    프롬프트 제목이 이곳에 표시됩니다.
                                </ExampleBox>
                                <ExampleBox font="b3_14_reg" color="G_300">
                                    프롬프트 설명이 이곳에 표시됩니다.
                                </ExampleBox>
                            </Flex>

                            <ExampleBox
                                height="532px"
                                font="b3_14_reg"
                                color="G_300"
                            >
                                프롬프트 내용에 따른 미리보기가 이곳에
                                표시됩니다.
                            </ExampleBox>
                        </Flex>
                    </Box>
                    <Box flex="7" border="primary_50">
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

                        <form onSubmit={handleClickSubmit}>
                            <Flex
                                vertical
                                gap={32}
                                style={{ marginTop: "9px" }}
                            >
                                <FormItem title="프롬프트 제목" tags={["필수"]}>
                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                placeholder="프롬프트의 제목을 입력해주세요."
                                                value={field.value}
                                                onChange={field.onChange}
                                                count={10}
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
                                                count={300}
                                            />
                                        )}
                                    />
                                </FormItem>

                                <FormItem
                                    title="프롬프트 템플릿"
                                    tags={["필수"]}
                                    description=" [주제], [청중] 처럼 다른 사용자들에게 입력 받고 싶은 항목을 대괄호로 감싸주세요."
                                >
                                    <Flex gap={4} justify="end">
                                        <Text
                                            font="b3_14_reg"
                                            color="primary_100"
                                        >
                                            어떻게 작성해야 할지 모르겠다면?
                                        </Text>
                                        <IcInfoCircle width={20} />
                                    </Flex>

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
                                                    options={CATEGORY}
                                                    mode="multiple"
                                                    maxCount={5}
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
                            onClick={handleClickSubmit}
                            hierarchy={isValid ? "primary" : "disabled"}
                        >
                            프롬프트 등록 완료하기
                        </Button>
                    </Box>
                </Flex>
            </PromptNewWrapper>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    background: linear-gradient(180deg, #fff 0%, #f8f9fa 11.48%, #f7f8f9 100%);
`;

const PromptNewWrapper = styled(Wrapper)`
    min-width: 1080px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 40px;
`;

const Box = styled.div<{ flex: string; border?: string }>`
    flex: ${({ flex }) => flex};

    border-radius: 16px;
    border: 1.5px solid
        ${({ border, theme }) =>
            border ? theme.colors[border] : theme.colors.G_100};
    background: #fff;
    padding: 20px;
`;

const ExampleBox = styled(Text)<{ height?: string }>`
    width: 100%;
    min-height: ${({ height }) => (height ? height : 0)};
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.G_50};
    padding: 11px 12px;

    ${({ theme }) => theme.fonts.b3_14_reg};
    color: ${({ theme }) => theme.colors.G_300};
`;
