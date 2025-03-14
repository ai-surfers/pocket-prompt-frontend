import { QueryKey, useQueryClient } from "@tanstack/react-query";

export const useInvalidateQueryKeys = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();

    return () => {
        queryClient.invalidateQueries({
            queryKey: queryKey,
        });
    };
};
