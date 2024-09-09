import styled from "styled-components";
import { Button, Card, Space, Segmented, Typography } from "antd";
import { useState } from "react";
const { Title, Text } = Typography;

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

export default function Plan() {
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
    );
}

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

const AnimatedCard = styled.div`
    ${({ theme }) => theme.mixins.slideUpWFadeIn()};
`;
