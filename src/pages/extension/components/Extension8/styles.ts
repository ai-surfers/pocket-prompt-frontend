import styled from "styled-components";

export const Extension8Container = styled.div`
    padding: 99px 0px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1024px) {
        padding: 60px;
    }
`;

export const ContentWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 120px;

    @media screen and (max-width: 1024px) {
        flex-direction: column;
        gap: 60px;
    }
`;

export const ContentCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const ContentCardTitle = styled.p`
    color: var(--gray-800, #202232);
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 144%; /* 28.8px */
    letter-spacing: -0.4px;
    margin-bottom: 24px;
`;

export const CotentImage = styled.img`
    margin-bottom: 16px;
`;

export const Button = styled.a`
    display: flex;
    width: 200px;
    height: 52px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 12px;
    background: var(--primary-10, #f2f3fd);
`;

export const ButtonText = styled.p`
    color: var(--primary_normal, #7580ea);
    text-align: center;
    /* b2_16/semi */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
`;

export const DownloadButton = styled.a`
    display: flex;
    width: 200px;
    height: 52px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 12px;
    background: var(--primary_normal, #7580ea);
`;

export const DownloadButtonText = styled.p`
    color: #fff;
    text-align: center;
    /* b2_16/semi */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
`;
