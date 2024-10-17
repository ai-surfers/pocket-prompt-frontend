import {
    ContentCard,
    ContentCardTitle,
    ContentWrap,
    CotentImage,
    Button,
    ButtonText,
    Extension8Container,
    DownloadButton,
    DownloadButtonText,
} from "./styles";
import Icon1 from "@/assets/svg/extension/extension8-icon1.svg";
import Icon2 from "@/assets/svg/extension/extension8-icon2.svg";
import Icon3 from "@/assets/svg/extension/extension8-icon3.svg";

const Extension8 = () => {
    return (
        <Extension8Container>
            <ContentWrap>
                <ContentCard>
                    <ContentCardTitle>
                        포켓 프롬프트,
                        <br />
                        어렵다면?
                    </ContentCardTitle>
                    <CotentImage src={Icon1} />
                    <Button
                        href="https://chromewebstore.google.com/detail/pocket-prompt/ffinlaeadcgbhecidamekinhbfkdhodd?utm_source=official_website&utm_medium=download_button&utm_campaign=extension_landing_page"
                        target="_blank"
                    >
                        <ButtonText>사용 가이드 바로가기</ButtonText>
                    </Button>
                </ContentCard>
                <ContentCard>
                    <ContentCardTitle>
                        포켓 프롬프트,
                        <br />
                        지금 바로 사용하고 싶다면?
                    </ContentCardTitle>
                    <CotentImage src={Icon2} />
                    <DownloadButton
                        href="https://chromewebstore.google.com/detail/pocket-prompt/ffinlaeadcgbhecidamekinhbfkdhodd?utm_source=official_website&utm_medium=download_button&utm_campaign=extension_landing_page"
                        target="_blank"
                    >
                        <DownloadButtonText style={{}}>
                            다운로드 하러가기
                        </DownloadButtonText>
                    </DownloadButton>
                </ContentCard>
                <ContentCard>
                    <ContentCardTitle>
                        업데이트 로그가
                        <br />
                        궁금하다면?
                    </ContentCardTitle>
                    <CotentImage src={Icon3} />
                    <Button
                        href="https://chromewebstore.google.com/detail/pocket-prompt/ffinlaeadcgbhecidamekinhbfkdhodd?utm_source=official_website&utm_medium=download_button&utm_campaign=extension_landing_page"
                        target="_blank"
                    >
                        <ButtonText>업데이트 노트 바로가기</ButtonText>
                    </Button>
                </ContentCard>
            </ContentWrap>
        </Extension8Container>
    );
};

export default Extension8;
