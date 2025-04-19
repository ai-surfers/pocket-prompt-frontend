import { SVGProps } from "react";

const Picture = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="37"
        height="54"
        viewBox="0 0 37 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <rect
            width="24.8341"
            height="17.7441"
            rx={2}
            transform="matrix(0.697993 -0.716105 0.718207 0.69583 2.46777 18.6348)"
            fill="url(#paint0_linear_6035_37926)"
        />
        <rect
            width="29.4333"
            height="20.9959"
            rx={2}
            transform="matrix(0.870822 -0.491598 0.493849 0.869548 0.642578 17.2207)"
            fill="url(#paint1_linear_6035_37926)"
        />
        {/* Remove or omit the xmlns from this div if TS complains */}
        <foreignObject
            x="-4.54725"
            y="5.26916"
            width="44.1072"
            height="36.7722"
        >
            <div
                style={{
                    backdropFilter: "blur(2.59px)",
                    clipPath: "url(#bgblur_0_6035_37926_clip_path)",
                    height: "100%",
                    width: "100%",
                }}
            />
        </foreignObject>
        <rect
            data-figma-bg-blur-radius="5.18983"
            x="0.761944"
            y="10.5784"
            width="33.4887"
            height="26.1543"
            rx="2.88063"
            fill="#7580EA"
            fillOpacity={0.4}
            stroke="url(#paint2_linear_6035_37926)"
            strokeWidth="0.238732"
        />
        <rect
            x="3.99219"
            y="13.7207"
            width="27.0267"
            height="19.9796"
            rx={1.5}
            stroke="url(#paint3_linear_6035_37926)"
            strokeOpacity={0.4}
        />
        <path
            d="M8.42537 20.6951C9.80586 20.6951 10.925 19.5793 10.925 18.203C10.925 16.8267 9.80586 15.7109 8.42537 15.7109C7.04489 15.7109 5.92578 16.8267 5.92578 18.203C5.92578 19.5793 7.04489 20.6951 8.42537 20.6951Z"
            fill="white"
            fillOpacity={0.7}
        />
        <path
            d="M25.2198 17.5544L31.5639 22.5059V32.1548C31.5639 33.2594 30.6685 34.1548 29.5639 34.1548H8.4248L21.0114 18.0705C22.0315 16.7669 23.9148 16.5359 25.2198 17.5544Z"
            fill="white"
            fillOpacity={0.6}
        />
        <defs>
            <clipPath
                id="bgblur_0_6035_37926_clip_path"
                transform="translate(4.54725 -5.26916)"
            >
                <rect
                    x="0.761944"
                    y="10.5784"
                    width="33.4887"
                    height="26.1543"
                    rx="2.88063"
                />
            </clipPath>
            <linearGradient
                id="paint0_linear_6035_37926"
                x1="6.66123"
                y1="6.02098"
                x2="26.6664"
                y2="3.17147"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#7580EA" />
                <stop offset="1" stopColor="#C7CCFF" />
            </linearGradient>
            <linearGradient
                id="paint1_linear_6035_37926"
                x1="14.7167"
                y1={0}
                x2="14.7167"
                y2="20.9959"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#7580EA" />
                <stop offset="1" stopColor="#C7CCFF" />
            </linearGradient>
            <linearGradient
                id="paint2_linear_6035_37926"
                x1="36.349"
                y1="11.9674"
                x2="13.7006"
                y2="61.7603"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity={0} />
            </linearGradient>
            <linearGradient
                id="paint3_linear_6035_37926"
                x1="41.494"
                y1="10.069"
                x2="19.6971"
                y2="57.1057"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity={0} />
            </linearGradient>
        </defs>
    </svg>
);

export default Picture;
