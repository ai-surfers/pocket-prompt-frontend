import { Collapse } from "antd";
import styled from "styled-components";

interface FAQItem {
    key: string;
    label: string;
    children: React.ReactNode;
}

const FAQ_TEXT = "아니오아니오아니오아니오";
const FAQ_ITEMS: FAQItem[] = [
    {
        key: "1",
        label: "여러 플랜을 동시에 구매할 수 있나요?",
        children: <p>{FAQ_TEXT}</p>,
    },
    { key: "2", label: "할인을 받을 수 있나요?", children: <p>{FAQ_TEXT}</p> },
    {
        key: "3",
        label: "더 큰 플랜으로 업그레이드할 수 있나요?",
        children: <p>{FAQ_TEXT}</p>,
    },
    {
        key: "4",
        label: "작은 플랜으로 다운그레이드할 수 있나요?",
        children: <p>{FAQ_TEXT}</p>,
    },
];

export default function FAQ() {
    return <StyledCollapse items={FAQ_ITEMS} />;
}

const StyledCollapse = styled(Collapse)`
    width: 100%;
    margin-bottom: 20px;
`;
