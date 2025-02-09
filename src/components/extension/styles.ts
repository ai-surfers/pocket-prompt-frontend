import styled from "styled-components";

export const DownloadButton = styled.a`
    display: flex;
    width: 380px;
    height: 60px;
    border-radius: 12px;
    background: #7580ea;
    padding: 8px 12px 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    margin-bottom: 12px;

    @media screen and (max-width: 1279px) {
        width: 268px;
    }
`;

export const DownloadButtonText = styled.p`
    color: #ffffff;
    text-align: center;
    flex: 1 0 0;

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 144%; /* 28.8px */
    letter-spacing: 0px;

    @media screen and (max-width: 1279px) {
        width: 268px;
        font-size: 18px;
    }
`;

export const IconWrap = styled.div`
    display: flex;
    flex-shrink: 0;
`;
