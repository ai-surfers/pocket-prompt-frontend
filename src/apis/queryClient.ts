import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BaseResponse } from "./client";

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            console.log("🔯 Query onError");
            console.log(error, query.meta);

            handleAxiosError(error);
        },
    }),
    mutationCache: new MutationCache({
        onError: (error) => {
            console.log("🔯 Mutation onError");
            console.log(error);

            handleAxiosError(error);
        },
    }),
});

export function isAxiosError(error: any): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}

export function handleAxiosError(error: any) {
    if (isAxiosError(error) && error.response) {
        const errorMessage = (error.response.data as BaseResponse<string>)
            .detail;

        if (errorMessage) {
            error.message = errorMessage;
        }
    }
}

export default queryClient;
