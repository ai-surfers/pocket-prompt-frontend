import React from "react";
import styled from "styled-components";
import { Typography } from "antd";
import FAQ from "../../components/price/FAQ";
import Explain from "../../components/price/Explain";
import Footer from "../../components/price/Footer";
import Plan from "../../components/price/Plan";

const { Title, Text } = Typography;

const PricePage: React.FC = () => {
    return (
        <PricePageContainer>
            <Title level={3}>당신의 생산성을 위한 최고의 AI 도구 패키지</Title>
            <Title level={5}>생성형 AI와 함께하는 포켓 프롬프트</Title>

            <Labeled>
                <Text>연간 구독 시 2개월 무료!</Text>
            </Labeled>

            <Plan />

            <Explain />

            <FAQ />

            <Footer />
        </PricePageContainer>
    );
};

export default PricePage;

const PricePageContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
    padding: 50px 40px;
    max-width: 1080px;
    margin: 0 auto;
`;

const Labeled = styled.div`
    width: 100%;
    background: #fadb14;
    border-radius: 10px;
    padding: 5px 0;
    ${({ theme }) => theme.mixins.flexBox()};

    margin-top: 5px;
`;
