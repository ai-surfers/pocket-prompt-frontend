import styled from "styled-components";
import Text from "@/components/common/Text/Text";

export default function Footer() {
    return (
        <FooterText font="c1_12_reg" color="G_400">
            모든 가격은 원화로 표시되며, 환불은 서비스 이용약관에 따라
            진행됩니다.
            <br />
            프리미엄 제품 구매 결정 전 무료버전을 무제한으로 테스트해볼 수
            있습니다. 모든 가격은 당사 약관에 따라 변동될 수 있습니다.
            <br />
            모든 서비스는 레코듀(대한민국)에 의해 제공되며, 구매 시 확인된
            이용약관 및 결제 동의에 따릅니다.
            <br />
        </FooterText>
    );
}

const FooterText = styled(Text)`
    margin-top: 40px;
    width: 100%;
`;
