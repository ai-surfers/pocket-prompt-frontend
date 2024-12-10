import { useQuery } from "@tanstack/react-query";
import { GET } from "../../../apis/client";
import { PAYMENTS_KEYS } from "../QueryKeys";
import { useState } from "react";
import { PaginationInfo } from "@/apis/prompt/prompt.model";

interface GetSubscriptionRequest {
    page: number;
    limit: number;
}
export interface GetSubscriptionResponse {
    plan: string;
    next_pay: string;
    price: number;
    subscription_status: string;
    payment_list_data: PaymentListDataType;
}

interface PaymentListDataType {
    payment_document_list: PaymentDocumentListType[];
    page_meta_data: PaginationInfo;
}

interface PaymentDocumentListType {
    date: string;
    explain: string;
    price: number;
    is_success: boolean;
}

const Subscription_LIST_LIMIT = 12;

/**
 *  정기 결제 정보 확인
 */
export const getSubscription = async ({
    page,
    limit,
}: GetSubscriptionRequest) => {
    const res = await GET<GetSubscriptionResponse>(
        `/subscription?page=${page}&limit=${limit}`
    );
    return res.data.data;
};

export const useGetSubscription = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const QUERY_KEY = PAYMENTS_KEYS.all;

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: () =>
            getSubscription({
                page: currentPage,
                limit: Subscription_LIST_LIMIT,
            }).then((res) => res),
    });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
        currentPage,
        handlePageChange,
    };
};
