import styled from "styled-components";

export const Extension2Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    background: #f7f8f9;
`;

export const Extension2Wrap = styled.div`
    max-width: 1440px;
    width: 100%;
    padding: 85px 0px 86px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    @media screen and (max-width: 1490px) {
        padding: 85px 40px;
    }

    @media screen and (max-width: 1023px) {
        flex-direction: column;
    }
`;

export const CardWrap = styled.div`
    // width: 406px;
    width: 100%;
    height: 198px;
    border-radius: 24px;
    background: #fff;

    /* container_big */
    box-shadow: 0px 0px 124px 0px rgba(117, 128, 234, 0.15);

    @media screen and (max-width: 1490px) {
        height: 149px;
    }

    @media screen and (max-width: 1023px) {
        width: 348px;
        height: 177px;
    }
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

    @media screen and (max-width: 1490px) {
        font-size: 18px;
        margin-top: 18px;
    }

    @media screen and (max-width: 1024px) {
        font-size: 20px;
        margin-top: 24px;
    }
`;

export const FeatureWrap = styled.div`
    display: flex;
    margin-left: 32px;
    align-items: center;

    @media screen and (max-width: 1490px) {
        margin-left: 24px;
    }
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

    @media screen and (max-width: 1490px) {
        font-size: 14px;
        margin-left: 9px;
    }

    @media screen and (max-width: 1024px) {
        margin-left: 12px;
    }
`;

export const FeatureContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;

    @media screen and (max-width: 1490px) {
        margin-top: 12px;
    }

    @media screen and (max-width: 1024px) {
        margin-top: 20px;
    }
`;
