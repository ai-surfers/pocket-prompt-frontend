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
import useModal from "@/hooks/useModal";
import Button from "../common/Button/Button";
import PreviewSection from "./PreviewSection";
// import FormSection from "./FormSection";
import PromptNewLnb from "../lnb/PromptNewLnb";
import { useDeviceSize } from "@components/DeviceContext";
import FormFirstSection from "./FormFirstSection";
import FormSecSection from "./FormSecSection";
import FormThirdSecion from "./FormThirdSecion";

interface PromptNewPageProps {
    isEdit: boolean;
    promptId?: string;
}

export default function NewPromptClient({
    isEdit,
    promptId,
}: PromptNewPageProps) {
    // LNB 탭으로 관리
    const [activeTab, setActiveTab] = useState("1");
    const [promptTemplate, setPromptTemplate] = useState("");
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [selectedDescription, setSelectedDescription] = useState<
        string | null
    >(null);

    const { isUnderTablet } = useDeviceSize();
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    // 수정 모드일 때 uri id 값으로 프롬프트 상세 조회
    const { data } =
        isEdit && promptId ? usePromptQuery(promptId) : { data: null };

    const showToast = useToast();
    const { openModal, closeModal } = useModal();

    const mode = !isEdit ? "등록" : "수정";

    const form = useForm<PromptSchemaType>({
        resolver: zodResolver(promptSchema),
        defaultValues: defaultPromptSchema,
    });

    const promptTemplateValue = form.watch("prompt_template") || "";
    const isValid = promptTemplateValue.length > 0;

    const { mutate: createPromptMutate } = usePostPrompt({
        onSuccess(res) {
            console.log("Success", res);
            showToast({
                title: "프롬프트 등록이 완료되었어요.",
                subTitle: "",
                iconName: "TickCircle",
            });
            form.reset(defaultPromptSchema);
            router.replace(`/prompt/${res.data.prompt_id}`);
        },
        onError(e) {
            console.error("Failed", e);
            openModal({
                title: "프롬프트 등록에 실패하였습니다.",
                content: (
                    <Text font="b3_14_reg" color="G_700">
                        {e.response?.data.detail}
                    </Text>
                ),
                footer: (
                    <Flex
                        style={{ width: "100%", paddingTop: "20px" }}
                        gap={16}
                        justify="end"
                    >
                        <Button
                            id="modal-close-button"
                            hierarchy="default"
                            style={{ flex: 1, justifyContent: "center" }}
                            onClick={closeModal}
                        >
                            닫기
                        </Button>
                    </Flex>
                ),
            });
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
                    title: selectedTitle || input.title,
                    description: selectedDescription || input.description,
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
                // form.reset(defaultPromptSchema);
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

    //////////////// active tab에 따른 제목 /////////////////

    const getHeaderText = (tab: string) => {
        switch (tab) {
            case "1":
                return "프롬프트 작성";
            case "2":
                return "제목, 설명 작성";
            case "3":
                return "추가 설정";
            default:
                return "";
        }
    };

    const getBtnText = () => (activeTab === "3" ? "프롬프트 등록하기" : "다음");

    const handleButtonClick = () => {
        if (activeTab === "1") {
            goToNextTab(form.getValues("prompt_template"));
        } else if (activeTab === "2") {
            goToNextTab();
        } else if (activeTab === "3") {
            handleClickSubmit();
        }
    };

    const goToNextTab = (templateValue?: string) => {
        // 탭 1에서 다음으로 넘어가기 전, prompt_template의 길이가 30자 미만이면 알림 표시
        if (activeTab === "1") {
            if (!templateValue || templateValue.length < 30) {
                showToast({
                    title: "프롬프트 템플릿은 30자 이상 작성해주세요.",
                    subTitle: "",
                    iconName: "Timer",
                });
                return;
            }
        }

        if (templateValue) {
            setPromptTemplate(templateValue);
        }
        if (activeTab === "1") setActiveTab("2");
        else if (activeTab === "2") setActiveTab("3");
    };

    const handleLNBChange = (newTab: string) => {
        // LNB 클릭 시, 폼 검증
        const { prompt_template, title, description } = form.getValues();

        if (newTab === "2") {
            // prompt_template 길이가 30자 미만

            if (prompt_template.length < 30) {
                showToast({
                    title: "프롬프트 템플릿은 30자 이상 작성해주세요.",
                    subTitle: "",
                    iconName: "Timer",
                });
                return;
            }
            // 탭 1 → 탭 2로 전환 시 prompt_template 필드가 필수
            // if (!prompt_template) {
            //     showToast({
            //         title: "필수 항목을 작성해주세요.",
            //         subTitle: "프롬프트 템플릿을 입력해주세요.",
            //         iconName: "Timer",
            //     });
            //     return;
            // }
        } else if (newTab === "3") {
            // 탭 2 → 탭 3로 전환 시 title과 description 필드가 필수
            if (!title || !description) {
                showToast({
                    title: `필수 항목을 작성해주세요.`,
                    subTitle: "제목과 설명을 입력해주세요.",
                    iconName: "Timer",
                });
                return;
            }
        }

        setActiveTab(newTab);
    };

    return (
        <FormProvider {...form}>

            <form onSubmit={form.handleSubmit(handleClickSubmit)}>
                <Container $isUnderTablet={isUnderTablet}>
                    <LeftSection>
                        <PromptNewLnb
                            initialMenu={activeTab}
                            onTabChange={handleLNBChange}
                        />
                    </LeftSection>

                    <PromptNewWrapper $isUnderTablet={isUnderTablet}>
                        <Flex
                            gap={10}
                            align="center"
                            style={{ marginBottom: "20px" }}
                        >
                            <NumberBox>{activeTab}</NumberBox>
                            <Text font="large_32_bold">
                                {getHeaderText(activeTab)}
                            </Text>
                        </Flex>

                        {/*  프롬프트 작성 tab */}
                        {activeTab === "1" && (
                            <FirstWriteSection $isUnderTablet={isUnderTablet}>
                                <FormFirstSection
                                    isEdit={isEdit}
                                    goToNextTab={goToNextTab}
                                />
                                <PreviewSection />
                            </FirstWriteSection>
                        )}

                        {/*  제목,설명 작성 tab */}
                        {activeTab === "2" && (
                            <SecondWriteSection $isUnderTablet={isUnderTablet}>
                                <FormSecSection
                                    isEdit={isEdit}
                                    goToNextTab={goToNextTab}
                                    promptTemplate={promptTemplate}
                                    setSelectedTitle={setSelectedTitle}
                                    setSelectedDescription={
                                        setSelectedDescription
                                    }
                                />
                            </SecondWriteSection>
                        )}

                        {/* 추가 설정 tab */}
                        {activeTab === "3" && (
                            <ThridWriteSection $isUnderTablet={isUnderTablet}>
                                <FormThirdSecion
                                    onSubmit={handleClickSubmit}
                                    isEdit={isEdit}
                                />
                            </ThridWriteSection>
                        )}
                    </PromptNewWrapper>
                </Container>
            </form>

            {isUnderTablet && (
                <MobileButtonContainer>
                    <Button
                        id="register-prompt"
                        size={52}
                        width="100%"
                        style={{ justifyContent: "center" }}
                        onClick={handleButtonClick}
                        hierarchy={isValid ? "primary" : "disabled"}
                    >
                        {getBtnText()}
                    </Button>
                </MobileButtonContainer>
            )}

        </FormProvider>
    );
}

const Container = styled.div<{ $isUnderTablet: boolean }>`
    ${({ theme, $isUnderTablet }) =>
        theme.mixins.flexBox(
            $isUnderTablet ? "column" : "row",
            "center",
            "start"
        )};
    gap: 30px;
    align-items: start;
    width: 100vw;
    background-color: white;
    position: relative;
    padding-top: 92px;
    margin-left: ${({ $isUnderTablet }) => ($isUnderTablet ? "10%" : "0")};
    margin-bottom: 100px;
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const NumberBox = styled.div`
    width: 35px;
    height: 35px;
    ${({ theme }) => theme.mixins.flexBox("center", "center")};
    color: var(--primary_normal, #7580ea);
    background: var(--primary-10, #f2f3fd);
    text-align: center;
    font-weight: 700;
    border-radius: 20%;
`;

const PromptNewWrapper = styled.div<{ $isUnderTablet: boolean }>`
    width: ${({ $isUnderTablet }) => ($isUnderTablet ? "80%" : "60%")};
`;

const FirstWriteSection = styled.div<{ $isUnderTablet: boolean }>`
    ${({ theme, $isUnderTablet }) =>
        theme.mixins.flexBox(
            $isUnderTablet ? "column" : "row",
            "space-between",
            "start"
        )};
    gap: ${({ $isUnderTablet }) => ($isUnderTablet ? "16px" : "16px")};
    flex-wrap: wrap;
    /* min-width: 1080px; */
    width: 100%;
`;

const SecondWriteSection = styled.div<{ $isUnderTablet: boolean }>`
    ${({ theme, $isUnderTablet }) =>
        theme.mixins.flexBox(
            $isUnderTablet ? "column" : "",
            "space-between",
            ""
        )};

    width: 100%;
    padding-right: ${({ $isUnderTablet }) =>
        $isUnderTablet ? "0px" : "150px"};
`;

const ThridWriteSection = styled.div<{ $isUnderTablet: boolean }>`
    ${({ theme, $isUnderTablet }) =>
        theme.mixins.flexBox(
            $isUnderTablet ? "column" : "",
            "space-between",
            ""
        )};
    /* max-width: 684px; */
    width: 100%;
    padding-right: ${({ $isUnderTablet }) =>
        $isUnderTablet ? "0px" : "150px"};
    padding-bottom: 40px;
`;

//   isUnderTablet 전용 버튼 컨테이너
const MobileButtonContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 20px;
    background-color: white;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    z-index: 999;
`;
