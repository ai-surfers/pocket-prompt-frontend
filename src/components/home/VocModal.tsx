"use client";

import { useState } from "react";
import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import useToast from "@/hooks/useToast";
import { Flex, Modal } from "antd";
import styled from "styled-components";
import Textarea from "../common/Textarea/Textarea";
import { usePostVoc } from "@/hooks/mutations/voc/usePostVoc";

interface VocModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MAX_LENGTH = 300; // 최대 글자 수 설정

export default function VocModal({ isOpen, onClose }: VocModalProps) {
    const showToast = useToast();
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (value: string) => {
        if (value.length <= MAX_LENGTH) {
            setInputValue(value);
        }
    };

    // usePostVoc
    const { mutate: postVoc } = usePostVoc({
        onSuccess(res) {
            showToast({
                title: "피드백이 제출되었습니다!",
                subTitle: "",
                iconName: "TickCircle",
            });
            setInputValue("");
            onClose();
        },
        onError(e) {
            console.error("피드백 제출 실패:", e);
            alert("피드백 제출에 실패하였습니다.");
        },
    });

    if (!isOpen) return null;

    return (
        <Modal
            open={true}
            closeIcon={null}
            width="80%"
            style={{ maxWidth: "624px" }}
            footer={null}
            onCancel={onClose}
        >
            <Flex vertical gap={20} align="center">
                <Text font="h2_20_bold">
                    포켓 프롬프트에 대한 피드백을 남겨주세요!
                </Text>

                <Flex vertical align="center">
                    <Text font="p3_14_med" color="G_700">
                        추가되었으면 하는 기능이나 불편한 점이 있다면 자유롭게
                        말씀해주세요!
                    </Text>
                    <Text font="p3_14_med" color="G_700">
                        여러분들의 소중한 의견을 듣고 적극 반영하겠습니다 :)
                    </Text>
                </Flex>

                <TemplateBox>
                    <Textarea
                        value={inputValue}
                        onChange={(value) => handleInputChange(value)}
                        placeholder="여기에 피드백을 입력하세요."
                        count={MAX_LENGTH}
                    />
                </TemplateBox>

                <Flex style={{ width: "100%" }} gap={16}>
                    <Button
                        hierarchy="default"
                        style={{ flex: 1, justifyContent: "center" }}
                        onClick={onClose}
                    >
                        닫기
                    </Button>

                    <Button
                        hierarchy={
                            inputValue.length > 0 ? "primary" : "disabled"
                        }
                        style={{ flex: 1, justifyContent: "center" }}
                        onClick={() => {
                            if (inputValue.length === 0) return;

                            postVoc(inputValue);
                        }}
                    >
                        제출하기
                    </Button>
                </Flex>
            </Flex>
        </Modal>
    );
}

const TemplateBox = styled.div`
    border-radius: 8px;
    padding: 16px;
    width: 100%;
    max-height: 300px;
`;
