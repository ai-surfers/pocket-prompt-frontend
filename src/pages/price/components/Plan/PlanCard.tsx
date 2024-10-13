import React from "react";
import styled from "styled-components";
import { Button, Card, Space, Typography } from "antd";
const { Title, Text } = Typography;

interface PlanCardProps {
    title: string;
    price: string;
    period: string;
    features: string[];
    buttonLabel: string;
    onClick: () => void;
}

export default function PlanCard({
    title,
    price,
    period,
    features,
    buttonLabel,
    onClick,
}: PlanCardProps) {
    return (
        <StyledCard hoverable>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <Title level={5}>{title}</Title>
                <Text>
                    <PriceText>{price}</PriceText>/{period}
                </Text>
                <StartButton type="primary" onClick={onClick}>
                    {buttonLabel}
                </StartButton>
                <FeatureList features={features} />
            </Space>
        </StyledCard>
    );
}

const FeatureList: React.FC<{ features: string[] }> = ({ features }) => (
    <TextContainer>
        {features.map((feature, index) => (
            <Text key={index}>✅ {feature}</Text>
        ))}
    </TextContainer>
);

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
