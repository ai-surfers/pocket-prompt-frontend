import styled from "styled-components";

export const FooterWrapper = styled.div`
    width: 100%;
    background: #202232;
    padding: 40px 80px;
    color: white;
    font-family: "Pretendard", sans-serif;
    display: flex;
`;

export const ContentWrap = styled.div`
    flex: 1;
`;

export const NavLinks = styled.div`
    display: flex;
    gap: 24px;
    margin-bottom: 20px;
`;

export const NavLink = styled.a`
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
    color: white;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export const Divider = styled.div`
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
`;

export const CompanyName = styled.div`
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
    margin-bottom: 8px;
`;

export const InfoSection = styled.div`
    display: flex;
    gap: 40px;
`;

export const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const InfoText = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: #cbd5e1;
`;

export const Logo = styled.img`
    width: 150px;
    height: 150px;
`;
