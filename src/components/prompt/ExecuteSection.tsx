// src/components/prompt/ExecuteSection.tsx
import { PromptInputField } from "@/apis/prompt/prompt.model";
import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import Text from "@/components/common/Text/Text";
import Textarea from "@/components/common/Textarea/Textarea";
import { PocketRunImageModel, PocketRunModel } from "@/core/Prompt";
import { UTM_OVER_USAGE_LIMIT_URL, UTM_TIER_LIMIT_URL } from "@/core/UtmUri";
import useImgPocketRun from "@/hooks/mutations/pocketRun/useImgPocketRun";
import usePocketRun from "@/hooks/mutations/pocketRun/usePocketRun";
import useModal from "@/hooks/useModal";
import useToast from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import {
    imgPocketRunLoadingState,
    imgPocketRunState,
    pocketRunLoadingState,
    pocketRunState,
} from "@/states/pocketRunState";
import { copyClipboard, populateTemplate } from "@/utils/promptUtils";
import { Flex } from "antd";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import FormItem from "../promptNew/Form/FormItem";
import PocketRunDropdown from "./PocketRunDropdown";
import PromptTemplateModal from "./PromptTemplateModal";

export interface ExecuteSectionProps {
    onSelect: (platform: string) => void;
    template: string;
    inputs: PromptInputField[];
    promptId: string;
    promptType: "text" | "image";
}

export const ExecuteSection: React.FC<ExecuteSectionProps> = ({
    inputs,
    template,
    promptId,
    promptType,
    onSelect,
}) => {
    const form = useForm();
    const { control, formState, watch } = form;

    const [isPromptTemplateOpen, setIsPromptTemplateOpen] = useState(false);
    const handleShowTemplate = () => {
        if (!userData.isLogin) {
            showToast({
                title: "로그인 후 이용 가능합니다.",
                subTitle: "",
                iconName: "TickCircle",
            });
            return;
        }
        setIsPromptTemplateOpen(true);
    };

    // promptType에 따라 Recoil 상태 선택
    const [runState, setRunState] = useRecoilState(
        promptType === "text" ? pocketRunState : imgPocketRunState
    );
    const setRunLoading = useSetRecoilState(
        promptType === "text" ? pocketRunLoadingState : imgPocketRunLoadingState
    );

    const [hasChanged, setHasChanged] = useState(false);
    const prevFormValues = useRef<Record<string, string>>({});
    const formValues = watch();

    const { userData } = useUser();
    const showToast = useToast();
    const { openModal, closeModal } = useModal();

    const { mutate: runMutation, isPending } = (
        promptType === "text" ? usePocketRun : useImgPocketRun
    )({
        onSuccess: (res) => {
            // 로딩중으로 표시되고 있는 결과란 컴포넌트에 pocketRun 결과값 주입
            setRunState((prevState) => {
                const newState = [...prevState];
                newState[prevState.length - 1] = res;
                return newState;
            });
        },
        onError: (err) => {
            const detail = err.response?.data?.detail;

            switch (detail) {
                case "과도한 사용으로 인해 일시적으로 고급 모델 사용이 제한되었습니다. 내일 다시 시도해 주세요.":
                    if (err.response?.status === 429) {
                        showToast({
                            title: "사용 제한",
                            subTitle:
                                "과도한 사용으로 인해 일시적으로 고급 모델 사용이 제한되었습니다. 내일 다시 시도해 주세요.",
                            iconName: "ArchiveSlash",
                        });

                        if (runState.length > 1) {
                            setRunState((prevState) => prevState.slice(0, -1));
                        }
                    }
                    break;

                case "플랜 한도를 초과하였습니다. 플랜을 업그레이드해 주세요.":
                case "무료 사용자는 고급 모델을 사용할 수 없습니다. 유료 플랜으로 업그레이드해 주세요.":
                    const utmUrl =
                        err.message ===
                        "플랜 한도를 초과하였습니다. 플랜을 업그레이드해 주세요."
                            ? UTM_OVER_USAGE_LIMIT_URL
                            : UTM_TIER_LIMIT_URL;

                    const handleClickPriceInProduction = () => {
                        window.location.href = utmUrl;
                    };

                    openModal({
                        title: "포켓런 한도에 도달했어요",
                        content: (
                            <Text font="b3_14_reg" color="G_700">
                                {err.response?.data?.detail ===
                                "플랜 한도를 초과하였습니다. 플랜을 업그레이드해 주세요."
                                    ? "플랜 한도를 초과하였어요. 플랜을 업그레이드해 주세요."
                                    : "무료 사용자는 고급 모델을 사용할 수 없어요. 유료 플랜으로 업그레이드해 주세요."}
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
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                    }}
                                    onClick={closeModal}
                                >
                                    닫기
                                </Button>
                                {
                                    // 운영 환경일 때만 utm 경로로 이동
                                    process.env.APP_ENV === "production" ? (
                                        <Button
                                            id="advanced-model-explore-plans"
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

                    if (runState.length > 1) {
                        setRunState((prevState) => prevState.slice(0, -1));
                    }
                    break;

                default:
                    // 예상치 못한 에러 처리 (필요 시)
                    showToast({
                        title: "오류 발생",
                        subTitle:
                            "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.",
                        iconName: "ArchiveSlash",
                    });
                    if (runState.length > 1) {
                        setRunState((prevState) => prevState.slice(0, -1));
                    }
                    break;
            }
        },
    });

    const handleClickSubmit = async (platform?: string) => {
        form.handleSubmit(
            async (values: Record<string, string>) => {
                if (!platform) {
                    const prompt = populateTemplate(template, values);
                    copyClipboard(prompt)
                        .then(() =>
                            showToast({
                                title: "프롬프트 복사가 완료되었어요.",
                                subTitle:
                                    "복사된 프롬프트를 AI 플랫폼에 붙여넣기하여 사용해주세요.",
                                iconName: "CopySuccess",
                            })
                        )
                        .catch(() => alert("클립보드 복사에 실패했습니다."));
                } else {
                    if (!userData.isLogin) {
                        showToast({
                            title: "로그인 후 이용 가능합니다.",
                            subTitle: "",
                            iconName: "TickCircle",
                        });
                        return;
                    }

                    // promptType에 따른 모델 레코드 선택
                    const modelRecord =
                        promptType === "image"
                            ? PocketRunImageModel
                            : PocketRunModel;
                    const modelValue = modelRecord[platform].value;

                    runMutation(
                        {
                            promptId,
                            context: values,
                            model: modelValue,
                        },
                        { onSuccess: () => {} }
                    );
                    // pocketRun 실행되기 전 로딩 화면에 model, context 입력을 위해 form 데이터 사용하여 pocketRunRes 업데이트
                    setRunState((prevState) => {
                        const entry = {
                            response: "",
                            context: values,
                            model: modelValue,
                        };
                        if (prevState[0].response === "") {
                            // pocketRunRes에 요소가 처음 업데이트 되는 경우 새 배열로 setPocketRunRes
                            return [
                                {
                                    response: "",
                                    context: values,
                                    model: PocketRunModel[platform].value,
                                },
                            ];
                        } else {
                            // pocketRunRes에 앞선 결과값이 저장되어있을 경우 배열에 push
                            return [
                                ...prevState,
                                {
                                    response: "",
                                    context: values,
                                    model: PocketRunModel[platform].value,
                                },
                            ];
                        }
                    });
                }
            },
            (errors) => {
                console.log(">> error", errors);
                const firstError = Object.values(errors)?.[0];
                if (firstError) {
                    alert(firstError.message);
                }
            }
        )();
    };

    useEffect(() => {
        setRunLoading(isPending);
    }, [isPending, setRunLoading]);

    useEffect(() => {
        // 최초 포켓런이 아니고 입력값 변경이 있었을 때 포켓런 실행하기 버튼 string 바꾸는 로직
        const hasFormChanged = Object.keys(formValues).some((key) => {
            return formValues[key] !== prevFormValues.current[key];
        });

        if (hasFormChanged && runState[0].model !== "") {
            setHasChanged(true);
        }
        prevFormValues.current = formValues;
    }, [formValues, runState]);

    return (
        <>
            <Flex vertical gap={16}>
                <Flex
                    justify="space-between"
                    align="center"
                    style={{ marginBottom: 30 }}
                >
                    <Text font="b1_18_semi">프롬프트 사용하기</Text>
                    <Text
                        id="show-template-button"
                        font="b3_14_med"
                        color="G_400"
                        style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                            pointerEvents: "all",
                        }}
                        onClick={handleShowTemplate}
                    >
                        프롬프트 템플릿 확인하기
                    </Text>
                </Flex>

                <form>
                    <Flex vertical gap={24} style={{ marginBottom: 80 }}>
                        {inputs.map((input) => (
                            <FormItem
                                title={input.name}
                                tags={["필수"]}
                                key={input.name}
                            >
                                <Controller
                                    name={input.name}
                                    control={control}
                                    rules={{
                                        required: `${input.name}를 입력해 주세요!`,
                                    }}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            ref={field.ref}
                                            placeholder={
                                                input.placeholder ||
                                                "입력 값을 입력해 주세요."
                                            }
                                            disabled={isPending}
                                            isMini={true}
                                        />
                                    )}
                                />
                            </FormItem>
                        ))}
                    </Flex>
                </form>

                <Flex gap={12}>
                    <Button
                        id="copy-prompt"
                        size={44}
                        hierarchy={
                            !formState.isValid ? "disabled" : "secondary"
                        }
                        suffix={
                            <Icon
                                name="Copy"
                                size={20}
                                color={
                                    !formState.isValid ? "G_300" : "primary_100"
                                }
                            />
                        }
                        style={{ padding: 12 }}
                        onClick={() => handleClickSubmit()}
                    />
                    <PocketRunDropdown
                        id="pocket-run-dropdown"
                        promptType={promptType}
                        disabled={!formState.isValid || isPending}
                        onSelect={handleClickSubmit}
                        secondRun={hasChanged}
                    />
                </Flex>
            </Flex>

            <PromptTemplateModal
                template={template}
                isOpen={isPromptTemplateOpen}
                onClose={() => setIsPromptTemplateOpen(false)}
            />
        </>
    );
};
