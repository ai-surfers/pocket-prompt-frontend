import { PromptInputField } from "@/apis/prompt/prompt.model";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Text from "@/components/common/Text/Text";
import Icon from "@/pages/home/components/common/Icon";
import FormItem from "@/pages/promptNew/components/Form/FormItem";
import { Flex, Select } from "antd";
import { Controller, useForm } from "react-hook-form";

interface ExecuteSectionProps {
    onSelect: (value: string) => void;
    onShowTemplate: () => void;
    inputs: PromptInputField[];
}

export const ExecuteSection: React.FC<ExecuteSectionProps> = ({
    onSelect,
    onShowTemplate,
    inputs,
}) => {
    const form = useForm();
    const { control } = form;

    const handleClickSubmit = async () => {
        console.log(">> handleClickSubmit");
        form.handleSubmit(
            async (values: unknown) => {
                console.log("Form Data:", values);
                alert(`Form Submitted: ${JSON.stringify(values)}`);
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
        <form onSubmit={handleClickSubmit}>
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
                        onClick={onShowTemplate}
                    >
                        프롬프트 템플릿 확인하기
                    </Text>
                </Flex>

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

                <Flex gap={12}>
                    <Button
                        size={44}
                        hierarchy="secondary"
                        suffix={<Icon name="Copy" size={20} />}
                        style={{ padding: "12px" }}
                    />

                    <Select
                        placeholder="포켓런 하기"
                        style={{
                            width: "100%",
                            height: "44px",
                        }}
                        options={[
                            { key: "ChatGPT", value: "Chat GPT 기반" },
                            { key: "Claude", value: "Claude 기반" },
                            { key: "Gemini", value: "Gemini 기반" },
                        ]}
                        onSelect={() => handleClickSubmit()}
                    />
                </Flex>
            </Flex>
        </form>
    );
};
