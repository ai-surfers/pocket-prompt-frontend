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
                    너무 복잡해진 AI..
                    <br /> 이제 포켓 프롬프트 하나로 해결하세요 😎
                </Text>
                <Text
                    font="b1_18_reg"
                    color="G_400"
                    style={{ textAlign: "center" }}
                >
                    우후죽순 늘어나는 AI 플랫폼, 이제 돌아다니지 마세요.
                    <br />
                    포켓 프롬프트가 AI 서비스를 하나로 모아 여러분의
                    시간을아껴드릴게요!
                    <br />
                    여기에 익스텐션으로 생산성까지 챙겨가세요✨
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
