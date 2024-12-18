import { PORTONE_CHANNEL_KEY, PORTONE_STORE_ID } from "@/core/Payment";
import { SubscriptionRequest } from "@/hooks/mutations/payments/usePostPayments";
import PortOne from "@portone/browser-sdk/v2";

/*
 * 포트원 빌링키 요청
 *
 * @param planType - Plan type (e.g., "monthly", "yearly")
 * @param billingCycle - Billing cycle (e.g., "월간", "연간")
 * @returns Promise<SubscriptionRequest>
 */

// [Reference] https://developers.portone.io/opi/ko/integration/start/v2/billing/issue?v=v2
export async function requestBillingKey(
    planType: string,
    billingCycle: string
): Promise<SubscriptionRequest> {
    const issueResponse = await PortOne.requestIssueBillingKey({
        storeId: PORTONE_STORE_ID,
        channelKey: PORTONE_CHANNEL_KEY,
        billingKeyMethod: "CARD",
    });

    console.log("issueResponse", issueResponse);
    if (issueResponse?.code != null || !issueResponse?.billingKey) {
        throw new Error(issueResponse?.message);
    }

    return {
        billing_key: issueResponse?.billingKey,
        payment_gateway: "tosspayments",
        user_plan: planType,
        subscription_type: billingCycle === "월간" ? "monthly" : "yearly",
    };
}
