import styled from "styled-components";

export const Extension4Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    padding-top: 60px;
    width: 100%;
    background: var(--primary_normal, #ffffff);

    @media screen and (max-width: 1279px) {
        padding-top: 133px;
    }

    @media screen and (max-width: 1024px) {
        padding-top: 80px;
    }
`;

export const Extension4Wrap = styled.div`
    display: flex;
    align-items: center;
    margin-left: 40px;
    margin-right: 40px;
    position: relative;

    @media screen and (max-width: 1279px) {
        align-items: flex-start;
    }

    @media screen and (max-width: 1024px) {
        flex-direction: column;
        padding-bottom: 155px;
        align-items: center;
    }

    @media screen and (max-width: 767px) {
        margin-left: 0px;
        align-items: flex-start;
    }
`;

export const TitleWrap = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-right: 144px;

    @media screen and (max-width: 1279px) {
        margin-right: 0px;
    }
`;

export const SubTitle = styled.p`
    color: var(--gray-400, #818491);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 144%; /* 34.56px */

    @media screen and (max-width: 1279px) {
        margin-top: 35px;
    }

    @media screen and (max-width: 1024px) {
        margin-top: 0px;
        font-size: 18px;
        text-align: center;
    }

    @media screen and (max-width: 767px) {
        text-align: left;
    }
`;

export const Title = styled.h2`
    color: var(--gray-800, #202232);
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 144%; /* 57.6px */
    letter-spacing: 1px;

    @media screen and (max-width: 1024px) {
        font-size: 24px;
        text-align: center;
        margin-bottom: 24px;
    }

    @media screen and (max-width: 767px) {
        text-align: left;
    }
`;

export const SpeechBalloonWrap = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 333px;

    @media screen and (max-width: 1279px) {
        width: 420px;
        height: 281px;
        margin-top: 50px;
    }

    @media screen and (max-width: 1024px) {
        width: 278px;
        height: 200px;
        margin-top: 0px;
    }
`;

export const SpeechBallonMouseImage = styled.img`
    position: absolute;
    z-index: 2;
    width: 113px;
    height: 96px;
    bottom: 26px;
    right: 309px;

    @media screen and (max-width: 1279px) {
        margin-right: 40px;
        width: 95px;
        height: 81px;
        bottom: 35px;
        right: 195px;
    }

    @media screen and (max-width: 1024px) {
        width: 61.539px;
        height: 52.283px;
        right: 42px;
        bottom: 90px;
    }
`;

export const SpeechBalloon = styled.img`
    width: 500px;
    height: 333px;
    margin-right: 20px;

    @media screen and (max-width: 1279px) {
        margin-right: -40px;
        width: 420px;
        height: 281px;
    }

    @media screen and (max-width: 1024px) {
        width: 278px;
        height: 200px;
        margin-right: 0px;
    }
`;

export const PromptUsageDemo = styled.img`
    width: 255px;
    height: 480px;
    object-fit: cover;
    border-radius: 20px;
    background: lightgray 50% / cover no-repeat;

    @media screen and (max-width: 1279px) {
        width: 216px;
        height: 404px;
    }

    @media screen and (max-width: 1024px) {
        width: 151px;
        height: 285px;
    }
`;

export const PromptUsageDemoBlur = styled.div`
    position: absolute;
    bottom: 0;
    width: 255px;
    height: 97px;
    flex-shrink: 0;
    background: linear-gradient(
        180deg,
        rgba(249, 249, 254, 0) -17.42%,
        #f9f9fe 71.91%
    );

    @media screen and (max-width: 1279px) {
        width: 216px;
        height: 70px;
    }

    @media screen and (max-width: 1024px) {
        width: 151px;
        height: 70px;
        bottom: -40px;
    }
`;

export const PromptUsageWrap = styled.div`
    z-index: 1;
    @media screen and (max-width: 1024px) {
        position: absolute;
        bottom: 40px;
        right: -50px;
    }
`;
