import styled from "styled-components";

export const Extension5Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    height: 532px;
    width: 100%;
    background: var(--primary_normal, #7580ea);
`;

export const Extension5Wrap = styled.div``;

export const ContentWrap = styled.div`
    margin-top: 72px;
    margin-left: 480px;
    margin-right: 480px;
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
`;

export const AIPlatformsIconWrap = styled.div`
    display: flex;
    gap: 40px;
    justify-content: center;
`;

export const AIPlatformsIcon = styled.img`
    height: 98px;
    object-fit: contain;
`;
