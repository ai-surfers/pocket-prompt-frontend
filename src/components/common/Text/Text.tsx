import { HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

interface TextProps extends HTMLAttributes<HTMLDivElement> {
    font: string;
    color?: string;
}
export default function Text({
    font,
    color = "black",
    children,
    ...props
}: PropsWithChildren<TextProps>) {
    return (
        <StyledText $font={font} $color={color} {...props}>
            {children}
        </StyledText>
    );
}

const StyledText = styled.div<{ $font: string; $color: string }>`
    ${({ theme, $font }) => theme.fonts[$font]};
    color: ${({ theme, $color }) => theme.colors[$color]};
    white-space: pre-wrap;
`;
