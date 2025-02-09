import {
    AIPlatformsIcon,
    AIPlatformsIconWrap,
    ContentWrap,
    Extension5Container,
    Extension5Wrap,
    LogoImage,
    SubTitle,
    Title,
    GeminiIconImg,
} from "./styles";
import GPTIcon from "@img/extension/gpt-icon.png";
import ClaudeIcon from "@img/extension/claude-icon.png";
import GeminiIcon from "@img/extension/gemini-icon.png";
import Logo from "@svg/extension/logo.svg";

const Extension5 = () => {
    return (
        <Extension5Container>
            <Extension5Wrap>
                <ContentWrap>
                    <SubTitle>어떤 AI 플랫폼에서도 호환 가능한</SubTitle>
                    <SubTitle className="bold">궁극의 크롬 익스텐션</SubTitle>
                    <Title>
                        언제 어디서나,
                        <br />
                        포켓 프롬프트와 함께!
                    </Title>
                </ContentWrap>
                <AIPlatformsIconWrap>
                    <AIPlatformsIcon src={GPTIcon.src} />
                    <AIPlatformsIcon src={ClaudeIcon.src} />
                    <GeminiIconImg src={GeminiIcon.src} />
                </AIPlatformsIconWrap>
                <LogoImage src={Logo.src} alt="로고 이미지" />
            </Extension5Wrap>
        </Extension5Container>
    );
};

export default Extension5;
