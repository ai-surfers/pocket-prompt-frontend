// MyPage.tsx
import styled from "styled-components";
import { Card, Button, Table, Typography, Space } from "antd";
import { Wrapper } from "@/layouts/Layout";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useGetPaymetns } from "@/hooks/queries/payments/useGetPayments";
import { usePutPayments } from "@/hooks/mutations/payments/usePutPayments";
import * as Sentry from "@sentry/react";

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
    const { resetUserState } = useUser();
    const navigate = useNavigate();

    function handleLogout() {
        window.localStorage.removeItem("ACCESS_TOKEN");
        resetUserState();
        navigate("/", { replace: true });
    }

    const { mutate: unsubscription } = usePutPayments({
        onSuccess(res) {
            alert("구독이 성공적으로 취소되었습니다.");
            console.log(">> 구독 취소 성공", res);
        },
        onError(e) {
            alert(e.message);
            console.error(">> 구독 취소 실패", e);
        },
    });

    function handleUnsubscription() {
        if (confirm("구독을 취소하시겠습니까?")) {
            console.log("yes");
            unsubscription();
        }
    }

    const { data } = useGetPaymetns();

    function throwError() {
        try {
            throw new Error("커스텀 에러 발생, 센트리 에러 테스트");
        } catch (error) {
            Sentry.captureException(error);
        }
    }
    console.log(">> data", data);
    return (
        <Container>
            <Wrapper>
                <Title
                    level={2}
                    style={{ marginBottom: "20px" }}
                    onClick={throwError}
                >
                    구독 관리
                </Title>
                <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                >
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
                            <Text>
                                청구 주소: 서울특별시 강남구 테헤란로 123
                            </Text>
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

                    <CancelButton
                        type="primary"
                        danger
                        onClick={handleUnsubscription}
                    >
                        구독 취소
                    </CancelButton>

                    <CancelButton onClick={handleLogout}>로그아웃</CancelButton>
                </Space>
            </Wrapper>
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
