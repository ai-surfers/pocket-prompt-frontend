import type { SVGProps } from "react";

const Image = ({
    width = 20,
    height = 21,
    stroke = "#818491",
    fill = "#FFFFFF",
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill={fill}
        {...props}
    >
        <path
            d="M21.6799 16.9601L18.5499 9.65013C17.4899 7.17013 15.5399 7.07013 14.2299 9.43013L12.3399 12.8401C11.3799 14.5701 9.58993 14.7201 8.34993 13.1701L8.12993 12.8901C6.83993 11.2701 5.01993 11.4701 4.08993 13.3201L2.36993 16.7701C1.15993 19.1701 2.90993 22.0001 5.58993 22.0001H18.3499C20.9499 22.0001 22.6999 19.3501 21.6799 16.9601Z"
            stroke={stroke}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M6.96973 8C8.62658 8 9.96973 6.65685 9.96973 5C9.96973 3.34315 8.62658 2 6.96973 2C5.31287 2 3.96973 3.34315 3.96973 5C3.96973 6.65685 5.31287 8 6.96973 8Z"
            stroke={stroke}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

export default Image;
