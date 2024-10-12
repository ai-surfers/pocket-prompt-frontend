import {
    ContentWrap,
    DownloadButton,
    DownloadButtonText,
    Extension1Container,
    Extension1Wrap,
    IconWrap,
    MainTitle,
    SubTitle,
    DemoVideo,
    BelowDownloadButtonText,
} from "./styles";
import ArrowUpRight from "@/assets/svg/extension/ArrowUpRight";
import DemoVideoGif from "@/assets/images/extension/pocket-prompt-demo-video.gif";
const Extension1 = () => {
    return (
        <Extension1Container>
            <Extension1Wrap>
                <ContentWrap>
                    <SubTitle>
                        프롬프트를 언제 어디서나
                        <br />
                        쉽게 꺼내 쓸 수 있는
                    </SubTitle>
                    <MainTitle>
                        Pocket Prompt
                        <br />
                        Extension
                    </MainTitle>
                    <DownloadButton
                        href="https://chromewebstore.google.com/detail/pocket-prompt/jgjgjgjgjgjgjgjgjgjgjgjgjgjgjgjg"
                        target="_blank"
                    >
                        <DownloadButtonText>
                            무료 다운로드 하러가기
                        </DownloadButtonText>
                        <IconWrap>
                            <ArrowUpRight width={32} height={32} />
                        </IconWrap>
                    </DownloadButton>
                    <BelowDownloadButtonText fontWeight="normal">
                        무료로 크롬 익스텐션을 다운로드하고
                    </BelowDownloadButtonText>
                    <BelowDownloadButtonText fontWeight="bold">
                        당신의 챗GPT에 날개를 달아주세요
                    </BelowDownloadButtonText>
                </ContentWrap>
                <DemoVideo src={DemoVideoGif} alt="Pocket Prompt 데모 비디오" />
            </Extension1Wrap>
        </Extension1Container>
    );
};

export default Extension1;
