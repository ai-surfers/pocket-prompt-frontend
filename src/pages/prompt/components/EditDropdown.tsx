import { PromptDetails } from "@/apis/prompt/prompt.model";
import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import Icon from "@/components/common/Icon";
import PromptDeleteModal from "@/pages/prompt/components/PromptDeleteModal";
import { Dropdown, MenuProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface EditDropdownProps {
    prompt: PromptDetails;
}
export default function EditDropdown({ prompt }: EditDropdownProps) {
    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleOnEdit = () => {
        navigate(`/prompt-edit/${prompt.id}`);
    };
    const handleOnDelete = () => {
        setOpenDeleteModal(true);
    };

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <Text
                    font="b3_14_med"
                    color="G_600"
                    style={{ padding: "8px 4px" }}
                    onClick={handleOnDelete}
                >
                    프롬프트 삭제하기
                </Text>
            ),
        },
        {
            key: "2",
            label: (
                <Text
                    font="b3_14_med"
                    color="G_600"
                    style={{ padding: "8px 4px" }}
                    onClick={handleOnEdit}
                >
                    프롬프트 수정하기
                </Text>
            ),
        },
    ];

    return (
        <>
            <Dropdown menu={{ items }}>
                <Button
                    size={44}
                    hierarchy="normal"
                    suffix={<Icon name="Edit2" />}
                    style={{ padding: "12px" }}
                >
                    프롬프트 편집
                </Button>
            </Dropdown>

            <PromptDeleteModal
                isOpen={openDeleteModal}
                onClose={() => {
                    setOpenDeleteModal(false);
                }}
                prompt={prompt}
            />
        </>
    );
}
