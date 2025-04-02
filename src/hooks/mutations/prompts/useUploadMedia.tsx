"use client";

import { POST } from "@/apis/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

// 성공 시 반환 타입
export interface UploadMediaResponse {
    media_url: string;
    file_name: string;
    upload_date: string;
}

// 실패 시 에러 타입
interface ErrorResponse {
    detail: string;
}

const uploadMedia = async (file: File): Promise<UploadMediaResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await POST<UploadMediaResponse>("/media/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data.data;
};

// 훅 정의
export interface UploadMediaProps {
    onSuccess?: (res: UploadMediaResponse) => void;
    onError?: (e: AxiosError<ErrorResponse>) => void;
}

export const useUploadMedia = ({
    onSuccess,
    onError,
}: UploadMediaProps = {}) => {
    return useMutation<UploadMediaResponse, AxiosError<ErrorResponse>, File>({
        mutationFn: uploadMedia,
        onSuccess,
        onError,
    });
};
