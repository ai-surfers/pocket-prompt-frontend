import BookMark from "@/assets/svg/home/BookMark";
import Button from "@/components/common/Button/Button";

interface BookmarkButtonProps {
    is_starred: boolean;
}
export default function BookmarkButton({ is_starred }: BookmarkButtonProps) {
    const handleOnClick = () => {
        console.log("!!", is_starred);
    };

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
