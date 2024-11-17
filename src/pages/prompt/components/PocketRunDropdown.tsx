import { Logo } from "@/assets/svg";
import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import { AIPlatforms } from "@/core/Prompt";
import { Dropdown, Flex, MenuProps } from "antd";

interface PocketRunDropdownProps {
    disabled: boolean;
    onSelect: (platform: string) => void;
}

export default function PocketRunDropdown({
    disabled,
    onSelect,
}: PocketRunDropdownProps) {
    const handleOnSelect: MenuProps["onClick"] = ({ key }) => {
        onSelect(key);
    };

    const items: MenuProps["items"] = Object.entries(AIPlatforms).map(
        ([key, value]) => {
            return {
                key: key,
                label: (
                    <Text
                        font="b3_14_med"
                        color="G_600"
                        style={{ padding: "8px 4px" }}
                    >
                        {value} 기반
                    </Text>
                ),
            };
        }
    );

    if (disabled)
        return (
            <Button
                width="100%"
                hierarchy="disabled"
                size={44}
                style={{ padding: "12px" }}
            >
                <Flex gap={12} style={{ flex: 1 }}>
                    <Logo width={24} fill="#AFB1C1" stroke="#AFB1C1" />
                    <div style={{ flex: 1 }}>포켓런 하기</div>
                </Flex>
            </Button>
        );

    return (
        <Dropdown menu={{ items, onClick: handleOnSelect }}>
            <Button width="100%" size={44} style={{ padding: "12px" }}>
                <Flex gap={12} style={{ flex: 1 }}>
                    <Logo width={24} fill="white" stroke="white" />
                    <div style={{ flex: 1 }}>포켓런 하기</div>
                </Flex>
            </Button>
        </Dropdown>
    );
}
