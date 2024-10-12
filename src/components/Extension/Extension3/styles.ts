import styled from "styled-components";

export const Extension3Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    height: 532px;
    width: 100%;
    background: var(--primary_normal, #7580ea);
`;

export const Extension3Wrap = styled.div`
    max-width: 1440px;
    width: 100%;
    padding: 82px 120px 0px;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    & > *:first-child {
        margin-right: auto;
    }

    & > *:last-child {
        margin-left: auto;
    }
`;

export const DemoImage = styled.img`
    width: 783px;
    height: 450px;
    border-radius: 16px 16px 0px 0px;
    border: 8px solid #fff;
    object-fit: cover;
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
`;

export const MainTitle = styled.h2`
    color: #fff;
    font-family: Pretendard;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 144%;
`;
