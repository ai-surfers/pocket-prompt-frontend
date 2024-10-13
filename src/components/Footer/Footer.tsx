// 2024.10.08 jiwoochris가 작성.
// 제가 Front-end를 아예 모릅니다 아마 처음부터 갈아 엎어야 할거예요...
// Footer를 급하게 작성했습니다. 발퍼블 죄송합니다 🙏

import React from "react";
import LogoImage from "@/assets/images/logo-white.png";
import {
    CompanyName,
    Divider,
    FooterWrapper,
    InfoColumn,
    InfoText,
    InfoSection,
    Logo,
    NavLink,
    NavLinks,
    ContentWrap,
} from "./styles";

const Footer: React.FC = () => {
    return (
        <FooterWrapper>
            <ContentWrap>
                <NavLinks>
                    <NavLink
                        href="https://pocket-prompt.notion.site/da477857a0cc44888b06dd23cf6682ff"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        사용 가이드
                    </NavLink>
                    <Divider>|</Divider>
                    <NavLink
                        href="https://pocket-prompt.notion.site/Release-Note-fffd02185fca8083bad2ea2cbf1c3420"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        업데이트 노트
                    </NavLink>
                    <Divider>|</Divider>
                    <NavLink
                        href="https://pocket-prompt.notion.site/6dc9bbd2599a46d3bbcac24a18848770"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        개인정보처리방침
                    </NavLink>
                </NavLinks>
                <CompanyName>레코듀 (RECORD:U)</CompanyName>
                <InfoSection>
                    <InfoColumn>
                        <InfoText>대표자명: 안대철</InfoText>
                        <InfoText>사업자등록번호 : 170-55-00823</InfoText>
                        <InfoText>
                            통신판매업 신고번호 : 제 2024-용인수지-0698 호
                        </InfoText>
                    </InfoColumn>
                    <InfoColumn>
                        <InfoText>
                            사업장 주소: 경기도 용인시 수지구 현암로 148, 6층
                            2호
                        </InfoText>
                        <InfoText>고객센터: 010-5675-1056</InfoText>
                        <InfoText>이메일: yoonkwonai@gmail.com</InfoText>
                    </InfoColumn>
                </InfoSection>
            </ContentWrap>
            <Logo src={LogoImage} />
        </FooterWrapper>
    );
};

export default Footer;
