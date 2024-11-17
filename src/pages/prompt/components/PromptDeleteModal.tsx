import { PromptDetails } from "@/apis/prompt/prompt.model";
import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import { useDeletePrompt } from "@/hooks/mutations/prompts/useDeletePrompt";
import { PROMPT_KEYS } from "@/hooks/queries/QueryKeys";
import useToast from "@/hooks/useToast";
import { formatNumber } from "@/utils/textUtils";
import { useQueryClient } from "@tanstack/react-query";
import { Flex, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface PromptDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    prompt: PromptDetails;
}
export default function PromptDeleteModal({
    isOpen,
    onClose,
    prompt,
}: PromptDeleteModalProps) {
    const showToast = useToast();
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const { mutate: remove, isPending } = useDeletePrompt({
        onSuccess(res) {
            console.log(res);
            showToast("프롬프트 삭제가 완료되었어요", "");
            navigate("/");

            queryClient.invalidateQueries({
                queryKey: PROMPT_KEYS.detail(prompt.id),
            });
            queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.lists() });
        },
        onError(e) {
            console.log(e);
        },
    });

    const handleOnDelete = () => {
        if (isPending) return;
        remove({ id: prompt.id });
    };

    if (!isOpen) return null;
    return (
        <Modal open={true} closeIcon={null} footer={[]} onCancel={onClose}>
            <Flex vertical gap={32} align="center">
                <Text font="h2_20_bold">
                    정말 해당 프롬프트를 삭제하시겠어요?
                </Text>

                <Flex vertical gap={12} style={{ width: "100%" }}>
                    <Box justify="center" align="center">
                        <Text
                            font="b3_14_semi"
                            color="primary_100"
                            style={{ textAlign: "center" }}
                        >
                            올려주신 '{prompt.title}'는 <br />
                            {formatNumber(prompt.views)}명이 조회하고{" "}
                            {formatNumber(prompt.star)}명이 저장했습니다.
                        </Text>
                    </Box>

                    <Text
                        font="b3_14_reg"
                        color="G_600"
                        style={{ textAlign: "center" }}
                    >
                        삭제한 프롬프트는 다시 돌아오지 않아요. <br />
                        그래도 삭제하시겠나요?
                    </Text>
                </Flex>

                <Flex style={{ width: "100%" }} gap={16}>
                    <Button
                        hierarchy="default"
                        style={{ flex: 1, justifyContent: "center" }}
                        onClick={onClose}
                    >
                        삭제 취소하기
                    </Button>

                    <Button
                        style={{ flex: 1, justifyContent: "center" }}
                        onClick={handleOnDelete}
                    >
                        프롬프트 삭제하기
                    </Button>
                </Flex>
            </Flex>
        </Modal>
    );
}

const Box = styled(Flex)`
    width: 100%;

    border-radius: 8px;
    background: var(--primary-10, #f2f3fd);
    padding: 12px 16px;
`;
