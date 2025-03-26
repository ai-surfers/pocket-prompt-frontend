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
import useModal from "@/hooks/useModal";
import useToast from "@/hooks/useToast";
import { extractOptions } from "@/utils/promptUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    defaultPromptSchema,
    promptSchema,
    PromptSchemaType,
} from "@schema/PromptSchema";
import { Flex } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";
import Button from "../common/Button/Button";
import PreviewSection from "./PreviewSection";
// import FormSection from "./FormSection";
import { UTM_OVER_USAGE_LIMIT_URL, UTM_TIER_LIMIT_URL } from "@/core/UtmUri";
import {
    PROMPT_KEYS,
    PROMPT_QUERY_KEYS_FOR_PREFETCH,
} from "@/hooks/queries/QueryKeys";
import { useInvalidateQueryKeys } from "@/hooks/queries/useInvalidateQueryKeys";
import { useDeviceSize } from "@components/DeviceContext";
import Link from "next/link";
import PromptNewLnb from "../lnb/PromptNewLnb";
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

    const queryKey = isUnderTablet
        ? PROMPT_QUERY_KEYS_FOR_PREFETCH.ALL_PROMPTS_MOBILE
        : PROMPT_QUERY_KEYS_FOR_PREFETCH.ALL_PROMPTS;
    const resetPromptListQueryKey = useInvalidateQueryKeys(
        PROMPT_KEYS.list(queryKey)
    );
    const resetPromptQueryKey = useInvalidateQueryKeys(
        PROMPT_KEYS.detail(promptId ?? "")
    );

    const { mutate: createPromptMutate } = usePostPrompt({
        onSuccess(res) {
            console.log("Success", res);
            resetPromptListQueryKey();
            showToast({
                title: "프롬프트 등록이 완료되었어요.",
                subTitle: "",
                iconName: "TickCircle",
            });
            form.reset(defaultPromptSchema);
            router.replace(`/prompt/${res.data.prompt_id}`);
        },
        onError(e) {
            const utmUrl =
                e.message ===
                "플랜 한도를 초과하였습니다. 플랜을 업그레이드해 주세요."
                    ? UTM_OVER_USAGE_LIMIT_URL
                    : UTM_TIER_LIMIT_URL;

            const handleClickPriceInProduction = () => {
                window.location.href = utmUrl;
            };

            //  402 에러 체크
            if (e.response?.status === 402) {
                openModal({
                    title: "프롬프트 등록에 실패하였습니다.",
                    content: (
                        <Text
                            font="b3_14_reg"
                            color="G_700"
                            style={{ whiteSpace: "pre-line" }}
                        >
                            안녕하세요! 현재 사용 중인 계정의 개인 프롬프트 저장
                            한도에 도달했어요.
                            {"\n\n"}방금 프롬프트를 삭제하셨다면, 잠시 후 다시
                            시도해 주세요. 시스템에 반영되는데 약간의 시간이
                            필요할 수 있어요.
                            {"\n\n"}더 많은 아이디어를 저장하고 싶으신가요? lite
                            플랜으로 업그레이드하시면 더 많은 개인 프롬프트를
                            저장해 사용할 수 있습니다. 당신의 창의력에 날개를
                            달아보세요!
                        </Text>
                    ),
                    footer: (
                        <Flex
                            style={{ width: "100%", paddingTop: "20px" }}
                            gap={16}
                        >
                            <Button
                                id="modal-close-button"
                                hierarchy="default"
                                style={{ flex: 1, justifyContent: "center" }}
                                onClick={closeModal}
                            >
                                닫기
                            </Button>
                            {
                                // 운영 환경일 때만 utm 경로로 이동
                                process.env.APP_ENV === "production" ? (
                                    <Button
                                        id="private-prompts-limit-explore-plans"
                                        style={{
                                            flex: 1,
                                            justifyContent: "center",
                                        }}
                                        onClick={() => {
                                            closeModal();
                                            handleClickPriceInProduction();
                                        }}
                                    >
                                        플랜 둘러보기
                                    </Button>
                                ) : (
                                    // 개발환경 일때는 일반 경로로 이동
                                    <Link href="/price">
                                        <Button
                                            style={{
                                                flex: 1,
                                                justifyContent: "center",
                                            }}
                                            onClick={() => {
                                                closeModal();
                                            }}
                                        >
                                            플랜 둘러보기
                                        </Button>
                                    </Link>
                                )
                            }
                        </Flex>
                    ),
                });
            } else {
                // 그 외 에러
                const errorDetail = e.response?.data?.detail;
                openModal({
                    title: "프롬프트 등록에 실패하였습니다.",
                    content: (
                        <Text font="b3_14_reg" color="G_700">
                            {errorDetail}
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
            }
        },
    });

    const { mutate: updatePromptMutate } = usePutPrompt({
        onSuccess(res) {
            console.log("Success", res);
            resetPromptQueryKey();
            resetPromptListQueryKey();
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

    const getBtnText = () => {
        if (activeTab !== "3") {
            return "다음";
        }
        if (isEdit) {
            return "프롬프트 수정 완료하기";
        }
        return "프롬프트 등록 완료하기";
    };

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
            if (!prompt_template || prompt_template.length < 30) {
                showToast({
                    title: "프롬프트 템플릿은 30자 이상 작성해주세요.",
                    subTitle: "",
                    iconName: "Timer",
                });
                return;
            }
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
                                setSelectedDescription={setSelectedDescription}
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
    width: 100%;
    padding-right: ${({ $isUnderTablet }) =>
        $isUnderTablet ? "0px" : "150px"};
    padding-bottom: 40px;
`;

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
