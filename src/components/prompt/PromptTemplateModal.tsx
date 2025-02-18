import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import useToast from "@/hooks/useToast";
import { copyClipboard } from "@/utils/promptUtils";
import { Flex, Modal } from "antd";
import styled from "styled-components";

interface PromptTemplateModal {
    isOpen: boolean;
    onClose: () => void;
    template: string;
}
export default function PromptTemplateModal({
    isOpen,
    onClose,
    template,
}: PromptTemplateModal) {
    const showToast = useToast();
    const handleOnCopy = () => {
        copyClipboard(template)
            .then(() => {
                showToast({
                    title: "프롬프트 템플릿 복사가 완료되었어요.",
                    subTitle: "",
                    iconName: "CopySuccess",
                });
                onClose();
            })
            .catch((err) => {
                console.error("클립보드 복사 실패:", err);
                alert("클립보드 복사에 실패했습니다.");
            });
    };

    if (!isOpen) return null;
    return (
        <Modal
            open={true}
            closeIcon={null}
            width="80%"
            style={{ maxWidth: "624px" }}
            footer={[]}
            onCancel={onClose}
        >
            <Flex vertical gap={20} align="center">
                <Text font="h2_20_bold">프롬프트 템플릿 </Text>

                <TemplateBox>
                    <Text font="b3_14_med" color="G_700">
                        {template}
                    </Text>
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
                        id="prompt-template-copy"
                        style={{ flex: 1, justifyContent: "center" }}
                        onClick={handleOnCopy}
                    >
                        프롬프트 템플릿 복사하기
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
    overflow: scroll;
    border: 1px solid var(--primary-20, #e3e6fb);
`;
