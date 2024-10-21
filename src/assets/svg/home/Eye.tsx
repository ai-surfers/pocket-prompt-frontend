import type { SVGProps } from "react";

const Eye = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={props.width || 20}
        height={props.height || 21}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g id="vuesax/linear/eye">
            <g id="eye">
                <path
                    id="Vector"
                    d="M12.9833 10.5C12.9833 12.15 11.6499 13.4833 9.99993 13.4833C8.34993 13.4833 7.0166 12.15 7.0166 10.5C7.0166 8.85 8.34993 7.51667 9.99993 7.51667C11.6499 7.51667 12.9833 8.85 12.9833 10.5Z"
                    stroke={props.color || "#818491"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    id="Vector_2"
                    d="M9.99987 17.3917C12.9415 17.3917 15.6832 15.6583 17.5915 12.6583C18.3415 11.4833 18.3415 9.50833 17.5915 8.33333C15.6832 5.33333 12.9415 3.6 9.99987 3.6C7.0582 3.6 4.31654 5.33333 2.4082 8.33333C1.6582 9.50833 1.6582 11.4833 2.4082 12.6583C4.31654 15.6583 7.0582 17.3917 9.99987 17.3917Z"
                    stroke={props.color || "#818491"}
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </g>
        </g>
    </svg>
);

export default Eye;
