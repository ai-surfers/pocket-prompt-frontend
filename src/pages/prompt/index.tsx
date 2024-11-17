import { TopSection } from "@/pages/prompt/components/TopSection";
import { ExecuteSection } from "@/pages/prompt/components/ExecuteSection";
import { ResultSection } from "@/pages/prompt/components/ResultSection";
import { Flex } from "antd";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import usePromptQuery from "@/hooks/queries/prompts/usePromptQuery";

export default function PromptPage() {
    const { promptId } = useParams<{ promptId: string }>();
    const { data, isLoading } = usePromptQuery(promptId ?? "");

    console.log("promptID", promptId, data);

    const handleOnSelect = (value: string) => {
        alert(`${value} is Selected!`);
    };

    return (
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
