import { Wrapper } from "@/layouts/Layout";
import { Flex, Select } from "antd";
import styled from "styled-components";

export default function PromptNewPage() {
    return (
        <Container>
            <Title>나만의 프롬프트 등록하기</Title>
            <Description>
                실시간으로 미리보기 화면을 보면서 등록하는 나만의 프롬프트
            </Description>

            <BoxContainer>
                <Box flex="3">
                    <BoxTitle>내 프롬프트 미리보기</BoxTitle>

                    <Flex vertical gap={30}>
                        <Flex vertical gap={6}>
                            <ExampleBox>
                                프롬프트 제목이 이곳에 표시됩니다.
                            </ExampleBox>
                            <ExampleBox>
                                프롬프트 설명이 이곳에 표시됩니다.
                            </ExampleBox>
                        </Flex>

                        <ExampleBox height="532px">
                            프롬프트 내용에 따른 미리보기가 이곳에 표시됩니다.
                        </ExampleBox>
                    </Flex>
                </Box>
                <Box flex="7" border="primary_50">
                    <BoxTitle>내 프롬프트 입력하기</BoxTitle>

                    <InputBoxContainer>
                        <InputBox>
                            <InputTitleBox>
                                <InputTitle>프롬프트 제목</InputTitle>
                                <InputTitleTagBox>
                                    <InputTitleTag>필수</InputTitleTag>
                                </InputTitleTagBox>
                            </InputTitleBox>
                            <Input placeholder="프롬프트의 제목을 입력해주세요." />
                        </InputBox>

                        <InputBox>
                            <InputTitleBox>
                                <InputTitle>프롬프트 설명</InputTitle>
                                <InputTitleTagBox>
                                    <InputTitleTag>필수</InputTitleTag>
                                </InputTitleTagBox>
                            </InputTitleBox>

                            <InputDescription>
                                다른 사람들이 프롬프트를 더 쉽게 이해할 수
                                있도록 설명을 입력해주세요!
                            </InputDescription>

                            <Textarea placeholder="예시: 주제와 청중을 입력하면 근사한 파워포인트 초안을 만들어주는 프롬프트" />
                        </InputBox>

                        <InputBox>
                            <InputTitleBox>
                                <InputTitle>프롬프트 템플릿</InputTitle>

                                <InputTitleTagBox>
                                    <InputTitleTag>필수</InputTitleTag>
                                </InputTitleTagBox>
                            </InputTitleBox>

                            <InputDescription>
                                [주제], [청중] 처럼 다른 사용자들에게 입력 받고
                                싶은 항목을 대괄호로 감싸주세요.
                            </InputDescription>

                            <Textarea
                                placeholder="예시: [주제]를 주제로 한 파워포인트의 초안을 작성해줘.
총 10슬라이드로 이루어져있고, 청중은 [청중]을 대상으로 고려해줘."
                            />
                        </InputBox>

                        <Flex style={{ width: "100%" }} gap={16}>
                            <InputBox style={{ flex: 1 }}>
                                <InputTitleBox>
                                    <InputTitle>사용한 AI</InputTitle>

                                    <InputTitleTagBox>
                                        <InputTitleTag>필수</InputTitleTag>
                                        <InputTitleTag>
                                            복수 선택 가능
                                        </InputTitleTag>
                                    </InputTitleTagBox>
                                </InputTitleBox>

                                <Select
                                    placeholder="사용한 AI를 선택해주세요."
                                    style={{ width: "100%", marginTop: "8px" }}
                                >
                                    <Select.Option value="chatgpt">
                                        ChatGPT
                                    </Select.Option>
                                    <Select.Option value="claude">
                                        Claude
                                    </Select.Option>
                                    <Select.Option value="gemini">
                                        Gemini
                                    </Select.Option>
                                </Select>
                            </InputBox>

                            <InputBox style={{ flex: 1 }}>
                                <InputTitleBox>
                                    <InputTitle>분야</InputTitle>

                                    <InputTitleTagBox>
                                        <InputTitleTag>필수</InputTitleTag>
                                        <InputTitleTag>
                                            최대 5개 선택 가능
                                        </InputTitleTag>
                                    </InputTitleTagBox>
                                </InputTitleBox>

                                <Select
                                    placeholder="프롬프트의 분야를 선택해주세요."
                                    style={{ width: "100%", marginTop: "8px" }}
                                >
                                    <Select.Option value="branding">
                                        브랜딩
                                    </Select.Option>
                                    <Select.Option value="blog">
                                        블로그
                                    </Select.Option>
                                </Select>
                            </InputBox>
                        </Flex>
                    </InputBoxContainer>

                    <Button>프롬프트 등록 완료하기</Button>
                </Box>
            </BoxContainer>
        </Container>
    );
}

const Container = styled(Wrapper)`
    max-width: 1080px;

    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 40px;
`;

const Title = styled.div`
    font-size: 32px;
    line-height: 144%; /* 46.08px */
    letter-spacing: -0.64px;
    ${({ theme }) => theme.fonts.bold};

    margin-top: 40px;
`;
const Description = styled.div`
    ${({ theme }) => theme.fonts.header2};
    ${({ theme }) => theme.fonts.regular};

    color: ${({ theme }) => theme.colors.G_400};
`;

const BoxContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "space-between", "stretch")};
    gap: 16px;
    margin-top: 32px;
`;

const Box = styled.div<{ flex: string; border?: string }>`
    flex: ${({ flex }) => flex};

    border-radius: 16px;
    border: 1.5px solid
        ${({ border, theme }) =>
            border ? theme.colors[border] : theme.colors.G_100};
    background: #fff;
    padding: 20px;
`;

const BoxTitle = styled.div`
    ${({ theme }) => theme.fonts.h2_20_bold};
    margin-bottom: 24px;
`;

const InputBoxContainer = styled.div`
    ${({ theme }) =>
        theme.mixins.flexBox("column", "flex-start", "flex-start")};
    gap: 32px;
`;
const InputBox = styled.div`
    width: 100%;
`;

const InputTitleBox = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "flex-start")};
    gap: 12px;
`;

const InputTitle = styled.div`
    ${({ theme }) => theme.fonts.b1_18_bold};
`;

const InputTitleTag = styled.div`
    ${({ theme }) => theme.fonts.c1_12_semi};
    color: ${({ theme }) => theme.colors.primary_100};
`;

const InputTitleTagBox = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row")};
    gap: 8px;
`;

const InputDescription = styled.div`
    ${({ theme }) => theme.fonts.b3_14_reg};
    color: ${({ theme }) => theme.colors.G_400};
`;

const Button = styled.button`
    width: 100%;
    padding: 14px 16px;
    ${({ theme }) => theme.mixins.flexBox()};
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.G_100};
    color: ${({ theme }) => theme.colors.G_300};
    margin-top: 60px;

    ${({ theme }) => theme.fonts.b2_16_semi};
`;

const Input = styled.input`
    width: 100%;
    padding: 11px 12px;
    ${({ theme }) => theme.mixins.flexBox()};
    ${({ theme }) => theme.fonts.b3_14_reg};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.primary_20};
    background: ${({ theme }) => theme.colors.white};
    margin-top: 8px;

    &::placeholder {
        color: ${({ theme }) => theme.colors.primary_60};
    }
`;

const Textarea = styled.textarea`
    width: 100%;
    min-height: 87px;
    padding: 11px 12px;
    ${({ theme }) => theme.mixins.flexBox()};
    ${({ theme }) => theme.fonts.b3_14_reg};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.primary_20};
    background: ${({ theme }) => theme.colors.white};
    margin-top: 8px;
    resize: vertical;

    &::placeholder {
        color: ${({ theme }) => theme.colors.primary_60};
    }
`;

const ExampleBox = styled.div<{ height?: string }>`
    width: 100%;
    min-height: ${({ height }) => (height ? height : 0)};
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.G_50};
    padding: 11px 12px;
    ${({ theme }) => theme.fonts.b3_14_reg};
    color: ${({ theme }) => theme.colors.G_300};
`;
