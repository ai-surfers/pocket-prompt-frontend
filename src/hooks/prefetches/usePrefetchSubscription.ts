import serverQueryClient from "@/apis/serverQueryClient";
import { PAYMENTS_KEYS } from "../queries/QueryKeys";
import {
    getSubscription,
    Subscription_LIST_LIMIT,
} from "../queries/payments/useGetSubscription";

export const usePrefetchSubscription = async () => {
    const queryClient = serverQueryClient();
    const QUERY_KEY = PAYMENTS_KEYS.all;

    try {
        await queryClient.prefetchQuery({
            queryKey: QUERY_KEY,
            queryFn: () =>
                getSubscription({
                    page: 1,
                    limit: Subscription_LIST_LIMIT,
                }).then((res) => res),
        });
    } catch (error) {
        console.error(`[usePrefetchSubscription] 프리페치 실패`, error);
    }
};
