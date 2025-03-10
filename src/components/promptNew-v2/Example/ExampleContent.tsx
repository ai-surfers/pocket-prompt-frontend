import Text from "@/components/common/Text/Text";
import useDeviceSize from "@/hooks/useDeviceSize";
import { Flex } from "antd";
import styled from "styled-components";

interface ExampleContentProps {
    defaultValue: string;
    value?: string[];
}
export default function ExampleContent({
    defaultValue,
    value,
}: ExampleContentProps) {
    const { isUnderTablet, isMobile } = useDeviceSize();
    if (!value || value.length < 1)
        return (
            <EmptyText
                $isUnderTablet={isUnderTablet}
                font="b3_14_reg"
                color="G_300"
            >
                {defaultValue}
            </EmptyText>
        );

    return (
        <Flex vertical gap={24}>
            {value.map((val, idx) => (
                <Flex vertical key={idx} gap={8}>
                    <Flex gap={12} align="center">
                        <Text font="b1_18_bold" color="G_800">
                            {val}
                        </Text>
                        <Text font="c1_12_semi" color="primary">
                            필수
                        </Text>
                    </Flex>
                    <ExampleInput>입력 값을 입력해주세요.</ExampleInput>
                </Flex>
            ))}
        </Flex>
    );
}

const EmptyText = styled(Text)<{ $isUnderTablet: boolean }>`
    width: 100%;
    height: ${({ $isUnderTablet }) => ($isUnderTablet ? "300px" : "400px")};
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.G_50};
    padding: 11px 12px;
    margin-top: 5px;
`;

const ExampleInput = styled.div`
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.primary_20};
    padding: 11px 12px;

    ${({ theme }) => theme.fonts.b3_14_reg};
    color: ${({ theme }) => theme.colors.primary_60};
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.colors.primary_10};
    }
`;
