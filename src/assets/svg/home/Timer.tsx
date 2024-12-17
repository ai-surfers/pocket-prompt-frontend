import type { SVGProps } from "react";
const Timer = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        {...props}
    >
        <path
            d="M22.8596 3H13.1396C7.49957 3 7.06457 8.07 10.1096 10.83L25.8896 25.17C28.9346 27.93 28.4996 33 22.8596 33H13.1396C7.49957 33 7.06457 27.93 10.1096 25.17L25.8896 10.83C28.9346 8.07 28.4996 3 22.8596 3Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default Timer;
