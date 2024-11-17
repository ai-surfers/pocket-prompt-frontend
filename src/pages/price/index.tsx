import React from "react";
import styled from "styled-components";
import { Wrapper } from "@/layouts/Layout";
import Plan from "@/pages/price/components/Plan/Plan";
import FAQ from "@/pages/price/components/FAQ";
import Footer from "@/pages/price/components/Footer";
import Text from "@/components/common/Text/Text";

const PricePage: React.FC = () => {
    return (
        <PricePageContainer>
            <PricePageWrapper>
                <Text
                    font="xlarge_36_bold"
                    color="G_800"
                    style={{
                        textAlign: "center",
                        marginBottom: "8px",
                    }}
                >
                    당신의 생산성을 위한
                    <br /> 최고의 AI 도구 패키지
                </Text>
                <Text
                    font="b1_18_reg"
                    color="G_400"
                    style={{ textAlign: "center" }}
                >
                    AI 통계에 따르면, AI를 도입한 기업 중 약 3분의 1(59%)이 비용
                    절감과 생산성 향상을 경험했다고 합니다.
                    <br /> 포켓 프롬프트와 함께라면 모든 예산에 맞는 플랜을 찾을
                    수 있습니다.
                    <br /> 우리의 생산성 도구와 점점 더 늘어나는 프롬프트
                    라이브러리의 모든 힘을 활용해보세요.
                </Text>
                <Plan />
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
