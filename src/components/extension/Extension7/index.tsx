import ArrowUpRight from "@svg/extension/ArrowUpRight";
import { DownloadButton, DownloadButtonText, IconWrap } from "../styles";
import {
    ContentWrap,
    Extension7BackgroundImage,
    Extension7Container,
    Title,
} from "./styles";
import BackgroundImage from "@img/extension/extension7-background-image.png";
const Extension7 = () => {
    return (
        <Extension7Container>
            <Extension7BackgroundImage src={BackgroundImage.src} />
            <ContentWrap>
                <Title>
                    GPT에 날개를 달아주는
                    <br />
                    최고의 프로그램
                </Title>
                <DownloadButton
                    href="https://chromewebstore.google.com/detail/pocket-prompt/ffinlaeadcgbhecidamekinhbfkdhodd?utm_source=official_website&utm_medium=download_button&utm_campaign=extension_landing_page"
                    target="_blank"
                >
                    <DownloadButtonText id="download-button">
                        무료 다운로드 하러가기
                    </DownloadButtonText>
                    <IconWrap>
                        <ArrowUpRight width={32} height={32} />
                    </IconWrap>
                </DownloadButton>
            </ContentWrap>
        </Extension7Container>
    );
};

export default Extension7;
