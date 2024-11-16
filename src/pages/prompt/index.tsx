import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import { Wrapper } from "@/layouts/Layout";
import { Flex } from "antd";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function PromptPage() {
    const { promptId } = useParams<{ promptId: string }>();
    console.log("promptID", promptId);

    return (
        <Container>
            <TopContainer>
                <Wrapper>
                    <Text font="h1_24_semi">파워포인트 작성 치트키</Text>
                    <Text font="b1_18_reg" color="G_400">
                        주제와 청중을 입력하면 근사한 파워포인트 초안을
                        만들어주는 프롬프트
                    </Text>

                    <InformationContainer>
                        <ChipContainer>
                            <Button size={56}>생산성</Button>
                        </ChipContainer>
                    </InformationContainer>
                </Wrapper>
            </TopContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.G_50};
`;

const TopContainer = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 40px 80px 32px;
`;

const InformationContainer = styled(Flex)``;
const ChipContainer = styled.div``;
