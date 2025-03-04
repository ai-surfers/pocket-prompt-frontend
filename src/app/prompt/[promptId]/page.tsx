"use client";

import { TopSection } from "@/components/prompt/TopSection";
import { ExecuteSection } from "@/components/prompt/ExecuteSection";
import { ResultSection } from "@/components/prompt/ResultSection";
import { Flex, Result, Spin } from "antd";
import styled from "styled-components";
import usePromptQuery from "@/hooks/queries/prompts/usePromptQuery";
import { ErrorBoundary } from "@sentry/react";
import { Wrapper } from "@/components/layout/LayoutClient";
import useDeviceSize from "@/hooks/useDeviceSize";
import DetailPageSiderBar from "@/components/home/siderbarAd/DetailPageSiderBar";

interface PromptPageProps {
    params: { promptId: string };
}

export default function PromptPage({ params }: PromptPageProps) {
    const { promptId } = params;
    const { data, isLoading, isError } = usePromptQuery(promptId ?? "");
    const { isUnderTablet, isMobile } = useDeviceSize();

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
            {/* <MetaTags
                url={`https://pocket-prompt.com/prompt/${promptId}`}
                title={data?.title}
                description={data?.description}
            /> */}
            <Container>
                {data && <TopSection prompt={data} />}
                {/* 하단 */}
                <BodySection wrap gap={16} $isMobile={isMobile}>
                    {/* 프롬프트 사용하기 */}
                    <BoxContainer>
                        <ExecuteSection
                            onSelect={handleOnSelect}
                            inputs={data?.user_input_format || []}
                            template={data?.prompt_template || ""}
                            promptId={promptId}
                        />
                    </BoxContainer>

                    {/* 포켓런 결과 */}
                    <BoxContainer>
                        <ResultSection />
                    </BoxContainer>

                    <AdContainer $isUnderTablet={isUnderTablet}>
                        <DetailPageSiderBar />
                    </AdContainer>
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

const BodySection = styled(Flex)<{ $isMobile: boolean }>`
    margin: 0 auto;
    max-width: 1240px;
    padding: ${({ $isMobile }) =>
        $isMobile ? "40px 20px 20px 20px" : "40px 80px 20px"};
`;

const BoxContainer = styled.div`
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 20px;

    @media (min-width: 1080px) {
        &:nth-child(1) {
            flex: 3.5;
        }
        &:nth-child(2) {
            flex: 6.5;
        }
    }

    @media (max-width: 1080px) {
        width: 100%;
    }

    height: fit-content;
`;

const AdContainer = styled.div<{ $isUnderTablet: boolean }>`
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.white};
    height: fit-content;
    display: ${({ $isUnderTablet }) => ($isUnderTablet ? "none" : "block")};
`;
