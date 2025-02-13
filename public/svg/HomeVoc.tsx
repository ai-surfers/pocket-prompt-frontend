import type { SVGProps } from "react";

const HomeVoc = ({
    fill = "none",
    stroke = "white",
    ...props
}: SVGProps<SVGSVGElement> & { fill?: string; stroke?: string }) => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
        {...props}
    >
        <path
            d="M9.91536 22.1666H9.33203C4.66536 22.1666 2.33203 20.9999 2.33203 15.1666V9.33325C2.33203 4.66659 4.66536 2.33325 9.33203 2.33325H18.6654C23.332 2.33325 25.6654 4.66659 25.6654 9.33325V15.1666C25.6654 19.8333 23.332 22.1666 18.6654 22.1666H18.082C17.7204 22.1666 17.3704 22.3416 17.1487 22.6333L15.3987 24.9666C14.6287 25.9933 13.3687 25.9933 12.5987 24.9666L10.8487 22.6333C10.662 22.3766 10.2304 22.1666 9.91536 22.1666Z"
            stroke={stroke}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.16797 9.33325H19.8346"
            stroke={stroke}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.16797 15.1667H15.168"
            stroke={stroke}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default HomeVoc;
