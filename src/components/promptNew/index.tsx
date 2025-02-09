"use client";

import Text from "@/components/common/Text/Text";
import { InputType } from "@/core/Prompt";
import {
    CreatePromptRequest,
    InputFormat,
    usePostPrompt,
} from "@/hooks/mutations/prompts/usePostPrompt";
import { usePutPrompt } from "@/hooks/mutations/prompts/usePutPrompt";
import usePromptQuery from "@/hooks/queries/prompts/usePromptQuery";
import useToast from "@/hooks/useToast";
import { Wrapper } from "@/components/layout/LayoutClient";
import FormSection from "@/components/promptNew/FormSection";
import PreviewSection from "@/components/promptNew/PreviewSection";
import {
    defaultPromptSchema,
    promptSchema,
    PromptSchemaType,
} from "@schema/PromptSchema";
import { extractOptions } from "@/utils/promptUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex } from "antd";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";
import { useRouter } from "next/navigation";

interface PromptNewPageProps {
    isEdit: boolean;
    promptId?: string;
}

export default function NewPromptClient({
    isEdit,
    promptId,
}: PromptNewPageProps) {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    // 수정 모드일 때 uri id 값으로 프롬프트 상세 조회
    const { data } =
        isEdit && promptId ? usePromptQuery(promptId) : { data: null };

    const showToast = useToast();

    const mode = !isEdit ? "등록" : "수정";

    const form = useForm<PromptSchemaType>({
        resolver: zodResolver(promptSchema),
        defaultValues: defaultPromptSchema,
    });

    const { mutate: createPromptMutate } = usePostPrompt({
        onSuccess(res) {
            console.log("Success", res);
            showToast({
                title: "프롬프트 등록이 완료되었어요.",
                subTitle: "",
                iconName: "TickCircle",
            });

            router.replace(`/prompt/${res.data.prompt_id}`);
        },
        onError(e) {
            console.error("Failed", e);
            alert("프롬프트 등록에 실패하였습니다.");
        },
    });

    const { mutate: updatePromptMutate } = usePutPrompt({
        onSuccess(res) {
            console.log("Success", res);
            showToast({
                title: "프롬프트 수정이 완료되었어요.",
                subTitle: "",
                iconName: "TickCircle",
            });
            router.replace(`/prompt/${res.data.prompt_id}`);
        },
        onError(e) {
            console.error("Failed", e);
            alert("프롬프트 수정에 실패하였습니다.");
        },
    });

    const handleClickSubmit = async () => {
        console.log(">> handleClickSubmit");
        form.handleSubmit(
            async (values: unknown) => {
                const input = values as z.infer<typeof promptSchema>;

                const user_inputs = extractOptions(input.prompt_template);
                const user_input_formats = user_inputs.map<InputFormat>(
                    (ip) => ({
                        name: ip,
                        type: InputType.TEXT,
                        placeholder: "",
                    })
                );

                const promptData: CreatePromptRequest = {
                    ...input,
                    visibility: input.visibility.toLowerCase(),
                    user_input_format: user_input_formats,
                };

                console.log(">> promptData", promptData);

                if (isEdit && promptId) {
                    // 수정 모드일 때 updatePrompt 호출
                    updatePromptMutate({ prompt: promptData, id: promptId });
                } else {
                    // 생성 모드일 때 createPrompt 호출
                    createPromptMutate(promptData);
                }
                form.reset(defaultPromptSchema);
            },
            (errors) => {
                console.error(">> error", errors);
            }
        )();
    };

    // 수정 모드일 때 form reset
    useEffect(() => {
        if (isEdit && data) {
            const formattedData = {
                ...data,
                visibility:
                    data.visibility === "public"
                        ? "Public"
                        : data.visibility === "private"
                        ? "Private"
                        : data.visibility,
            };
            form.reset(formattedData);
        }
    }, [isEdit, data, form]);

    useEffect(() => {
        setIsClient(true); // 클라이언트에서만 렌더링 허용
    }, []);

    if (!isClient) {
        // 서버와 클라이언트 렌더링 불일치 방지
        return null;
    }

    return (
        <FormProvider {...form}>
            <Container>
                <PromptNewWrapper>
                    <Text font="large_32_bold" style={{ marginTop: "40px" }}>
                        나만의 프롬프트 {mode}하기
                    </Text>

                    <Text font="h2_20_reg" color="G_400">
                        실시간으로 미리보기 화면을 보면서 {mode}하는 나만의
                        프롬프트
                    </Text>

                    <Flex
                        justify="space-between"
                        align="stretch"
                        gap={16}
                        wrap="wrap"
                        style={{ marginTop: "32px" }}
                    >
                        <PreviewSection />
                        <FormSection
                            onSumbit={handleClickSubmit}
                            isEdit={isEdit}
                        />
                    </Flex>
                </PromptNewWrapper>
            </Container>
        </FormProvider>
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
