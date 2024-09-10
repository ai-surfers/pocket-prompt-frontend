import { useQuery } from "@tanstack/react-query";
import { GET } from "../../../apis/client";
import { PAYMENTS_KEYS } from "../QueryKeys";

export interface GetPaymentsResponse {
    data: object;
}

/**
 *  정기 결제 정보 확인
 */
export const getPayments = async () => {
    return GET<GetPaymentsResponse>(`/pay`);
};

export const useGetPaymetns = () => {
    const QUERY_KEY = PAYMENTS_KEYS.all;

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: () => getPayments().then((res) => res),
    });

    return { data, isLoading, isError, error, refetch };
};
