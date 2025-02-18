import { PromptInputField } from "@/apis/prompt/prompt.model";
import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import { PocketRunModel } from "@/core/Prompt";
import { UTM_OVER_USAGE_LIMIT_URL, UTM_TIER_LIMIT_URL } from "@/core/UtmUri";
import usePocketRun from "@/hooks/mutations/pocketRun/usePocketRun";
import Icon from "@/components/common/Icon";
import useModal from "@/hooks/useModal";
import useToast from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import PocketRunDropdown from "./PocketRunDropdown";
import PromptTemplateModal from "./PromptTemplateModal";
import FormItem from "../promptNew/Form/FormItem";
import { pocketRunLoadingState, pocketRunState } from "@/states/pocketRunState";
import { copyClipboard, populateTemplate } from "@/utils/promptUtils";
import { Flex } from "antd";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import Textarea from "@/components/common/Textarea/Textarea";
import Link from "next/link";

interface ExecuteSectionProps {
    onSelect: (value: string) => void;
    template: string;
    inputs: PromptInputField[];
    promptId: string;
}

export const ExecuteSection: React.FC<ExecuteSectionProps> = ({
    inputs,
    template,
    promptId,
}) => {
    const form = useForm();
    const { control, formState, watch } = form;

    const [isPromptTemplateOpen, setIsPromptTemplateOpen] = useState(false);
    const handleShowTemplate = () => {
        setIsPromptTemplateOpen(true);
    };

    const [pocketRunRes, setPocketRunRes] = useRecoilState(pocketRunState);
    const setPocketRunLoading = useSetRecoilState(pocketRunLoadingState);

    const [hasChanged, setHasChanged] = useState(false);
    const prevFormValues = useRef<Record<string, string>>({});
    const formValues = watch();
    const { userData } = useUser();
    const showToast = useToast();
    const { openModal, closeModal } = useModal();

    const { mutate: pocketRun, isPending } = usePocketRun({
        onSuccess: (res) => {
            // 로딩중으로 표시되고 있는 결과란 컴포넌트에 pocketRun 결과값 주입
            setPocketRunRes((prevState) => {
                const newState = [...prevState];
                newState[prevState.length - 1] = res;
                return newState;
            });
        },
        onError: (err) => {
            if (
                err.response?.data?.detail ===
                    "플랜 한도를 초과하였습니다. 플랜을 업그레이드해 주세요." ||
                err.response?.data?.detail ===
                    "무료 사용자는 고급 모델을 사용할 수 없습니다. 유료 플랜으로 업그레이드해 주세요."
            ) {
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
                                style={{ flex: 1, justifyContent: "center" }}
                                onClick={closeModal}
                            >
                                닫기
                            </Button>
                            {
                                // 운영 환경일 때만 utm 경로로 이동
                                process.env.APP_ENV === "production" ? (
                                    <Button
                                        id="modal-price-button"
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

                // 로딩중인 포켓런 결과 컴포넌트가 남아있지 않도록 함
                if (pocketRunRes.length > 1) {
                    setPocketRunRes((prevState) => {
                        return prevState.slice(0, -1);
                    });
                }
            }
        },
    });

    const handleClickSubmit = async (platform?: string) => {
        form.handleSubmit(
            async (values: Record<string, string>) => {
                if (!platform) {
                    const prompt = populateTemplate(template, values);

                    copyClipboard(prompt)
                        .then(() => {
                            showToast({
                                title: "프롬프트 복사가 완료되었어요.",
                                subTitle:
                                    "복사된 프롬프트를 AI 플랫폼에 붙여넣기하여 사용해주세요.",
                                iconName: "CopySuccess",
                            });
                        })
                        .catch((err) => {
                            console.error("클립보드 복사 실패:", err);
                            alert("클립보드 복사에 실패했습니다.");
                        });
                } else {
                    if (!userData.isLogin) {
                        showToast({
                            title: "로그인 후 이용 가능합니다.",
                            subTitle: "",
                            iconName: "TickCircle",
                        });
                        return;
                    }
                    pocketRun(
                        {
                            promptId: promptId ?? "",
                            context: values,
                            model: PocketRunModel[platform].value,
                        },
                        { onSuccess: () => {} }
                    );
                    // pocketRun 실행되기 전 로딩 화면에 model, context 입력을 위해 form 데이터 사용하여 pocketRunRes 업데이트
                    setPocketRunRes((prevState) => {
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
        setPocketRunLoading(isPending);
    }, [isPending, setPocketRunLoading]);

    useEffect(() => {
        // 최초 포켓런이 아니고 입력값 변경이 있었을 때 포켓런 실행하기 버튼 string 바꾸는 로직
        const hasFormChanged = Object.keys(formValues).some((key) => {
            return formValues[key] !== prevFormValues.current[key];
        });

        if (hasFormChanged && pocketRunRes[0].model !== "") {
            setHasChanged(true);
        }

        prevFormValues.current = formValues;
    }, [formValues, pocketRunRes.length]);

    return (
        <>
            <Flex vertical gap={16}>
                <Flex
                    justify="space-between"
                    align="center"
                    style={{ marginBottom: "30px" }}
                >
                    <Text font="b1_18_semi">프롬프트 사용하기</Text>
                    <Text
                        id="show-template-button"
                        font="b3_14_med"
                        color="G_400"
                        style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}
                        onClick={handleShowTemplate}
                    >
                        프롬프트 템플릿 확인하기
                    </Text>
                </Flex>

                <form>
                    <Flex vertical gap={24} style={{ marginBottom: "80px" }}>
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
                        style={{ padding: "12px" }}
                        onClick={() => handleClickSubmit()}
                    />

                    <PocketRunDropdown
                        id="pocket-run-dropdown"
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
