import Text from "@/components/common/Text/Text";
import ExampleBox from "@/pages/promptNew/components/Example/ExampleBox";
import ExampleContent from "@/pages/promptNew/components/Example/ExampleContent";
import { Flex } from "antd";
import styled from "styled-components";

interface PreviewSectionProps {
    title?: string;
    description?: string;
    inputs?: string[];
}
function PreviewSection({ title, description, inputs }: PreviewSectionProps) {
    return (
        <Box>
            <Text font="h2_20_bold">내 프롬프트 미리보기</Text>

            <Flex vertical gap={30} style={{ marginTop: "24px" }}>
                <Flex vertical gap={6}>
                    <ExampleBox
                        defaultValue="프롬프트 제목이 이곳에 표시됩니다."
                        value={title}
                        font="b1_18_semi"
                        color="G_700"
                    />
                    <ExampleBox
                        defaultValue="프롬프트 설명이 이곳에 표시됩니다."
                        value={description}
                        font="b3_14_reg"
                        color="G_500"
                    />
                </Flex>

                <ExampleContent
                    defaultValue="프롬프트 내용에 따른 미리보기가 이곳에 표시됩니다."
                    value={inputs}
                />
            </Flex>
        </Box>
    );
}

export default PreviewSection;

const Box = styled.div`
    flex: 3;

    border-radius: 16px;
    border: 1.5px solid ${({ theme }) => theme.colors.G_100};
    background: #fff;
    padding: 20px;
`;
