import { css, keyframes } from "styled-components";

const colors = {
    white: "#FFFFFF",
    black: "#060812",
    G_900: "#181B29",
    G_800: "#202232",
    G_700: "#2E3040",
    G_600: "#3E4151",
    G_500: "#5B5F70",
    G_400: "#818491",
    G_300: "#C5C7CF",
    G_200: "#DEE0E8",
    G_100: "#F1F2F6",
    G_50: "#F7F8F9",
    primary: "#7580EA",
    primary_dark: "#535DBF",
    primary_light: "#9EADFC",
    primary_xlight: "#CEDEFF",
};

/** 폰트 결정 시 수정 될 예정 */
const fonts = {
    h1_24_bold: css`
        /* h1_24/bold */
        font-family: Pretendard;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 144%; /* 34.56px */
        letter-spacing: -0.48px;
    `,
    h1_24_semi: css`
        /* h1_24/semi */
        font-family: Pretendard;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 144%; /* 34.56px */
        letter-spacing: -0.48px;
    `,
    b2_16_semi: css`
        /* b2_16/semi */
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 24px */
    `,
    b2_16_reg: css`
        /* b2_16/reg */
        font-family: Pretendard;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 24px */
    `,
    b3_14_semi: css`
        /* b3_14/semi */
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 21px */
        letter-spacing: -0.28px;
    `,
    b3_14_med: css`
        /* b3_14/med */
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 21px */
        letter-spacing: -0.28px;
    `,
    b3_14_reg: css`
        /* b3_14/reg */
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 21px */
        letter-spacing: -0.28px;
    `,
};

/* 믹스인 */
const mixins = {
    flexBox: (direction = "row", justify = "center", align = "center") => css`
        display: flex;
        flex-direction: ${direction};
        align-items: ${align};
        justify-content: ${justify};
    `,
    skeleton: () => {
        const moveRight = keyframes`
      0% {
        transform: translateX(-200%);
      }
      100% {
        transform: translateX(1100%);
      }
    `;

        return css`
            position: relative;

            background: #e5e7eb;
            overflow: hidden;

            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 10%;
                height: 100%;
                background: #d1d5db;
                box-shadow: 0px 0px 50px 30px #d1d5db;
                animation: ${moveRight} 1s infinite linear;
            }
        `;
    },
    slideUp: () => {
        const slideUp = keyframes`
            from {
                transform: translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        `;

        return css`
            animation: ${slideUp} 0.5s ease-in-out;
        `;
    },
    fadeIn: () => {
        const fadeIn = keyframes`
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      `;

        return css`
            animation: ${fadeIn} 0.5s ease-in-out;
        `;
    },
    slideUpWFadeIn: () => {
        const slideUp = keyframes`
                from {
                    transform: translateY(20px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            `;
        const fadeIn = keyframes`
            from {
            opacity: 0;
            }
            to {
            opacity: 1;
            }
        `;

        return css`
            animation: ${fadeIn} 0.5s ease-in-out, ${slideUp} 0.5s ease-in-out;
        `;
    },
};

const theme = { colors, fonts, mixins };

export default theme;
