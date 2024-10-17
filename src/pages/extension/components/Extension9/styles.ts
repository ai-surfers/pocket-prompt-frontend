import styled from "styled-components";

export const Extension9Container = styled.div`
    padding: 40px 80px;
    background: var(--gray-50, #f7f8f9);
    display: flex;
    padding: 40px 80px;
    flex-direction: column;
    gap: 10px;
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

export const ToggleContainer = styled.div`
    border-radius: 12px;
    background: var(--white, #fff);
    display: flex;
    padding: 12px 20px;
    flex-direction: column;
`;

export const ToggleHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
`;

export const ToggleHeaderTitle = styled.span`
    color: var(--gray-600, #3e4151);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 27px */
    letter-spacing: -0.36px;

    span {
        color: var(--gray-300, #afb1c1);
        font-weight: 500;
        margin-right: 8px;
    }
`;

export const ToggleContent = styled.div<{ opened: boolean }>`
    display: ${({ opened }) => (opened ? "flex" : "none")};
    margin-top: 12px;

    span {
        font-family: Pretendard;
        font-size: 18px;
        font-style: normal;
        line-height: 150%; /* 27px */
        letter-spacing: -0.36px;
        font-weight: 500;
        color: var(--primary-100, #7580ea);
        margin-right: 8px;
    }
`;

export const ToggleContentText = styled.p`
    color: var(--gray-500, #5b5f70);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 27px */
    letter-spacing: -0.36px;

    a {
        text-decoration: underline;
    }
`;
