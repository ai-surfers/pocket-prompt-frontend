import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import { useDeleteStar } from "@/hooks/mutations/star/useDeleteStar";
import { usePostStar } from "@/hooks/mutations/star/usePostStar";
import { PROMPT_KEYS } from "@/hooks/queries/QueryKeys";
import useModal from "@/hooks/useModal";
import { useQueryClient } from "@tanstack/react-query";
import { Flex, message } from "antd";
import { AxiosError } from "axios";
import Icon from "../common/Icon";
import Link from "next/link";

interface BookmarkButtonProps {
    is_starred: boolean;
    id: string;
}
export default function BookmarkButton({
    is_starred,
    id,
}: BookmarkButtonProps) {
    const queryClient = useQueryClient();

    const [messageApi, contextHolder] = message.useMessage();
    const { openModal, closeModal } = useModal();

    const handleOnClick = () => {
        if (!id) {
            messageApi.error("존재하지 않은 프롬프트입니다.");
            return;
        }

        if (is_starred) deleteStar(id);
        else postStar(id);
    };

    const openLimitModal = (message: string) => {
        openModal({
            title: "프롬프트 즐겨찾기 한도에 도달했습니다.",
            content: (
                <Text font="b3_14_reg" color="G_700">
                    {message}
                </Text>
            ),
            footer: (
                <Flex style={{ width: "100%", paddingTop: "20px" }} gap={16}>
                    <Button
                        hierarchy="default"
                        style={{ flex: 1, justifyContent: "center" }}
                        onClick={closeModal}
                    >
                        닫기
                    </Button>
                    <Link href="/price">
                        <Button
                            id="saved-prompts-limit-explore-plans"
                            style={{ flex: 1, justifyContent: "center" }}
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            플랜 둘러보기
                        </Button>
                    </Link>
                </Flex>
            ),
        });
    };

    const { mutate: postStar } = usePostStar({
        onSuccess: (res) => {
            const { success, detail } = res;

            if (!success) {
                console.error(`${detail}`);
                alert(`${detail}`);
                return;
            }

            queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.detail(id) });
            queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.lists() });
        },
        onError: (error) => {
            console.error(error);

            if (isAxiosError(error) && error.status === 402) {
                openLimitModal(error.message);
            } else {
                openModal({
                    title: "즐겨찾기 추가를 실패했습니다.",
                    content: error.message,
                });
            }
        },
    });

    const { mutate: deleteStar } = useDeleteStar({
        onSuccess: (res) => {
            const { success, detail } = res;

            if (!success) {
                console.error(`${detail}`);
                alert(`${detail}`);
                return;
            }

            queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.detail(id) });
            queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.lists() });
        },
        onError: (error) => {
            console.error(error.message);

            if (isAxiosError(error) && error.status === 402) {
                openLimitModal(error.message);
            } else {
                openModal({
                    title: "즐겨찾기 삭제를 실패했습니다.",
                    content: error.message,
                });
            }
        },
    });

    if (is_starred)
        return (
            <>
                <Button
                    size={44}
                    suffix={<Icon name="Bookmark" color="white" size={20} />}
                    style={{ padding: "12px" }}
                    onClick={handleOnClick}
                />
                {contextHolder}
            </>
        );

    return (
        <>
            <Button
                size={44}
                hierarchy="normal"
                suffix={<Icon name="Bookmark" color="primary_100" size={20} />}
                style={{ padding: "12px" }}
                onClick={handleOnClick}
            />
            {contextHolder}
        </>
    );
}

function isAxiosError(error: any): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}
