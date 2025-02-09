import styled from "styled-components";

export const Extension3Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    background: var(--primary_normal, #7580ea);
`;

export const Extension3Wrap = styled.div`
    max-width: 1440px;
    padding-top: 82px;
    display: flex;
    justify-content: space-between;
    gap: 38px;

    @media screen and (max-width: 1279px) {
        padding-top: 45px;
        flex-direction: column;
        align-items: center;
    }

    @media screen and (max-width: 1024px) {
        gap: 47px;
        padding: 80px 0px 72px;
    }
`;

export const DemoImage = styled.img`
    width: 783px;
    height: 450px;
    border-radius: 16px 16px 0px 0px;
    border: 8px solid #fff;
    object-fit: cover;

    @media screen and (max-width: 1279px) {
        width: 528px;
        height: 303px;
    }

    @media screen and (max-width: 1024px) {
        border-radius: 16px;
        width: 497px;
        height: 286px;
    }

    @media screen and (max-width: 768px) {
        margin-right: 40%;
    }
`;
export const TitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
`;

export const SubTitle = styled.p`
    color: #fff;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 144%; /* 34.56px */

    @media screen and (max-width: 1279px) {
        text-align: center;
    }

    @media screen and (max-width: 1024px) {
        font-size: 18px;
    }
`;

export const MainTitle = styled.h2`
    color: #fff;
    font-family: Pretendard;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 144%;

    @media screen and (max-width: 1279px) {
        text-align: center;
    }

    @media screen and (max-width: 1024px) {
        font-size: 28px;
    }
`;
