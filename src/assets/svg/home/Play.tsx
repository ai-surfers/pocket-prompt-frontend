import type { SVGProps } from "react";

const Play = ({
    width = 20,
    height = 21,
    stroke = "#818491",
    fill = "none",
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 20 21"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g id="vuesax/linear/play">
            <g id="play">
                <path
                    id="Vector"
                    d="M3.33301 10.5V7.53333C3.33301 3.85 5.94134 2.34167 9.13301 4.18333L11.708 5.66667L14.283 7.15C17.4747 8.99167 17.4747 12.0083 14.283 13.85L11.708 15.3333L9.13301 16.8167C5.94134 18.6583 3.33301 17.15 3.33301 13.4667V10.5Z"
                    stroke={stroke}
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </g>
        </g>
    </svg>
);

export default Play;
