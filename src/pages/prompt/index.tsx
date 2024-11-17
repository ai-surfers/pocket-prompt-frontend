import { TopSection } from "@/pages/prompt/components/TopSection";
import { ExecuteSection } from "@/pages/prompt/components/ExecuteSection";
import { ResultSection } from "@/pages/prompt/components/ResultSection";
import { Flex, Result, Spin } from "antd";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import usePromptQuery from "@/hooks/queries/prompts/usePromptQuery";
import { ErrorBoundary } from "@sentry/react";
import { Wrapper } from "@/layouts/Layout";

export default function PromptPage() {
    const { promptId } = useParams<{ promptId: string }>();
    const { data, isLoading, isError } = usePromptQuery(promptId ?? "");

    const handleOnSelect = (value: string) => {
        alert(`${value} is Selected!`);
    };

    if (isLoading) {
        return (
            <Wrapper>
                <Flex
                    style={{
                        width: "100vw",
                        height: "100vh",
                    }}
                    justify="center"
                    align="center"
                >
                    <Spin size="large" />
                </Flex>
            </Wrapper>
        );
    }

    if (isError) {
        return (
            <Wrapper>
                <Flex
                    style={{
                        width: "100vw",
                        height: "100vh",
                    }}
                    justify="center"
                    align="center"
                >
                    <Result
                        status="warning"
                        title="존재하지 않는 프롬프트입니다."
                    />
                </Flex>
            </Wrapper>
        );
    }

    return (
        <ErrorBoundary>
            <Container>
                {data && <TopSection prompt={data} />}

                {/* 하단 */}
                <BodySection wrap gap={16}>
                    {/* 프롬프트 사용하기 */}
                    <BoxContainer>
                        <ExecuteSection
                            onSelect={handleOnSelect}
                            inputs={data?.user_input_format || []}
                            template={data?.prompt_template || ""}
                        />
                    </BoxContainer>

                    {/* 포켓런 결과 */}
                    <BoxContainer>
                        <ResultSection />
                    </BoxContainer>
                </BodySection>
            </Container>
        </ErrorBoundary>
    );
}

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.G_50};

    .ant-select-selector {
        border-radius: 12px;
    }
`;

const BodySection = styled(Flex)`
    margin: 0 auto;

    max-width: 1240px;
    padding: 40px 80px 20px;
`;

const BoxContainer = styled.div`
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 20px;

    @media (min-width: 1080px) {
        &:nth-child(1) {
            flex: 3;
        }
        &:nth-child(2) {
            flex: 7;
        }
    }

    @media (max-width: 1080px) {
        width: 100%;
    }
`;
