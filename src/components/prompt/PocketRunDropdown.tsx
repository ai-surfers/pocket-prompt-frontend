import Logo from "@svg/Logo";
import Button from "@/components/common/Button/Button";
import Text from "@/components/common/Text/Text";
import { PocketRunModel } from "@/core/Prompt";
import { Dropdown, Flex, MenuProps } from "antd";

interface PocketRunDropdownProps {
    disabled: boolean;
    onSelect: (platform: string) => void;
    secondRun: boolean;
}

export default function PocketRunDropdown({
    disabled,
    onSelect,
    secondRun = false,
}: PocketRunDropdownProps) {
    console.log(secondRun);
    const handleOnSelect: MenuProps["onClick"] = ({ key }) => {
        onSelect(key);
    };

    const items: MenuProps["items"] = Object.entries(PocketRunModel).map(
        ([key, value]) => {
            return {
                key: key,
                label: (
                    <Text
                        font="b3_14_med"
                        color="G_600"
                        style={{ padding: "8px 4px" }}
                    >
                        {value.label}
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
                <Flex gap={12}>
                    <Logo width={24} fill="#AFB1C1" stroke="#AFB1C1" />
                    <div style={{ flex: 1 }}>
                        <Text
                            font={secondRun ? "b3_14_semi" : "b2_16_semi"}
                            color="G_300"
                        >
                            {secondRun
                                ? "변경된 프롬프트로 다시 실행하기"
                                : "프롬프트 실행하기"}
                        </Text>
                    </div>
                </Flex>
            </Button>
        );

    return (
        <Dropdown menu={{ items, onClick: handleOnSelect }}>
            <Button width="100%" size={44} style={{ padding: "12px" }}>
                <Flex gap={12}>
                    <Logo width={24} fill="white" stroke="white" />
                    <div>
                        <Text
                            font={secondRun ? "b3_14_semi" : "b2_16_semi"}
                            color="white"
                        >
                            {secondRun
                                ? "변경된 프롬프트로 다시 실행하기"
                                : "프롬프트 실행하기"}
                        </Text>
                    </div>
                </Flex>
            </Button>
        </Dropdown>
    );
}
