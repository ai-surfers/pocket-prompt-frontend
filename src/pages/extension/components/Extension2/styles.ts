import styled from "styled-components";

export const Extension2Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    height: 369px;
    width: 100%;
    background: #f7f8f9;
`;

export const Extension2Wrap = styled.div`
    max-width: 1440px;
    width: 100%;
    padding: 85px 95px 86px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
`;

export const CardWrap = styled.div`
    width: 406px;
    height: 198px;
    border-radius: 24px;
    background: #fff;

    /* container_big */
    box-shadow: 0px 0px 124px 0px rgba(117, 128, 234, 0.15);
`;

export const CardTitle = styled.p`
    color: var(--gray-600, #3e4151);
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 144%; /* 34.56px */
    margin-top: 24px;
`;

export const FeatureWrap = styled.div`
    display: flex;
    margin-left: 32px;
`;

export const FeatureText = styled.p`
    color: var(--gray-500, #5b5f70);
    margin-left: 12px;

    /* b1_18/reg */
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 27px */
`;

export const FeatureContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;
