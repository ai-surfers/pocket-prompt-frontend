import { useMutation } from "@tanstack/react-query";
import { BaseResponse, POST } from "../../../apis/client";

/**
 * SubscriptionRequest
 */
export interface SubscriptionRequest {
    billing_key: string;
    payment_gateway: string;
    user_tier: string;
}

/**
 * SubscriptionResponse
 */
export interface SubscriptionResponse {
    user_email: string;
    payments_id: string;
}

/**
 *  정기결제 등록하기
 */
export const subscription = async (request: SubscriptionRequest) => {
    const res = await POST<SubscriptionResponse>(`/subscription`, request);
    return res.data;
};

interface PostPaymentsProps {
    onSuccess: (res: BaseResponse<SubscriptionResponse>) => void;
    onError: (e: Error) => void;
}

export const usePostPayments = ({ onSuccess, onError }: PostPaymentsProps) => {
    return useMutation({
        mutationFn: (req: SubscriptionRequest) => subscription(req),
        onSuccess: onSuccess,
        onError: onError,
    });
};
