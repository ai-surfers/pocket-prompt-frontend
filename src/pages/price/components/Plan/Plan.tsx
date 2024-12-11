import styled from "styled-components";
import { Segmented } from "antd";
import { useMemo, useState } from "react";
import { PLAN_DATA } from "./PlanData";
import PlanCard from "./PlanCard";
import { usePostPayments } from "@/hooks/mutations/payments/usePostPayments";
import { useUser } from "@/hooks/useUser";
import YearlyFreeDescription from "@/assets/svg/Price/yearly-plan-free-description.svg";
import Text from "@/components/common/Text/Text";
import { requestBillingKey } from "@/utils/billingUtils";

export default function Plan() {
    const { userData } = useUser();
    const [billingCycle, setBillingCycle] = useState("월간");

    const { mutate: subscription } = usePostPayments({
        onSuccess(res) {
            alert("정기결제가 등록되었습니다.");
            console.log("usePostPayments - success", res);
        },
        onError(e) {
            alert(e.message);
            console.error("usePostPayments - error", e);
        },
    });

    const handleCycleChange = (value: string) => {
        setBillingCycle(value);
    };

    const handleStartClick = async (planType: string) => {
        console.log(`선택된 요금제: ${planType}, 주기: ${billingCycle}`);

        if (!userData.isLogin) {
            alert("로그인 후 이용 가능합니다.");
            return;
        }

        if (planType === "free") {
            console.log("무시");
        } else {
            console.log("결제!");
            try {
                const res = await requestBillingKey(planType, billingCycle);
                subscription(res);
            } catch (error) {
                console.error(error);
                alert(
                    error instanceof Error
                        ? error.message
                        : "빌링키 오류가 발생했습니다."
                );
            }
        }
    };

    const plans = useMemo(() => {
        return billingCycle === "연간" ? PLAN_DATA.annual : PLAN_DATA.monthly;
    }, [billingCycle]);

    return (
        <PlanContainer>
            <SegmentedFrame>
                <Segmented
                    onChange={handleCycleChange}
                    options={["월간", "연간"]}
                />
            </SegmentedFrame>
            <CardGrid>
                {plans.map((plan, index) => (
                    <AnimatedCard key={plan.planType}>
                        <PlanCard
                            title={plan.title}
                            price={plan.price}
                            period={plan.period}
                            features={plan.features}
                            buttonLabel={plan.buttonLabel}
                            isHighlight={index !== 0}
                            onClick={() => handleStartClick(plan.planType)}
                        />
                    </AnimatedCard>
                ))}
            </CardGrid>
            <Text font="b2_16_med" color="primary_100">
                예산에 구애받지 마세요, 창의성을 발휘하세요!
            </Text>
            {billingCycle === "월간" && (
                <YearlyFreeDescriptionImg
                    src={YearlyFreeDescription}
                    alt="연간 플랜 설명"
                />
            )}
        </PlanContainer>
    );
}

const PlanContainer = styled.section`
    position: relative;
    ${({ theme }) => theme.mixins.flexBox("column")};
    margin: 48px 0 60px;
`;

const CardGrid = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;
`;

const AnimatedCard = styled.div`
    ${({ theme }) => theme.mixins.slideUpWFadeIn()};
`;

const SegmentedFrame = styled.div`
    margin-bottom: 36px;
    overflow: hidden;
    & .ant-segmented {
        padding: 6px;
        background-color: ${({ theme }) => theme.colors.primary_20};
        border-radius: 12px;
    }
    & .ant-segmented-item {
        border-radius: 8px;
    }
    & .ant-segmented-thumb {
        border-radius: 8px;

        :hover {
            background-color: transparent;
        }
    }
    & .ant-segmented-item-label {
        width: 267px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        ${({ theme }) => theme.fonts.h2_20_reg}
        color:  ${({ theme }) => theme.colors.G_500};
    }
    & .ant-segmented-item-selected {
        box-shadow: 0px 0px 64px 0px rgba(117, 128, 234, 0.6);

        & .ant-segmented-item-label {
            ${({ theme }) => theme.fonts.h2_20_semi}
            color:  ${({ theme }) => theme.colors.primary_100};
        }
    }
`;

const YearlyFreeDescriptionImg = styled.img`
    position: absolute;
    top: 10px;
    right: 160px;
`;
