import React from "react";
import styled, { css } from "styled-components";
import { Button, Card, Flex } from "antd";
import Text from "@/components/common/Text/Text";
import CheckBox from "@svg/extension/CheckBox";

interface FeaturesType {
    title?: string;
    subtitle?: string;
    detail?: string;
}

interface PlanCardProps {
    id: string;
    title: string;
    price: string;
    period: string;
    features: FeaturesType[];
    buttonLabel: string;
    isHighlight: boolean;
    onClick: () => void;
}

export default function PlanCard({
    title,
    price,
    period,
    features,
    buttonLabel,
    isHighlight,
    onClick,
}: PlanCardProps) {
    console.log(features);
    return (
        <StyledCard isHighlight={isHighlight}>
            <Frame>
                <div>
                    <Text
                        font="b1_18_med"
                        color="G_800"
                        style={{
                            textAlign: "center",
                            marginBottom: "4px",
                        }}
                    >
                        {title}
                    </Text>
                    <PriceText font="b2_16_reg" color="G_400">
                        <PriceTextSpan>{price}</PriceTextSpan>/{period}
                    </PriceText>
                    <Divider />
                    <FeatureList features={features} />
                </div>
                <StartButton type="primary" onClick={onClick}>
                    {buttonLabel}
                </StartButton>
            </Frame>
        </StyledCard>
    );
}

const FeatureList: React.FC<{ features: FeaturesType[] }> = ({ features }) => (
    <TextContainer>
        {features.map((feature, index) => (
            <Flex
                justify="start"
                align="center"
                gap={12}
                style={{
                    padding: "8px",
                    backgroundColor: "var(--gray-50, #F7F8F9)",
                    borderRadius: "8px",
                }}
                key={index}
            >
                <CheckBox />
                <Flex vertical>
                    <Text
                        font="b3_14_bold"
                        color="G_500"
                        style={{
                            display: "flex",
                            alignItems: "start",
                            gap: "8px",
                        }}
                    >
                        {feature.title}
                    </Text>
                    <Text
                        font="b3_14_med"
                        color="G_500"
                        style={{
                            display: "flex",
                            alignItems: "start",
                            gap: "8px",
                        }}
                    >
                        {feature.subtitle}
                    </Text>
                    <Text
                        font="c1_12_reg"
                        color="G_400"
                        style={{
                            display: "flex",
                            alignItems: "start",
                            gap: "8px",
                        }}
                    >
                        {feature.detail}
                    </Text>
                </Flex>
            </Flex>
        ))}
    </TextContainer>
);

const StyledCard = styled(Card)<Pick<PlanCardProps, "isHighlight">>`
    width: 300px;
    height: 100%;
    border-radius: 8px;
    transition: border-color 0.3s, box-shadow 0.3s;

    & .ant-card-body {
        height: 100%;
    }

    ${({ isHighlight, theme }) =>
        isHighlight &&
        css`
            border: 1.5px solid ${theme.colors.primary_50};
            box-shadow: 0px 0px 64px 0px rgba(117, 128, 234, 0.12);
        `}
`;

const Frame = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const StartButton = styled(Button)`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 20px 0;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 28px;
`;

const PriceText = styled(Text)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
`;

const PriceTextSpan = styled.span`
    text-align: right;
    font-family: Pretendard;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 144%; /* 46.08px */
    letter-spacing: -0.64px;
    color: ${({ theme }) => theme.colors.G_800};
`;

const Divider = styled.div`
    height: 1.5px;
    background-color: ${({ theme }) => theme.colors.G_200};
    margin: 24px 44px 16px;
`;
