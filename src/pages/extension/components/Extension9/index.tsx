import { qnaData } from "./qnaData";
import QnAToggle from "./QnAToggle";
import { AddtionalText, Extension9Container, Title } from "./styles";
const Extension9 = () => {
    return (
        <Extension9Container>
            <Title>자주 묻는 질문</Title>
            {qnaData.map((data, index) => (
                <QnAToggle
                    key={index}
                    question={data.question}
                    answer={data.answer}
                />
            ))}
            <AddtionalText>
                모든 가격은 원화로 표시되며, 부가가치세는 별도입니다. 모든
                판매는 환불이 불가능합니다.
                <br />
                프리미엄 플랜 구매 결정 전 무료버전을 테스트해볼 수 있습니다.
                모든 가격은 당사 약관에 따라 변동될 수 있습니다.
                <br />
                모든 서비스는 포켓 프롬프트 주식회사(대한민국)에 의해 제공되며,
                구매 시 확인된 이용약관 및 결제 동의에 따릅니다.
                <br />
            </AddtionalText>
        </Extension9Container>
    );
};

export default Extension9;
