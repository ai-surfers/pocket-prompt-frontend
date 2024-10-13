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
} from "./styles";
import PromptUsagedemoImage from "@/assets/images/extension/prompt-usage-demo.png";

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
                    <SpeechBalloon></SpeechBalloon>
                </SpeechBalloonWrap>
                <div style={{ position: "relative" }}>
                    <PromptUsageDemo
                        src={PromptUsagedemoImage}
                        alt="프롬프트 사용 데모"
                    />
                    <PromptUsageDemoBlur />
                </div>
            </Extension4Wrap>
        </Extension4Container>
    );
};

export default Extension4;
