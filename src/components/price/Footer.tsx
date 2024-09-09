import { Typography } from "antd";
import styled from "styled-components";
const { Text } = Typography;

export default function Footer() {
    return (
        <FooterText type="secondary">
            모든 가격은 원화로 표시되며, 부가가치세는 별도입니다. 모든 판매는
            환불이 불가능합니다. 프리미엄 제품 구매 결정 전 무료버전을
            무제한으로 테스트해볼 수 있습니다. 모든 가격은 당사 약관에 따라
            변동될 수 있습니다. 모든 서비스는 포켓 프롬프트 주식회사(대한민국)에
            의해 제공되며, 구매 시 확인된 이용약관 및 결제 동의에 따릅니다.
        </FooterText>
    );
}

const FooterText = styled(Text)`
    font-size: 12px;
    text-align: center;
`;
