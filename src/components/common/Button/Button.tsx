import { HTMLAttributes, PropsWithChildren } from "react";
import styled, { css } from "styled-components";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    size?: number;
    width?: string;
    icon?: React.ReactNode;
    hierarchy?: "primary" | "secondary" | "normal" | "disabled";
}

export default function Button({
    size = 56,
    width,
    hierarchy = "primary",
    icon,
    children,
    ...props
}: PropsWithChildren<ButtonProps>) {
    return (
        <StyledButton
            width={width}
            size={size}
            hierarchy={hierarchy}
            disabled={hierarchy === "disabled"}
            {...props}
            type="submit"
        >
            {icon && <div>{icon}</div>}
            {children}
        </StyledButton>
    );
}

const StyledButton = styled.button<{
    width?: string;
    size: number;
    disabled?: boolean;
    hierarchy: string;
}>`
    width: ${({ width }) => (width ? `${width}` : "auto")};
    height: ${({ size }) => `${size}px`};
    ${({ theme }) => theme.fonts.b2_16_semi};

    border-radius: 12px;
    padding: 8px 16px;

    ${({ theme }) => theme.mixins.flexBox()};
    gap: 8px;

    transition: all 0.2s;

    ${({ hierarchy, theme }) => {
        switch (hierarchy) {
            case "primary":
                return css`
                    background: ${theme.colors.primary};
                    color: ${theme.colors.white};

                    &:hover {
                        box-shadow: 0px 2px 16px 0px #7580ea;
                    }

                    &:active {
                        background: ${theme.colors.primary_dark};
                    }
                `;
            case "secondary":
                return css`
                    background: ${theme.colors.white};
                    border: 1.5px solid ${theme.colors.primary_30};
                    color: ${theme.colors.primary};

                    &:hover {
                        background: ${theme.colors.primary_10};
                        border: 1.5px solid ${theme.colors.primary_50};
                    }
                `;
            case "normal":
                return css`
                    background: ${theme.colors.primary_10};
                    color: ${theme.colors.primary};

                    &:hover {
                        background: ${theme.colors.primary_20};
                    }
                `;
            case "disabled":
                return css`
                    background: ${theme.colors.G_100};
                    color: ${theme.colors.G_300};
                    pointer-events: none;
                `;
            default:
                return css`
                    background: ${theme.colors.primary};
                    color: ${theme.colors.white};
                `;
        }
    }}
`;
