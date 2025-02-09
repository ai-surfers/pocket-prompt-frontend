import styled from "styled-components";

export const Extension9Container = styled.div`
    padding: 40px 80px;
    background: var(--gray-50, #f7f8f9);
    display: flex;
    padding: 40px 80px;
    flex-direction: column;
    gap: 10px;

    @media screen and (max-width: 1279px) {
        padding: 40px;
    }

    @media screen and (max-width: 1024px) {
        padding: 40px 32px;
    }
`;

export const Title = styled.p`
    color: var(--gray-800, #202232);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 144%; /* 34.56px */
    letter-spacing: -0.48px;
`;
