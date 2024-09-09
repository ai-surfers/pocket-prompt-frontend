import { Typography } from "antd";
import styled from "styled-components";

const { Text } = Typography;
export default function Explain() {
    return (
        <ExplainSection>
            <Text>
                AI 통계에 따르면, AI를 도입한 기업 중 약 3분의 1(59%)이 비용
                절감과 생산성 향상을 경험했다고 합니다.
            </Text>
            <Text>
                포켓 프롬프트와 함께라면 모든 예산에 맞는 플랜을 찾을 수
                있습니다.
            </Text>
            <Text>
                우리의 생산성 도구와 점점 더 늘어나는 프롬프트 라이브러리의 모든
                힘을 활용해보세요.
            </Text>
        </ExplainSection>
    );
}

const ExplainSection = styled.section`
    width: 100%;
    ${({ theme }) => theme.mixins.flexBox("column", "center", "flex-start")};
    gap: 10px;
    margin-bottom: 40px;
`;
