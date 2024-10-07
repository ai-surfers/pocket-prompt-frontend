// 2024.10.08 jiwoochris가 작성.
// 제가 Front-end를 아예 모릅니다 아마 처음부터 갈아 엎어야 할거예요...
// Footer를 급하게 작성했습니다. 발퍼블 죄송합니다 🙏


import React from 'react'; 
import styled from 'styled-components'; 

const FooterWrapper = styled.div` 
  width: 100%; 
  background: #202232; 
  padding: 40px 80px; 
  color: white; 
  font-family: 'Pretendard', sans-serif; 
`;

const NavLinks = styled.div` 
  display: flex; 
  gap: 24px; 
  margin-bottom: 20px; 
`;

const NavLink = styled.a` 
  font-size: 18px; 
  font-weight: 400; 
  line-height: 27px; 
  color: white; 
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div` 
  font-size: 18px; 
  font-weight: 400; 
  line-height: 27px; 
`;

const CompanyName = styled.div` 
  font-size: 18px; 
  font-weight: 700; 
  line-height: 27px; 
  margin-bottom: 8px; 
`;

const InfoSection = styled.div` 
  display: flex; 
  gap: 40px; 
`;

const InfoColumn = styled.div` 
  display: flex; 
  flex-direction: column; 
  gap: 2px; 
`;

const InfoText = styled.div` 
  font-size: 14px; 
  font-weight: 400; 
  line-height: 21px; 
  color: #CBD5E1; 
`;

const Logo = styled.div` 
  width: 150px; 
  height: 150px; 
  position: absolute; 
  right: 80px; 
  top: 72px; 
`;

const Footer: React.FC = () => { 
  return ( 
    <FooterWrapper> 
      <NavLinks> 
        <NavLink href="https://pocket-prompt.notion.site/da477857a0cc44888b06dd23cf6682ff" target="_blank" rel="noopener noreferrer">사용 가이드</NavLink> 
        <Divider>|</Divider> 
        <NavLink href="https://pocket-prompt.notion.site/Release-Note-fffd02185fca8083bad2ea2cbf1c3420" target="_blank" rel="noopener noreferrer">업데이트 노트</NavLink> 
        <Divider>|</Divider> 
        <NavLink href="https://pocket-prompt.notion.site/6dc9bbd2599a46d3bbcac24a18848770" target="_blank" rel="noopener noreferrer">개인정보처리방침</NavLink> 
      </NavLinks> 
      <CompanyName>레코듀 (RECORD:U)</CompanyName> 
      <InfoSection> 
        <InfoColumn> 
          <InfoText>대표자명: 안대철</InfoText> 
          <InfoText>사업자등록번호 : 170-55-00823</InfoText> 
          <InfoText>통신판매업 신고번호 : 제 2024-용인수지-0698 호</InfoText> 
        </InfoColumn> 
        <InfoColumn> 
          <InfoText>사업장 주소: 경기도 용인시 수지구 현암로 148, 6층 2호</InfoText> 
          <InfoText>고객센터: 010-5675-1056</InfoText> 
          <InfoText>이메일: yoonkwonai@gmail.com</InfoText> 
        </InfoColumn> 
      </InfoSection> 
      <Logo> 
        {/* Add your SVG or image here */} 
      </Logo> 
    </FooterWrapper> 
  ); 
};

export default Footer;