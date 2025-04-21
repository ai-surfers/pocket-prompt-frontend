import styled from "styled-components";
import Text from "@/components/common/Text/Text";
import QnAToggle from "@/components/common/QnAToggle.tsx/QnAToggle";

interface FAQItem {
    key: string;
    label: string;
    children: React.ReactNode;
}

const FAQ_ITEMS: FAQItem[] = [
    {
        key: "1",
        label: "여러 플랜을 동시에 구매할 수 있나요?",
        children: (
            <p>
                아니요, 한 번에 하나의 플랜만 구독할 수 있습니다. 필요에 따라
                언제든지 플랜을 변경할 수 있습니다.
            </p>
        ),
    },
    {
        key: "2",
        label: "할인을 받을 수 있나요?",
        children: (
            <p>
                연간 구독 시 2개월 무료 혜택을 제공하고 있습니다. 교육기관의
                경우 추가 할인이 가능할 수 있으니 문의해 주세요.
            </p>
        ),
    },
    {
        key: "3",
        label: "모델 횟수만 채울 수 있는 방법은 없나요?",
        children: (
            <p>
                유료 플랜을 구독했지만 횟수를 전부 소진하셨다면 메일로 문의해
                주세요.
            </p>
        ),
    },
    {
        key: "4",
        label: "AI 모델마다 어떤 차이가 있나요?",
        children: (
            <p>
                GPT: 다재다능 만능형 | Claude: 뛰어난 글 작가 | Perplexity:
                리서칭 만렙
            </p>
        ),
    },
    {
        key: "5",
        label: "Private 프롬프트와 저장한 프롬프트가 무엇인가요?",
        children: (
            <p>
                Private 프롬프트는 다른 사용자와 공유되지 않는, 나만 사용할 수
                있는 개인용 프롬프트를 의미합니다. 저장한 프롬프트는 자주
                사용하는 프롬프트를 따로 보관해두는 기능입니다.
            </p>
        ),
    },
];

export default function FAQ() {
    return (
        <Frame>
            <Text
                font="h1_24_bold"
                color="G_800"
                style={{ marginBottom: "12px" }}
            >
                자주 묻는 질문
            </Text>
            <FAQFrame>
                {FAQ_ITEMS.map((faq) => (
                    <QnAToggle
                        id={`plan-card-${faq.key}`}
                        key={faq.key}
                        question={faq.label}
                        answer={faq.children}
                    />
                ))}
            </FAQFrame>
        </Frame>
    );
}

const Frame = styled.div`
    width: 100%;
`;

const FAQFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;
