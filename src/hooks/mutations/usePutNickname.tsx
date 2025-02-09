/**
 * 닉네임 변경하기
 */

"use client";

import { BaseResponse, PUT } from "@/apis/client";
import { useMutation } from "@tanstack/react-query";

interface PutNicknameResponse {
    nickname: string;
}

interface PutNicknameProps {
    onSuccess: (res: BaseResponse<PutNicknameResponse>) => void;
    onError: (e: Error) => void;
}

const updateNickname = async (nickname: string) => {
    const { data } = await PUT<PutNicknameResponse>(`/me/nickname`, {
        new_nickname: nickname,
    });
    return data;
};

export const usePutNickname = ({ onSuccess, onError }: PutNicknameProps) => {
    return useMutation({
        mutationFn: (nickname: string) => updateNickname(nickname),
        onSuccess: onSuccess,
        onError: onError,
    });
};
