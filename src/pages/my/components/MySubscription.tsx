// MyPage.tsx
import styled from "styled-components";
import { Card, Table, Space } from "antd";
import { useGetSubscription } from "@/hooks/queries/payments/useGetSubscription";
import { usePutPayments } from "@/hooks/mutations/payments/usePutPayments";
// import * as Sentry from "@sentry/react";

import Text from "@/components/common/Text/Text";
import Button from "@/components/common/Button/Button";
import { useGetCardInfo } from "@/hooks/queries/payments/useGetCardInfo";
import { formatDate, formatNumber } from "@/utils/textUtils";
import { useNavigate } from "react-router-dom";
import { usePutBillingKeys } from "@/hooks/mutations/payments/usePutBillingKey";
import { requestBillingKey } from "@/utils/billingUtils";
import useDeviceSize from "@/hooks/useDeviceSize";

const SUBSCRIPTION_STATUS = {
    active: "활성",
    inactive: "비활성",
    "expiring soon": "만료 예정",
};

const columns = [
    {
        title: "날짜",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "설명",
        dataIndex: "explain",
        key: "explain",
    },
    {
        title: "금액",
        dataIndex: "price",
        key: "price",
    },
];

export default function MySubscription() {
    const navigate = useNavigate();
    const { isUnderTablet } = useDeviceSize();

    const { data: subscriptionData, refetch: refetchSubscriptionData } =
        useGetSubscription();
    const { data: cardInfoData, refetch: refetchCardInfoData } =
        useGetCardInfo();

    const dataSource =
        subscriptionData?.payment_list_data.payment_document_list.map(
            (item) => ({
                ...item,
                date: formatDate(item.date),
                price: `₩${formatNumber(item.price)}`,
            })
        );

    const { mutate: unsubscription } = usePutPayments({
        onSuccess(res) {
            alert("구독이 성공적으로 취소되었습니다.");
            console.log(">> 구독 취소 성공", res);
            refetchSubscriptionData();
            refetchCardInfoData();
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

    const handleClickChangePayment = async () => {
        try {
            const res = await requestBillingKey(
                subscriptionData?.plan ?? "",
                "월간"
            );
            changePayments({
                billing_key: res.billing_key,
                payment_gateway: res.payment_gateway,
            });
        } catch (error) {
            console.error(error);
            alert(
                error instanceof Error
                    ? error.message
                    : "빌링키 오류가 발생했습니다."
            );
        }
    };

    const { mutate: changePayments } = usePutBillingKeys({
        onSuccess(res) {
            alert("결제수단이 성공적으로 변경되었습니다.");
            console.log(">> 결제수단 변경 성공", res);
            refetchCardInfoData();
        },
        onError(e) {
            alert(e.message);
            console.error(">> 구독 취소 실패", e);
        },
    });

    // function throwError() {
    //     try {
    //         throw new Error("커스텀 에러 발생, 센트리 에러 테스트");
    //     } catch (error) {
    //         Sentry.captureException(error);
    //     }
    // }

    return (
        <Container>
            <Wrapper $isUnderTablet={isUnderTablet}>
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
                                onClick={() => navigate("/price")}
                            >
                                플랜 변경
                            </Button>
                        </TitleWrapper>
                        <ContentWrapper>
                            <TextWrapper>
                                <Text font="b2_16_reg" color="G_500">
                                    플랜
                                </Text>
                                {!!subscriptionData?.price && (
                                    <Text font="b2_16_reg" color="G_500">
                                        가격
                                    </Text>
                                )}
                                {!!subscriptionData?.next_pay &&
                                    subscriptionData?.next_pay !== "없음" && (
                                        <Text font="b2_16_reg" color="G_500">
                                            다음 갱신일
                                        </Text>
                                    )}
                                <Text font="b2_16_reg" color="G_500">
                                    상태
                                </Text>
                            </TextWrapper>
                            <TextWrapper>
                                <Text font="b2_16_semi" color="G_600">
                                    {subscriptionData?.plan}
                                </Text>
                                {!!subscriptionData?.price && (
                                    <Text font="b2_16_semi" color="G_600">
                                        ₩{formatNumber(subscriptionData?.price)}
                                    </Text>
                                )}
                                {!!subscriptionData?.next_pay &&
                                    subscriptionData?.next_pay !== "없음" && (
                                        <Text font="b2_16_semi" color="G_600">
                                            {formatDate(
                                                subscriptionData?.next_pay
                                            )}
                                        </Text>
                                    )}
                                <Chip>
                                    <Text font="b3_14_med" color="blue">
                                        {
                                            SUBSCRIPTION_STATUS[
                                                (subscriptionData?.subscription_status ??
                                                    "inactive") as
                                                    | "active"
                                                    | "inactive"
                                                    | "expiring soon"
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
                                onClick={handleClickChangePayment}
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
                                    {cardInfoData?.name
                                        ? `${cardInfoData?.name} (${cardInfoData?.last_four_digits})`
                                        : ""}
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
    width: 100%;
    height: 100%;
    padding: 41px 40px;
    background-color: #f0f2f5;
`;

const Wrapper = styled.div<{ $isUnderTablet: boolean }>`
    max-width: 1080px;
    padding-top: ${({ $isUnderTablet }) => ($isUnderTablet ? 0 : "60px")};
    margin: 0 auto;
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
