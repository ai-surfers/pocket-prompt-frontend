import React, { useState } from "react";
import styled from "styled-components";
import { Button, Card, Collapse, Space, Segmented, Typography } from "antd";

const { Title, Text } = Typography;

// FAQ 항목에 대한 타입 정의
interface FAQItem {
    key: string;
    label: string;
    children: React.ReactNode;
}

const FAQ_TEXT = "아니오아니오아니오아니오";
const FAQ_ITEMS: FAQItem[] = [
    {
        key: "1",
        label: "여러 플랜을 동시에 구매할 수 있나요?",
        children: <p>{FAQ_TEXT}</p>,
    },
    { key: "2", label: "할인을 받을 수 있나요?", children: <p>{FAQ_TEXT}</p> },
    {
        key: "3",
        label: "더 큰 플랜으로 업그레이드할 수 있나요?",
        children: <p>{FAQ_TEXT}</p>,
    },
    {
        key: "4",
        label: "작은 플랜으로 다운그레이드할 수 있나요?",
        children: <p>{FAQ_TEXT}</p>,
    },
];

// PlanCard 컴포넌트의 props 타입 정의
interface PlanCardProps {
    title: string;
    price: string;
    period: string;
    features: string[];
    buttonLabel: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
    title,
    price,
    period,
    features,
    buttonLabel,
}) => (
    <StyledCard hoverable>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Title level={5}>{title}</Title>
            <Text>
                <PriceText>{price}</PriceText>/{period}
            </Text>
            <StartButton type="primary">{buttonLabel}</StartButton>
            <FeatureList features={features} />
        </Space>
    </StyledCard>
);

const FeatureList: React.FC<{ features: string[] }> = ({ features }) => (
    <TextContainer>
        {features.map((feature, index) => (
            <Text key={index}>✅ {feature}</Text>
        ))}
    </TextContainer>
);

const PricePage: React.FC = () => {
    const [billingCycle, setBillingCycle] = useState("연간");

    const prices = {
        free: "₩0",
        plus: billingCycle === "연간" ? "₩3,900" : "₩4,500",
        pro: billingCycle === "연간" ? "₩9,900" : "₩11,000",
    };

    const handleCycleChange = (value: string) => {
        setBillingCycle(value);
    };

    return (
        <PricePageContainer>
            <Title level={3}>당신의 생산성을 위한 최고의 AI 도구 패키지</Title>
            <Title level={5}>생성형 AI와 함께하는 포켓 프롬프트</Title>

            <Labeled>
                <Text>연간 구독 시 2개월 무료!</Text>
            </Labeled>

            <PlanContainer>
                <Segmented
                    onChange={handleCycleChange}
                    options={["연간", "월간"]}
                />

                <CardGrid>
                    <AnimatedCard>
                        <PlanCard
                            title="포켓 프롬프트 Free"
                            price={prices.free}
                            period={billingCycle === "연간" ? "년" : "월"}
                            features={[
                                "Private 프롬프트 5개",
                                "Favorite 프롬프트 10개",
                            ]}
                            buttonLabel="시작하기"
                        />
                    </AnimatedCard>
                    <AnimatedCard>
                        <PlanCard
                            title="포켓 프롬프트 Plus"
                            price={prices.plus}
                            period={billingCycle === "연간" ? "년" : "월"}
                            features={[
                                "광고 제거",
                                "Private 프롬프트 10개",
                                "Favorite 프롬프트 30개",
                            ]}
                            buttonLabel="시작하기"
                        />
                    </AnimatedCard>
                    <AnimatedCard>
                        <PlanCard
                            title="포켓 프롬프트 Pro"
                            price={prices.pro}
                            period={billingCycle === "연간" ? "년" : "월"}
                            features={[
                                "광고 제거",
                                "Private 프롬프트 무제한",
                                "Favorite 프롬프트 무제한",
                            ]}
                            buttonLabel="시작하기"
                        />
                    </AnimatedCard>
                </CardGrid>

                <Text>예산에 구애받지 마세요, 창의성을 발휘하세요!</Text>
            </PlanContainer>

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
                    우리의 생산성 도구와 점점 더 늘어나는 프롬프트 라이브러리의
                    모든 힘을 활용해보세요.
                </Text>
            </ExplainSection>

            <StyledCollapse items={FAQ_ITEMS} />

            <FooterText type="secondary">
                모든 가격은 원화로 표시되며, 부가가치세는 별도입니다. 모든
                판매는 환불이 불가능합니다. 프리미엄 제품 구매 결정 전
                무료버전을 무제한으로 테스트해볼 수 있습니다. 모든 가격은 당사
                약관에 따라 변동될 수 있습니다. 모든 서비스는 포켓 프롬프트
                주식회사(대한민국)에 의해 제공되며, 구매 시 확인된 이용약관 및
                결제 동의에 따릅니다.
            </FooterText>
        </PricePageContainer>
    );
};

export default PricePage;

// Styled Components
const PricePageContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
    padding: 50px 40px;
`;

const Labeled = styled.div`
    width: 100%;
    background: #fadb14;
    border-radius: 10px;
    padding: 5px 0;
    ${({ theme }) => theme.mixins.flexBox()};

    margin-top: 5px;
`;

const PlanContainer = styled.section`
    ${({ theme }) => theme.mixins.flexBox("column")};
    gap: 20px;
    margin: 40px 0;
`;

const CardGrid = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
`;

const StyledCard = styled(Card)`
    width: 300px;
    height: 100%;
    border-radius: 8px;
    transition: border-color 0.3s, box-shadow 0.3s;

    &:hover {
        border-color: #2db7f5;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    }
`;

const PriceText = styled(Text)`
    font-size: 24px;
    font-weight: bold;
`;

const StartButton = styled(Button)`
    width: 100%;
    background-color: #2db7f5;
    padding: 20px 0;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const ExplainSection = styled.section`
    width: 100%;
    ${({ theme }) => theme.mixins.flexBox("column", "center", "flex-start")};
    gap: 10px;
    margin-bottom: 40px;
`;

const StyledCollapse = styled(Collapse)`
    width: 100%;
    margin-bottom: 20px;
`;

const FooterText = styled(Text)`
    font-size: 12px;
    text-align: center;
`;

const AnimatedCard = styled.div`
    ${({ theme }) => theme.mixins.slideUpWFadeIn()};
`;
