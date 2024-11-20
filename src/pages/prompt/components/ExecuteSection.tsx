import { PromptInputField } from "@/apis/prompt/prompt.model";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Text from "@/components/common/Text/Text";
import Icon from "@/pages/home/components/common/Icon";
import PocketRunDropdown from "@/pages/prompt/components/PocketRunDropdown";
import PromptTemplateModal from "@/pages/prompt/components/PromptTemplateModal";
import FormItem from "@/pages/promptNew/components/Form/FormItem";
import { copyClipboard, populateTemplate } from "@/utils/promptUtils";
import { Flex } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

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
    const { control, formState } = form;

    const [isPromptTemplateOpen, setIsPromptTemplateOpen] = useState(false);
    const handleShowTemplate = () => {
        setIsPromptTemplateOpen(true);
    };

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
                    // [TODO] 포켓런
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
                        disabled={!formState.isValid}
                        onSelect={handleClickSubmit}
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
