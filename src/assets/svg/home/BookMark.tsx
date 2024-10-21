import type { SVGProps } from "react";

const BookMark = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={props.width || 20}
        height={props.height || 21}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g id="vuesax/linear/frame">
            <g id="frame">
                <path
                    id="Vector"
                    d="M7.70801 8.04167C9.19134 8.58334 10.808 8.58334 12.2913 8.04167"
                    stroke={props.color || "#818491"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    id="Vector_2"
                    d="M14.0166 2.16667H5.98327C4.20827 2.16667 2.7666 3.61667 2.7666 5.38334V17.125C2.7666 18.625 3.8416 19.2583 5.15827 18.5333L9.22493 16.275C9.65827 16.0333 10.3583 16.0333 10.7833 16.275L14.8499 18.5333C16.1666 19.2667 17.2416 18.6333 17.2416 17.125V5.38334C17.2333 3.61667 15.7916 2.16667 14.0166 2.16667Z"
                    stroke={props.color || "#818491"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    id="Vector_3"
                    d="M14.0166 2.16667H5.98327C4.20827 2.16667 2.7666 3.61667 2.7666 5.38334V17.125C2.7666 18.625 3.8416 19.2583 5.15827 18.5333L9.22493 16.275C9.65827 16.0333 10.3583 16.0333 10.7833 16.275L14.8499 18.5333C16.1666 19.2667 17.2416 18.6333 17.2416 17.125V5.38334C17.2333 3.61667 15.7916 2.16667 14.0166 2.16667Z"
                    stroke={props.color || "#818491"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </g>
        </g>
    </svg>
);

export default BookMark;
