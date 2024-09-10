import styled from "styled-components";
import { Segmented, Typography } from "antd";
import { useMemo, useState } from "react";
import { PLAN_DATA } from "./PlanData";
import PlanCard from "./PlanCard";
import PortOne from "@portone/browser-sdk/v2";
import {
    SubscriptionRequest,
    usePostPayments,
} from "../../../hooks/mutations/payments/usePostPayments";
const { Text } = Typography;

const PORTONE_STORE_ID = import.meta.env.VITE_PORTONE_STORE_ID;
const PORTONE_CHANNEL_KEY = import.meta.env.VITE_PORTONE_CHANNEL_KEY;

export default function Plan() {
    const [billingCycle, setBillingCycle] = useState("월간");

    const { mutate: subscription } = usePostPayments({
        onSuccess(res) {
            console.log("usePostPayments - success", res);
        },
        onError(e) {
            console.error("usePostPayments - error", e);
        },
    });

    const handleCycleChange = (value: string) => {
        setBillingCycle(value);
    };

    const handleStartClick = (planType: string) => {
        console.log(`선택된 요금제: ${planType}, 주기: ${billingCycle}`);

        if (planType === "free") {
            console.log("무시");
        } else {
            console.log("결제!");
            requestBillingKey(planType);
        }
    };

    // [Reference] https://developers.portone.io/opi/ko/integration/start/v2/billing/issue?v=v2
    async function requestBillingKey(planType: string) {
        const issueResponse = await PortOne.requestIssueBillingKey({
            storeId: PORTONE_STORE_ID,
            channelKey: PORTONE_CHANNEL_KEY,
            billingKeyMethod: "CARD",
        });

        console.log("issueResponse", issueResponse);
        if (issueResponse?.code != null || !issueResponse?.billingKey) {
            return alert(
                issueResponse?.message || "빌링키 오류가 발생했습니다."
            );
        }

        const request: SubscriptionRequest = {
            billing_key: issueResponse?.billingKey,
            payment_gateway: "tosspayments",
            user_tier: planType,
        };

        subscription(request);
    }

    const plans = useMemo(() => {
        return billingCycle === "연간" ? PLAN_DATA.annual : PLAN_DATA.monthly;
    }, [billingCycle]);

    return (
        <PlanContainer>
            <Segmented
                onChange={handleCycleChange}
                options={["월간", "연간"]}
            />

            <CardGrid>
                {plans.map((plan) => (
                    <AnimatedCard key={plan.planType}>
                        <PlanCard
                            title={plan.title}
                            price={plan.price}
                            period={plan.period}
                            features={plan.features}
                            buttonLabel={plan.buttonLabel}
                            onClick={() => handleStartClick(plan.planType)}
                        />
                    </AnimatedCard>
                ))}
            </CardGrid>

            <Text>예산에 구애받지 마세요, 창의성을 발휘하세요!</Text>
        </PlanContainer>
    );
}

const PlanContainer = styled.section`
    ${({ theme }) => theme.mixins.flexBox("column")};
    gap: 20px;
    margin: 40px 0;
`;

const CardGrid = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
`;

const AnimatedCard = styled.div`
    ${({ theme }) => theme.mixins.slideUpWFadeIn()};
`;
