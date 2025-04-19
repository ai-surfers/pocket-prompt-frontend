import type { SVGProps } from "react";

const TextPromptOptionIcon = ({
    fill = "#5B5F70",
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M7.5013 18.3327H12.5013C16.668 18.3327 18.3346 16.666 18.3346 12.4993V7.49935C18.3346 3.33268 16.668 1.66602 12.5013 1.66602H7.5013C3.33464 1.66602 1.66797 3.33268 1.66797 7.49935V12.4993C1.66797 16.666 3.33464 18.3327 7.5013 18.3327Z"
            fill={fill}
            stroke={fill}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M5.83203 7.40898C8.45703 6.10065 11.5404 6.10065 14.1654 7.40898"
            stroke="white"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10 13.5824V6.60742"
            stroke="white"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default TextPromptOptionIcon;
