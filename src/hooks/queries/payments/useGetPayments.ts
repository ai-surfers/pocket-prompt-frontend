import { useQuery } from "@tanstack/react-query";
import { GET } from "../../../apis/client";
import { PAYMENTS_KEYS } from "../QueryKeys";
import { useState } from "react";

interface GetPaymentsRequest {
    page: number;
    limit: number;
}
export interface GetPaymentsResponse {
    data: object;
}

const PAYMENTS_LIST_LIMIT = 12;

/**
 *  정기 결제 정보 확인
 */
export const getPayments = async ({ page, limit }: GetPaymentsRequest) => {
    return GET<GetPaymentsResponse>(
        `/subscription?page=${page}&limit=${limit}`
    );
};

export const useGetPayments = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const QUERY_KEY = PAYMENTS_KEYS.all;

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: () =>
            getPayments({ page: currentPage, limit: PAYMENTS_LIST_LIMIT }).then(
                (res) => res
            ),
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
