import BookMark from "@/assets/svg/home/BookMark";
import Button from "@/components/common/Button/Button";
import { useDeleteStar } from "@/hooks/mutations/star/useDeleteStar";
import { usePostStar } from "@/hooks/mutations/star/usePostStar";
import { PROMPT_KEYS } from "@/hooks/queries/QueryKeys";
import { useQueryClient } from "@tanstack/react-query";

interface BookmarkButtonProps {
    is_starred: boolean;
    id: string;
}
export default function BookmarkButton({
    is_starred,
    id,
}: BookmarkButtonProps) {
    const queryClient = useQueryClient();

    const handleOnClick = () => {
        console.log("!!", is_starred);

        if (!id) {
            console.error("No id");
            return;
        }

        if (is_starred) deleteStar(id);
        else postStar(id);
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
            console.error(error.message);
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
        },
    });

    if (is_starred)
        return (
            <Button
                size={44}
                suffix={<BookMark fill="#fff" stroke="#7580EA" height={20} />}
                style={{ padding: "12px" }}
                onClick={handleOnClick}
            />
        );

    return (
        <Button
            size={44}
            hierarchy="normal"
            suffix={<BookMark stroke="#7580EA" height={20} />}
            style={{ padding: "12px" }}
            onClick={handleOnClick}
        />
    );
}
