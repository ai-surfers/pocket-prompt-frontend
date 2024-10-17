import {
    AIPlatformsIcon,
    AIPlatformsIconWrap,
    ContentWrap,
    Extension5Container,
    Extension5Wrap,
    LogoImage,
    SubTitle,
    Title,
} from "./styles";
import GPTIcon from "@/assets/images/extension/gpt-icon.png";
import ClaudeIcon from "@/assets/images/extension/claude-icon.png";
import GeminiIcon from "@/assets/images/extension/gemini-icon.png";
import Logo from "@/assets/svg/extension/logo.svg";

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
                    <AIPlatformsIcon src={GPTIcon} />
                    <AIPlatformsIcon src={ClaudeIcon} />
                    <AIPlatformsIcon src={GeminiIcon} />
                </AIPlatformsIconWrap>
                <LogoImage src={Logo} alt="로고 이미지" />
            </Extension5Wrap>
        </Extension5Container>
    );
};

export default Extension5;
