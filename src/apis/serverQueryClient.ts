import { QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BaseResponse } from "./client";
import { handleAxiosError } from "./queryClient";

export default function serverQueryClient() {
    return new QueryClient({
        queryCache: new QueryCache({
            onError: (error, query) => {
                console.log("🔯 [SERVER] Query onError");
                console.log(error, query.meta);

                handleAxiosError(error);
            },
        }),
    });
}
