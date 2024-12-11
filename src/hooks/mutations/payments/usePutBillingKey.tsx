import { BaseResponse, PUT } from "@/apis/client";
import { useMutation } from "@tanstack/react-query";

interface PutBillingKeysResponse {
    user_email: string;
}

interface PutBillingKeysRequest {
    billing_key: string;
    payment_gateway: string;
}

/**
 *  결제 수단 변경
 */

export const changePayments = async ({
    billing_key,
    payment_gateway,
}: PutBillingKeysRequest) => {
    const res = await PUT<PutBillingKeysResponse>(`/subscription/billingkey`, {
        billing_key,
        payment_gateway,
    });
    return res.data;
};

interface PutPaymentsProps {
    onSuccess: (res: BaseResponse<PutBillingKeysResponse>) => void;
    onError: (e: Error) => void;
}

export const usePutBillingKeys = ({ onSuccess, onError }: PutPaymentsProps) => {
    return useMutation({
        mutationFn: (req: PutBillingKeysRequest) => changePayments(req),
        onSuccess: onSuccess,
        onError: onError,
    });
};
