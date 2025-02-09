import styled from "styled-components";

export const Extension5Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    height: 532px;
    width: 100%;
    background: var(--primary_normal, #7580ea);

    @media screen and (max-width: 1024px) {
        height: 600px;
        align-items: center;
    }
`;

export const Extension5Wrap = styled.div`
    position: relative;
`;

export const ContentWrap = styled.div`
    margin-top: 72px;

    @media screen and (max-width: 1024px) {
        margin-top: 0px;
    }
`;

export const SubTitle = styled.p`
    color: var(--primary-20, #e3e6fb);
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -1px;

    &.bold {
        font-weight: 700;
        margin-bottom: 16px;
    }

    @media screen and (max-width: 1024px) {
        font-size: 20px;
        &.bold {
            margin-bottom: 12px;
        }
    }
`;

export const Title = styled.h1`
    color: var(--white, #fff);
    text-align: center;
    font-family: Pretendard;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: 136%;
    letter-spacing: -1px;
    margin-bottom: 60px;

    @media screen and (max-width: 1279px) {
        font-size: 40px;
        margin-bottom: 74px;
    }

    @media screen and (max-width: 1024px) {
        font-size: 32px;
        margin-bottom: 35px;
    }
`;

export const AIPlatformsIconWrap = styled.div`
    display: flex;
    gap: 40px;
    justify-content: center;

    @media screen and (max-width: 1024px) {
        gap: 24px;
    }
`;

export const AIPlatformsIcon = styled.img`
    height: 98px;
    object-fit: contain;

    @media screen and (max-width: 1024px) {
        height: 64px;
    }
`;

export const GeminiIconImg = styled.img`
    height: 76px;
    object-fit: contain;

    @media screen and (max-width: 1024px) {
        height: 50px;
    }
`;

export const LogoImage = styled.img`
    position: absolute;
    top: -26px;
    left: -167px;
    opacity: 0.2;
    width: 354px;
    height: 341px;

    @media screen and (max-width: 1279px) {
        width: 236px;
        height: 227px;
        top: 25px;
        left: -79px;
    }

    @media screen and (max-width: 1024px) {
        width: 222px;
        height: 214px;
        top: -90px;
        left: -44px;
    }
`;
