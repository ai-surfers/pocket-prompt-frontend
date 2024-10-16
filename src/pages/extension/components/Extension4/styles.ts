import styled from "styled-components";

export const Extension4Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    height: 540px;
    width: 100%;
    background: var(--primary_normal, #ffffff);
`;

export const Extension4Wrap = styled.div`
    display: flex;
    align-items: center;
    margin-left: 120px;
    margin-right: 120px;
    position: relative;
`;

export const TitleWrap = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-right: 144px;
`;

export const SubTitle = styled.p`
    color: var(--gray-400, #818491);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 144%; /* 34.56px */
`;

export const Title = styled.h2`
    color: var(--gray-800, #202232);
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 144%; /* 57.6px */
    letter-spacing: 1px;
`;

export const SpeechBalloonWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 333px;
`;

export const SpeechBalloon = styled.img`
    width: 500px;
    height: 333px;
    margin-right: 58px;
`;

export const PromptUsageDemo = styled.img`
    width: 255px;
    height: 480px;
    object-fit: cover;

    border-radius: 20px;
    background: lightgray 50% / cover no-repeat;
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
`;
