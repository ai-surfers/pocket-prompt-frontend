import Text from "@/components/common/Text/Text";
import styled from "styled-components";

interface ExampleBoxProps {
    defaultValue: string;
    value?: string;
    font?: string;
    color?: string;
}
export default function ExampleBox({
    defaultValue,
    value,
    font,
    color,
}: ExampleBoxProps) {
    if (!value)
        return (
            <EmptyText font="b3_14_reg" color="G_300">
                {defaultValue}
            </EmptyText>
        );

    return (
        <ExampleText
            font={font ? font : "b3_14_reg"}
            color={color ? color : "G_700"}
        >
            {value}
        </ExampleText>
    );
}

const EmptyText = styled(Text)`
    width: 100%;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.G_50};
    padding: 11px 12px;
`;

const ExampleText = styled(Text)`
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.G_100};
    padding: 11px 12px;
`;
