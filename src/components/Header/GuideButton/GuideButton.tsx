import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import Text from "@/components/common/Text/Text";

const GuideButton = () => {
    const handleOnGuide = () => {
        window.open(
            "https://pocket-prompt.notion.site/da477857a0cc44888b06dd23cf6682ff",
            "_blank"
        );
    };
    return (
        <Button
            onClick={handleOnGuide}
            size={36}
            hierarchy="normal"
            style={{ padding: "8px 8px 8px 12px" }}
        >
            <Text font="b3_14_semi " color="primary">
                Guide
            </Text>
            <Icon name="Book" />
        </Button>
    );
};

export default GuideButton;
