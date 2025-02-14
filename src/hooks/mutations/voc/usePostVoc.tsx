"use client";

import { useMutation } from "@tanstack/react-query";
import { BaseResponse, POST } from "../../../apis/client";

/**
 * CreateVocRequest
 * 요청 본문에 전달할 피드백 내용
 */
export interface CreateVocRequest {
    content: string;
}

/**
 * CreateVocResponseData
 * 응답 data 객체 내부의 피드백 아이디
 */
export interface CreateVocResponseData {
    feedback_id: string;
}

/**
 * CreateVocResponse
 * API 응답 구조
 */
export interface CreateVocResponse {
    success: boolean;
    detail: string;
    data: CreateVocResponseData;
}

/**
 * voc feedback 등록하기
 * 헤더에 Authorization과 source-location를 함께 전달합니다.
 */
export const createVoc = async (feedback: CreateVocRequest) => {
    const { data } = await POST<CreateVocResponse>(`/feedback`, feedback, {
        headers: {
            // 실제 토큰은 환경변수 또는 사용자 상태에서 받아와야 합니다.
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
            "source-location": "web", // 또는 "extension"
        },
    });
    return data;
};

export interface PostVocProps {
    onSuccess: (res: BaseResponse<CreateVocResponse>) => void;
    onError: (e: Error) => void;
}

/**
 * voc feedback 등록용 hook
 */
export const usePostVoc = ({ onSuccess, onError }: PostVocProps) => {
    return useMutation({
        mutationFn: (req: CreateVocRequest) => createVoc(req),
        onSuccess: onSuccess,
        onError: onError,
    });
};
