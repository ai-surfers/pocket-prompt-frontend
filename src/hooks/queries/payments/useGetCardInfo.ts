import { GET } from "@/apis/client";
import { useQuery } from "@tanstack/react-query";
import { CARD_INFO_KEYS } from "../QueryKeys";

interface GetCardInfoResponse {
    name: string;
    last_four_digits: string;
}

/**
 *  카드 정보 확인
 */

export const getCardInfo = async () => {
    const res = await GET<GetCardInfoResponse>(`/subscription/card_info`);
    return res.data.data;
};

export const useGetSubscription = () => {
    const QUERY_KEY = CARD_INFO_KEYS.all;

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: () => getCardInfo().then((res) => res),
    });

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
    };
};
