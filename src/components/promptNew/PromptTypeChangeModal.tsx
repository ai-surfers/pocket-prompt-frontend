import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import { Flex, Modal } from "antd";

interface PromptTypeChangeModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function PromptTypeChangeModal({
    isOpen,
    onCancel,
    onConfirm,
}: PromptTypeChangeModalProps) {
    return (
        <Modal
            open={isOpen}
            onCancel={onCancel}
            closeIcon={null}
            footer={null}
            width="100%"
            style={{ maxWidth: 480 }}
        >
            <Flex vertical align="center" gap={20}>
                <Text font="h2_20_bold">프롬프트 유형 전환</Text>
                <Text
                    font="b3_14_reg"
                    color="G_700"
                    style={{ textAlign: "center", whiteSpace: "pre-line" }}
                >
                    {
                        "프롬프트 템플릿이 채워진 상태에서 다른 프롬프트 유형으로 전환하시면\n채워진 프롬프트가 지워져요.\n\n그래도 다른 프롬프트 유형으로 전환할까요?"
                    }
                </Text>
                <Flex gap={12} style={{ width: "100%" }}>
                    <Button
                        hierarchy="default"
                        style={{ flex: 1, justifyContent: "center" }}
                        onClick={onCancel}
                    >
                        전환 취소하기
                    </Button>
                    <Button
                        style={{ flex: 1, justifyContent: "center" }}
                        onClick={onConfirm}
                    >
                        전환하기
                    </Button>
                </Flex>
            </Flex>
        </Modal>
    );
}
