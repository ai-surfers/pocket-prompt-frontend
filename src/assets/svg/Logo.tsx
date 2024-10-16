import type { SVGProps } from "react";
const SvgLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 48 48"
        {...props}
    >
        <path
            stroke="#7580EA"
            strokeWidth={1.144}
            d="M40.244 9.093c1.927 2.163 2.054 5.758.418 10-1.624 4.209-4.933 8.889-9.561 13.013s-9.657 6.874-14.025 8.005c-4.4 1.138-7.957.6-9.885-1.562-1.928-2.164-2.054-5.759-.418-10 1.624-4.21 4.933-8.89 9.56-13.013C20.963 11.41 25.99 8.66 30.36 7.53c4.4-1.139 7.957-.601 9.885 1.562Z"
        />
        <path
            fill="#7580EA"
            fillRule="evenodd"
            d="M36.575 25.943V14.82a3.03 3.03 0 0 0-2.042-2.866v16.402a41 41 0 0 0 2.041-2.414m-2.899 3.325a44 44 0 0 1-2.339 2.242 42.5 42.5 0 0 1-6.063 4.522h-11.79a3.03 3.03 0 0 1-3.03-3.03V12.03c0-.732.259-1.404.691-1.928A3.017 3.017 0 0 1 13.484 9h17.161c1.594 0 2.9 1.23 3.022 2.793v.005q.01.115.01.233v17.237M23.8 36.89c-1.405.774-2.8 1.42-4.157 1.932h-2.154a3.03 3.03 0 0 1-2.826-1.932zm-1.457-22.425c.154 4.475 3.603 8.066 7.9 8.227-4.297.16-7.746 3.752-7.9 8.228-.154-4.476-3.603-8.067-7.9-8.228 4.297-.16 7.746-3.752 7.9-8.227"
            clipRule="evenodd"
        />
    </svg>
);
export default SvgLogo;