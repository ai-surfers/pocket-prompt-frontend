import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

/**
 *  헤더 토큰 추가
 */
API.interceptors.request.use(
    async (config) => {
        const accessToken = window.localStorage.getItem("access_token");
        console.log(accessToken);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        console.log(`${config.url} -- ✈ `, config.data || "");
        return config;
    },
    (error) => Promise.reject(error)
);

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
    return API.get(url, config);
};

export const POST = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return API.post(url, data, config);
};

export const DELETE = async <T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return API.delete(url, config);
};

export const PUT = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return API.put(url, data, config);
};

export const PATCH = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<BaseResponse<T>>> => {
    return API.patch(url, data, config);
};
