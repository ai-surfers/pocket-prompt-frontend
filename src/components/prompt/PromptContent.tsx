"use client";

import DetailPageSiderBar from "@/components/home/siderbarAd/DetailPageSiderBar";
import { Wrapper } from "@/components/layout/LayoutClient";
import { ExecuteSection } from "@/components/prompt/ExecuteSection";
import { ResultSection } from "@/components/prompt/ResultSection";
import { TopSection } from "@/components/prompt/TopSection";
import usePromptQuery from "@/hooks/queries/prompts/usePromptQuery";
import { prevPathState } from "@/states/navigationState";
import { useDeviceSize } from "@components/DeviceContext";
import { ErrorBoundary } from "@sentry/react";
import { Flex, Result, Spin } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

export default function PromptContent({
    promptType,
    promptId,
}: {
    promptType: "text" | "image";
    promptId: string;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { data, isLoading, isError } = usePromptQuery(promptId);
    const { isUnderTablet, isMobile } = useDeviceSize();
    const setPrevPathname = useSetRecoilState(prevPathState);

    useEffect(() => {
        // 쿼리 파라미터를 포함한 전체 URL 저장
        const fullPath = `${pathname}${
            searchParams.toString() ? `?${searchParams.toString()}` : ""
        }`;
        setPrevPathname(fullPath);
    }, [pathname, searchParams, setPrevPathname]);

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
                <BodySection $isMobile={isMobile}>
                    {/* 프롬프트 사용하기 */}
                    <BoxContainer>
                        <ExecuteSection
                            promptType={promptType}
                            onSelect={handleOnSelect}
                            inputs={data?.user_input_format || []}
                            template={data?.prompt_template || ""}
                            promptId={promptId}
                        />
                    </BoxContainer>

                    {/* 포켓런 결과 */}
                    <BoxContainer>
                        <ResultSection promptType={promptType} />
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

const BodySection = styled.div<{ $isMobile: boolean }>`
    ${({ theme }) => theme.mixins.flexBox("row", "start", "start")};
    margin: 0 auto;
    max-width: 1240px;
    padding: ${({ $isMobile }) =>
        $isMobile ? "40px 20px 20px 20px" : "40px 80px 20px"};
    flex-wrap: wrap;
    gap: 16px;
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
