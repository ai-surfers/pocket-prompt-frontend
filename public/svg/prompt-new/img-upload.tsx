import type { SVGProps } from "react";

const ImgUploadIcon = ({
    stroke = "#818491",
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M14.0703 19.2513V13.418"
            stroke={stroke}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M16.9163 16.332H11.083"
            stroke={stroke}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M25.6663 12.832V19.832C25.6663 24.4987 24.4997 25.6654 19.833 25.6654H8.16634C3.49967 25.6654 2.33301 24.4987 2.33301 19.832V8.16536C2.33301 3.4987 3.49967 2.33203 8.16634 2.33203H9.91634C11.6663 2.33203 12.0513 2.84536 12.7163 3.73203L14.4663 6.06536C14.9097 6.6487 15.1663 6.9987 16.333 6.9987H19.833C24.4997 6.9987 25.6663 8.16536 25.6663 12.832Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeMiterlimit="10"
        />
    </svg>
);

export default ImgUploadIcon;
