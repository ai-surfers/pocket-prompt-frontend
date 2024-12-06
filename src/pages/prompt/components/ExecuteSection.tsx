import { PromptInputField } from "@/apis/prompt/prompt.model";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Text from "@/components/common/Text/Text";
import usePocketRun from "@/hooks/mutations/pocketRun/usePocketRun";
import useModal from "@/hooks/useModal";
import useToast from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import Icon from "@/pages/home/components/common/Icon";
import PocketRunDropdown from "@/pages/prompt/components/PocketRunDropdown";
import PromptTemplateModal from "@/pages/prompt/components/PromptTemplateModal";
import FormItem from "@/pages/promptNew/components/Form/FormItem";
import { pocketRunLoadingState, pocketRunState } from "@/states/pocketRunState";
import { copyClipboard, populateTemplate } from "@/utils/promptUtils";
import { Flex } from "antd";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

interface ExecuteSectionProps {
    onSelect: (value: string) => void;
    template: string;
    inputs: PromptInputField[];
}

export const ExecuteSection: React.FC<ExecuteSectionProps> = ({
    inputs,
    template,
}) => {
    const form = useForm();
    const { control, formState, watch } = form;

    const [isPromptTemplateOpen, setIsPromptTemplateOpen] = useState(false);
    const handleShowTemplate = () => {
        setIsPromptTemplateOpen(true);
    };

    const { promptId } = useParams<{ promptId: string }>();

    const [pocketRunRes, setPocketRunRes] = useRecoilState(pocketRunState);
    const setPocketRunLoading = useSetRecoilState(pocketRunLoadingState);

    const [hasChanged, setHasChanged] = useState(false);
    const prevFormValues = useRef<Record<string, string>>({});
    const formValues = watch();
    const { userData } = useUser();
    const showToast = useToast();
    const { openModal, closeModal } = useModal();
    const navigate = useNavigate();

    const { mutate: pocketRun, isPending } = usePocketRun({
        onSuccess: (res) => {
            console.log("Success:", res);
            // 로딩중으로 표시되고 있는 결과란 컴포넌트에 pocketRun 결과값 주입
            setPocketRunRes((prevState) => {
                const newState = [...prevState];
                newState[prevState.length - 1] = res;
                return newState;
            });
        },
        onError: (err) => {
            console.error("Error:", err);
            if (
                err.message ===
                    "플랜 한도를 초과하였습니다. 플랜을 업그레이드해 주세요." ||
                err.message ===
                    "무료 사용자는 고급 모델을 사용할 수 없습니다. 유료 플랜으로 업그레이드해 주세요."
            ) {
                openModal({
                    title: "포켓런 한도에 도달했습니다",
                    content: (
                        <Text font="b3_14_reg" color="G_700">
                            {err.message}
                        </Text>
                    ),
                    footer: (
                        <Flex
                            style={{ width: "100%", paddingTop: "20px" }}
                            gap={16}
                        >
                            <Button
                                hierarchy="default"
                                style={{ flex: 1, justifyContent: "center" }}
                                onClick={closeModal}
                            >
                                닫기
                            </Button>
                            <Button
                                style={{ flex: 1, justifyContent: "center" }}
                                onClick={() => {
                                    closeModal();
                                    navigate("/price");
                                }}
                            >
                                플랜 둘러보기
                            </Button>
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
                console.log("Form Data:", values);

                if (!platform) {
                    const prompt = populateTemplate(template, values);
                    console.log(">>Populated Template", prompt);

                    copyClipboard(prompt)
                        .then(() => {
                            alert("프롬프트가 클립보드에 복사되었습니다.");
                        })
                        .catch((err) => {
                            console.error("클립보드 복사 실패:", err);
                            alert("클립보드 복사에 실패했습니다.");
                        });
                } else {
                    if (!userData.isLogin) {
                        showToast("로그인 후 이용 가능합니다.", "");
                        return;
                    }
                    pocketRun(
                        {
                            promptId: promptId ?? "",
                            context: values,
                            model: platform,
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
                                    model: platform,
                                },
                            ];
                        } else {
                            // pocketRunRes에 앞선 결과값이 저장되어있을 경우 배열에 push
                            return [
                                ...prevState,
                                {
                                    response: "",
                                    context: values,
                                    model: platform,
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
        console.log(isPending);
    }, [isPending, setPocketRunLoading]);

    useEffect(() => {
        // 최초 포켓런이 아니고 입력값 변경이 있었을 때 포켓런 실행하기 버튼 string 바꾸는 로직
        const hasFormChanged = Object.keys(formValues).some((key) => {
            return formValues[key] !== prevFormValues.current[key];
        });

        if (hasFormChanged && pocketRunRes.length > 1) {
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
                                        <Input
                                            {...field}
                                            placeholder={
                                                input.placeholder ||
                                                "입력 값을 입력해 주세요."
                                            }
                                            disabled={isPending}
                                        />
                                    )}
                                />
                            </FormItem>
                        ))}
                    </Flex>
                </form>

                <Flex gap={12}>
                    <Button
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
