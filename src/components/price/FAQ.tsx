import { Collapse } from "antd";
import styled from "styled-components";

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
        label: "더 큰 플랜으로 업그레이드할 수 있나요?",
        children: (
            <p>
                언제든지 더 높은 플랜으로 업그레이드가 가능합니다. 남은 구독
                기간에 대해 비례 계산된 금액만 추가로 지불하시면 됩니다.
            </p>
        ),
    },
    {
        key: "4",
        label: "작은 플랜으로 다운그레이드할 수 있나요?",
        children: (
            <p>
                현재 구독 기간이 끝난 후 다음 갱신 시점부터 작은 플랜으로 변경이
                가능합니다. 고객 지원팀에 문의해 주시면 도와드리겠습니다.
            </p>
        ),
    },
];

export default function FAQ() {
    return <StyledCollapse items={FAQ_ITEMS} />;
}

const StyledCollapse = styled(Collapse)`
    width: 100%;
    margin-bottom: 20px;
    font-size: 14px;
`;
