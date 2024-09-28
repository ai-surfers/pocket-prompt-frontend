import { BaseResponse, PUT } from "@/apis/client";
import { useMutation } from "@tanstack/react-query";

/**
 * UnsubscriptionResponse
 */
export interface UnsubscriptionResponse {
    user_email: string;
    payments_id: string;
}

/**
 *  정기결제 취소하기
 */
export const unsubscription = async () => {
    const res = await PUT<UnsubscriptionResponse>(`/unsubscription`);
    return res.data;
};

interface PutPaymentsProps {
    onSuccess: (res: BaseResponse<UnsubscriptionResponse>) => void;
    onError: (e: Error) => void;
}

export const usePutPayments = ({ onSuccess, onError }: PutPaymentsProps) => {
    return useMutation({
        mutationFn: () => unsubscription(),
        onSuccess: onSuccess,
        onError: onError,
    });
};
