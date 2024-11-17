import {
    Extension4Container,
    Extension4Wrap,
    TitleWrap,
    Title,
    SubTitle,
    SpeechBalloonWrap,
    SpeechBalloon,
    PromptUsageDemo,
    PromptUsageDemoBlur,
    SpeechBallonMouseImage,
    PromptUsageWrap,
} from "./styles";
import PromptUsagedemoImage from "@/assets/images/extension/prompt-usage-demo.png";
import SpeechBalloonPromptImage from "@/assets/images/extension/speech-balloon-prompt.png";
import MouseImage from "@/assets/images/extension/mouse-image.png";

const Extension4 = () => {
    return (
        <Extension4Container>
            <Extension4Wrap>
                <TitleWrap>
                    <SubTitle>이제 프롬프트 고민은? Bye</SubTitle>
                    <Title>
                        클릭 한 번으로
                        <br />
                        나만의 프롬프트를
                        <br />
                        쉽고 빠르게!
                    </Title>
                </TitleWrap>
                <SpeechBalloonWrap>
                    <SpeechBalloon
                        src={SpeechBalloonPromptImage}
                        alt="말풍선 프롬프트"
                    />
                </SpeechBalloonWrap>
                <PromptUsageWrap>
                    <PromptUsageDemo
                        src={PromptUsagedemoImage}
                        alt="프롬프트 사용 데모"
                    />
                    <PromptUsageDemoBlur />
                </PromptUsageWrap>
                <SpeechBallonMouseImage src={MouseImage} alt="마우스" />
            </Extension4Wrap>
        </Extension4Container>
    );
};

export default Extension4;
