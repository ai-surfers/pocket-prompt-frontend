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
    primary_100: "#7580EA",
    primary_90: "#BBC0F5",
    primary_80: "#9199EE",
    primary_70: "#9FA7F1",
    primary_60: "#ACB3F2",
    primary_50: "#BBC0F5",
    primary_40: "#C8CCF7",
    primary_30: "#D6D9F9",
    primary_20: "#E3E6FB",
    primary_10: "#F2F3FD",
    primary_5: "#F8F8FE",
};

const fonts = {
    // 명칭
    header1: css`
        font-size: 24px;
        line-height: 144%; /* 34.56px */
        letter-spacing: -0.48px;
    `,
    header2: css`
        font-size: 20px;
        line-height: 144%; /* 28.8px */
        letter-spacing: -0.4px;
    `,
    body1: css`
        font-size: 18px;
        line-height: 150%; /* 27px */
        letter-spacing: -0.36px;
    `,
    body2: css`
        font-size: 16px;
        line-height: 150%; /* 24px */
    `,
    body3: css`
        font-size: 14px;
        line-height: 150%; /* 21px */
        letter-spacing: -0.28px;
    `,
    caption1: css`
        font-size: 12px;
        line-height: 150%; /* 18px */
    `,
    caption2: css`
        font-size: 11px;
        line-height: 150%; /* 16.5px */
    `,
    // 볼드
    bold: css`
        font-family: Pretendard;
        font-style: normal;
        font-weight: 700;
    `,
    semibold: css`
        font-family: Pretendard;
        font-style: normal;
        font-weight: 600;
    `,
    medium: css`
        font-family: Pretendard;
        font-style: normal;
        font-weight: 500;
    `,
    regular: css`
        font-family: Pretendard;
        font-style: normal;
        font-weight: 400;
    `,

    /** 조합으로 쓰고 싶은 경우, 명칭_크기_볼드 순으로 작성 */
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
    h1_24_med: css`
        font-family: Pretendard;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: 144%; /* 34.56px */
        letter-spacing: -0.48px;
    `,
    h1_24_reg: css`
        font-family: Pretendard;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 144%; /* 34.56px */
        letter-spacing: -0.48px;
    `,
    h2_20_bold: css`
        /* h2_20/bold */
        font-family: Pretendard;
        font-size: 1.25rem;
        line-height: 144%; /* 28.8px */
        letter-spacing: -0.4px;
        font-style: normal;
        font-weight: 700;
    `,
    b1_18_bold: css`
        /* b1_18/bold */
        font-family: Pretendard;
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 700;
        line-height: 150%; /* 1.6875rem */
        letter-spacing: -0.0225rem;
    `,
    b2_16_semi: css`
        /* b2_16/semi */
        font-family: Pretendard;
        font-size: 1rem;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 1.5rem */
    `,
    b3_14_reg: css`
        /* b3_14/reg */
        font-family: Pretendard;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 1.3125rem */
        letter-spacing: -0.0175rem;
    `,
    c1_12_semi: css`
        /* c1_12/semi */
        font-family: Pretendard;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 600;
        line-height: 150%; /* 1.125rem */
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
