import { useMutation } from "@tanstack/react-query";
import { BaseResponse, POST } from "../../../apis/client";

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
    const res = await POST<UnsubscriptionResponse>(`/unsubscription`);
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
