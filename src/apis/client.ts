import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = import.meta.env.BASE_URL;

export const axiosApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export interface BaseResponse<T> {
    success: boolean;
    errorCode: string | null;
    message: string;
    result: T;
}

export const GET = async <T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return axiosApi.get(url, config);
};

export const POST = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return axiosApi.post(url, data, config);
};

export const DELETE = async <T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return axiosApi.delete(url, config);
};

export const PUT = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return axiosApi.put(url, data, config);
};

export const PATCH = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return axiosApi.patch(url, data, config);
};
