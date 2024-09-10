import React from "react";
import styled from "styled-components";
import { Typography } from "antd";
import FAQ from "../../components/price/FAQ";
import Explain from "../../components/price/Explain";
import Footer from "../../components/price/Footer";
import Plan from "../../components/price/Plan/Plan";
import { Wrapper } from "@/layouts/Layout";

const { Title, Text } = Typography;

const PricePage: React.FC = () => {
    return (
        <PricePageContainer>
            <PricePageWrapper>
                <Title level={1} style={{ fontWeight: 700 }}>
                    당신의 생산성을 위한 최고의 AI 도구 패키지
                </Title>
                <Title level={4}>생성형 AI와 함께하는 포켓 프롬프트</Title>

                <Labeled>
                    <Text style={{ fontSize: "18px" }}>
                        연간 구독 시 2개월 무료!
                    </Text>
                </Labeled>

                <Plan />

                <Explain />

                <FAQ />

                <Footer />
            </PricePageWrapper>
        </PricePageContainer>
    );
};

export default PricePage;

const PricePageContainer = styled.div`
    padding: 50px 40px;
    width: 100vw;
    background-color: #f9f9f9;
`;

const PricePageWrapper = styled(Wrapper)`
    max-width: 1280px;
    ${({ theme }) => theme.mixins.flexBox("column")};
`;

const Labeled = styled.div`
    width: 100%;
    background: #fadb14;
    border-radius: 10px;
    padding: 10px 0;
    ${({ theme }) => theme.mixins.flexBox()};

    margin-top: 10px;
`;
