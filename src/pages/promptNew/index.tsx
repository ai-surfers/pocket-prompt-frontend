import Text from "@/components/common/Text/Text";
import { InputType } from "@/core/Prompt";
import {
    CreatePromptRequest,
    InputFormat,
    usePostPrompt,
} from "@/hooks/mutations/prompts/usePostPrompt";
import { usePutPrompt } from "@/hooks/mutations/prompts/usePutPrompt";
import usePromptQuery from "@/hooks/queries/prompts/usePromptQuery";
import { Wrapper } from "@/layouts/Layout";
import FormSection from "@/pages/promptNew/components/FormSection";
import PreviewSection from "@/pages/promptNew/components/PreviewSection";
import {
    defaultPromptSchema,
    promptSchema,
    PromptSchemaType,
} from "@/schema/PromptSchema";
import { extractOptions } from "@/utils/promptUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex } from "antd";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { z } from "zod";

interface PromptNewPageProps {
    isEdit?: boolean;
}

export default function PromptNewPage({ isEdit = false }: PromptNewPageProps) {
    // 수정 모드일 때 uri id 값으로 프롬프트 상세 조회
    const { promptId } = useParams<{ promptId: string }>();
    const { data } = usePromptQuery(promptId ?? "");

    const form = useForm<PromptSchemaType>({
        resolver: zodResolver(promptSchema),
        defaultValues: defaultPromptSchema,
    });

    const { mutate: createPromptMutate } = usePostPrompt({
        onSuccess(res) {
            console.log("Success", res);
            alert(res.detail || "프롬프트를 등록하였습니다.");
            form.reset(defaultPromptSchema);
        },
        onError(e) {
            console.error("Failed", e);
            alert("프롬프트 등록에 실패하였습니다.");
        },
    });

    const { mutate: updatePromptMutate } = usePutPrompt({
        onSuccess(res) {
            console.log("Success", res);
            alert(res.detail || "프롬프트가 수정되었습니다.");
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

    return (
        <FormProvider {...form}>
            <Container>
                <PromptNewWrapper>
                    <Text font="large_32_bold" style={{ marginTop: "40px" }}>
                        나만의 프롬프트 등록하기
                    </Text>

                    <Text font="h2_20_reg" color="G_400">
                        실시간으로 미리보기 화면을 보면서 등록하는 나만의
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
