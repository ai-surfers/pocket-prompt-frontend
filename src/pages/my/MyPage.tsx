// MyPage.tsx
import styled from "styled-components";
import { Card, Button, Table, Typography, Space } from "antd";

const { Title, Text } = Typography;

const dataSource = [
    {
        key: "1",
        date: "2024-08-01",
        description: "월 구독료 (Plus)",
        amount: "₩3,900",
    },
    {
        key: "2",
        date: "2024-07-01",
        description: "월 구독료 (Plus)",
        amount: "₩3,900",
    },
];

const columns = [
    {
        title: "날짜",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "설명",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "금액",
        dataIndex: "amount",
        key: "amount",
    },
];

export default function MyPage() {
    return (
        <Container>
            <Title level={2} style={{ marginBottom: "20px" }}>
                구독 관리
            </Title>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <Card>
                    <SectionTitle>현재 구독 정보</SectionTitle>
                    <Space direction="vertical">
                        <Text>플랜: 포켓 프롬프트 Plus</Text>
                        <Text>가격: ₩3,900/월</Text>
                        <Text>다음 청구일: 2024년 9월 1일</Text>
                        <Text>상태: 활성</Text>
                        <Button type="primary">플랜 변경</Button>
                    </Space>
                </Card>

                <Card>
                    <SectionTitle>결제 정보</SectionTitle>
                    <Space direction="vertical">
                        <Text>결제 방법: 신용카드 (1234)</Text>
                        <Text>청구 주소: 서울특별시 강남구 테헤란로 123</Text>
                        <Button type="default">결제 정보 수정</Button>
                    </Space>
                </Card>

                <Card>
                    <SectionTitle>구독 이력</SectionTitle>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                    />
                </Card>

                <CancelButton type="primary" danger>
                    구독 취소
                </CancelButton>
            </Space>
        </Container>
    );
}

// Styled Components
const Container = styled.div`
    width: 100vw;
    padding: 50px 40px;
    background-color: #f0f2f5;
`;

const SectionTitle = styled(Title).attrs({ level: 4 })`
    margin-bottom: 20px;
`;

const CancelButton = styled(Button)`
    height: 50px;
    font-size: 16px;
`;
