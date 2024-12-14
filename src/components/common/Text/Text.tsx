import { HTMLAttributes, PropsWithChildren } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

interface TextProps extends HTMLAttributes<HTMLDivElement> {
    font: string;
    color?: string;
    markdown?: boolean;
}
export default function Text({
    font,
    color = "black",
    children,
    markdown = false,
    ...props
}: PropsWithChildren<TextProps>) {
    return (
        <StyledText $font={font} $color={color} {...props}>
            {markdown ? (
                <ReactMarkdown>{String(children)}</ReactMarkdown>
            ) : (
                children
            )}
        </StyledText>
    );
}

const StyledText = styled.div<{ $font: string; $color: string }>`
    ${({ theme, $font }) => theme.fonts[$font]};
    color: ${({ theme, $color }) => theme.colors[$color]};
    white-space: pre-wrap;
`;
