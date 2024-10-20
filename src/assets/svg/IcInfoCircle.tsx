import type { SVGProps } from "react";
const SvgIcInfoCircle = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 21"
        {...props}
    >
        <path
            stroke="#7580EA"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10 2.166c-4.584 0-8.334 3.75-8.334 8.334s3.75 8.333 8.334 8.333 8.333-3.75 8.333-8.333S14.583 2.166 10 2.166M10 13.833V9.666"
        />
        <path
            stroke="#7580EA"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.005 7.167h-.008"
        />
    </svg>
);
export default SvgIcInfoCircle;
