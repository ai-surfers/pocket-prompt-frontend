import styled from "styled-components";

export const Extension7Container = styled.div`
    position: relative;
    width: 100%;
    height: 630px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Extension7BackgroundImage = styled.img`
    width: 100%;
    height: 630px;

    @media screen and (max-width: 1279px) {
        width: 1440px;
    }
`;

export const Title = styled.p`
    color: var(--white, #fff);
    text-align: center;
    font-family: Pretendard;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 144%; /* 51.84px */
    letter-spacing: -0.72px;
    margin-bottom: 28px;

    @media screen and (max-width: 1279px) {
        font-size: 28px;
    }
`;

export const ContentWrap = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
