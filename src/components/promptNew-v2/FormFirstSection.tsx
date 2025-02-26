import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Text from "@/components/common/Text/Text";
import Textarea from "@/components/common/Textarea/Textarea";
import Toggle from "@/components/common/Toggle/Toggle";
import { AIPlatforms, Categories } from "@/core/Prompt";
import FormItem from "./Form/FormItem";
import { PromptSchemaType } from "@/schema/PromptSchema";
import { Flex, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import Icon from "../common/Icon";

interface FormSectionProps {
    isEdit: boolean;
    goToNextTab: () => void;
}

function FormFirstSection({ isEdit, goToNextTab }: FormSectionProps) {
    const {
        control,
        // formState: { isValid },
        watch,
    } = useFormContext<PromptSchemaType>();

    const promptTemplateValue = watch("prompt_template") || "";
    const isValid = promptTemplateValue.length > 0;

    return (
        <Box>
            <form>
                <Flex vertical gap={32}>
                    <FormItem
                        title="프롬프트 템플릿"
                        tags={["필수"]}
                        description=" [주제], [청중] 처럼 다른 사용자들에게 입력 받고 싶은 항목을 대괄호로 감싸주세요."
                    >
                        {/* <HelpBox>
                            <Text
                                font="b3_14_reg"
                                color="primary_100"
                                onClick={goToGuide}
                            >
                                어떻게 작성해야 할지 모르겠다면?
                            </Text>
                            <Icon
                                name="InfoCircle"
                                color="primary_100"
                                size={20}
                            />
                        </HelpBox> */}

                        <Controller
                            name="prompt_template"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    defaultHeight="350px"
                                    placeholder={
                                        "예시: [주제]를 주제로 한 파워포인트의 초안을 작성해줘.\n총 10 슬라이드로 이루어져있고, 청중은 [청중]을 대상으로 고려해줘."
                                    }
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </FormItem>
                </Flex>
            </form>

            <Button
                id="register-prompt"
                size={52}
                width="100%"
                style={{ marginTop: "60px", justifyContent: "center" }}
                onClick={goToNextTab}
                hierarchy={isValid ? "primary" : "disabled"}
            >
                다음
            </Button>
        </Box>
    );
}

export default FormFirstSection;

const Box = styled.div`
    flex: 7;
    border-radius: 16px;
    /* border: 1.5px solid ${({ theme }) => theme.colors.primary_50}; */
    background: #fff;
    padding-right: 20px;
`;

const HelpBox = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    gap: 4px;
    justify-self: flex-end;

    cursor: pointer;
    transition: opacity 0.2s;
    &:hover {
        opacity: 0.6;
    }
`;
