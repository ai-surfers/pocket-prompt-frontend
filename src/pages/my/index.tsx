// MyPage.tsx
import styled from "styled-components";
import { Card, Table, Space } from "antd";
import { Wrapper } from "@/layouts/Layout";
import { useGetSubscription } from "@/hooks/queries/payments/useGetSubscription";
import { usePutPayments } from "@/hooks/mutations/payments/usePutPayments";
// import * as Sentry from "@sentry/react";

import Text from "@/components/common/Text/Text";
import Button from "@/components/common/Button/Button";
import { useGetCardInfo } from "@/hooks/queries/payments/useGetCardInfo";

const SUBSCRIPTION_STATUS = {
    active: "활성",
    inactive: "비활성",
};

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

    const { data: subscriptionData } = useGetSubscription();
    const { data: cardInfoData } = useGetCardInfo();

    const dataSource =
        subscriptionData?.payment_list_data.payment_document_list;

    // function throwError() {
    //     try {
    //         throw new Error("커스텀 에러 발생, 센트리 에러 테스트");
    //     } catch (error) {
    //         Sentry.captureException(error);
    //     }
    // }

    return (
        <Container>
            <Wrapper>
                <Text font="h1_24_bold" style={{ marginBottom: "20px" }}>
                    구독 관리
                </Text>
                <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                >
                    <Card>
                        <TitleWrapper>
                            <Text font="b1_18_bold">현재 구독 정보</Text>
                            <Button
                                hierarchy="normal"
                                width="132px"
                                size={44}
                                style={{ justifyContent: "center" }}
                            >
                                플랜 변경
                            </Button>
                        </TitleWrapper>
                        <ContentWrapper>
                            <TextWrapper>
                                <Text font="b2_16_reg" color="G_500">
                                    플랜
                                </Text>
                                <Text font="b2_16_reg" color="G_500">
                                    가격
                                </Text>
                                <Text font="b2_16_reg" color="G_500">
                                    다음 갱신일
                                </Text>
                                <Text font="b2_16_reg" color="G_500">
                                    상태
                                </Text>
                            </TextWrapper>
                            <TextWrapper>
                                <Text font="b2_16_semi" color="G_600">
                                    {subscriptionData?.plan}
                                </Text>
                                <Text font="b2_16_semi" color="G_600">
                                    {subscriptionData?.price}
                                </Text>
                                <Text font="b2_16_semi" color="G_600">
                                    {subscriptionData?.next_pay}
                                </Text>
                                <Chip>
                                    <Text font="b3_14_med" color="blue">
                                        {
                                            SUBSCRIPTION_STATUS[
                                                (subscriptionData?.subscription_status ??
                                                    "inactive") as
                                                    | "active"
                                                    | "inactive"
                                            ]
                                        }
                                    </Text>
                                </Chip>
                            </TextWrapper>
                        </ContentWrapper>
                    </Card>

                    <Card>
                        <TitleWrapper>
                            <Text font="b1_18_bold">결제 정보</Text>
                            <Button
                                hierarchy="normal"
                                width="132px"
                                size={44}
                                style={{ justifyContent: "center" }}
                            >
                                결제 정보 수정
                            </Button>
                        </TitleWrapper>
                        <ContentWrapper>
                            <TextWrapper>
                                <Text font="b2_16_reg" color="G_500">
                                    결제 방법
                                </Text>
                            </TextWrapper>

                            <TextWrapper>
                                <Text font="b2_16_semi" color="G_600">
                                    {`${cardInfoData?.name} (${cardInfoData?.last_four_digits})`}
                                </Text>
                            </TextWrapper>
                        </ContentWrapper>
                    </Card>

                    <Card>
                        <TitleWrapper>
                            <Text font="b1_18_bold">구독 이력</Text>
                        </TitleWrapper>

                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            pagination={false}
                        />
                    </Card>

                    <Button
                        hierarchy="default"
                        onClick={handleUnsubscription}
                        width="132px"
                        size={44}
                        style={{
                            margin: "auto 0 auto auto",
                            justifyContent: "center",
                        }}
                    >
                        <Text font="b2_16_semi" color="G_500">
                            구독 취소
                        </Text>
                    </Button>
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

const TitleWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "space-between", "center")};
    margin-bottom: 14px;
`;

const ContentWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "start", "center")};
`;

const TextWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "start")};
    min-width: 144px;
    gap: 12px;
`;

const Chip = styled.div`
    display: flex;
    height: 28px;
    padding: 4px 12px 3px 12px;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background: ${({ theme }) => theme.colors.primary_10};
`;
