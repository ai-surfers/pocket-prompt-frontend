import {
    ContentWrap,
    Extension1Container,
    Extension1Wrap,
    MainTitle,
    SubTitle,
    DemoVideo,
    VideoWrap,
    BelowDownloadButtonText,
} from "./styles";
import ArrowUpRight from "@svg/extension/ArrowUpRight";
import DemoVideoGif from "@img/extension/pocket-prompt-demo-video.gif";
import { DownloadButton, DownloadButtonText, IconWrap } from "../styles";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { useEffect, useState } from "react";
const Extension1 = () => {
    const isUnderTablet = useMediaQuery({
        maxWidth: "1024px",
    });

    return (
        <Extension1Container>
            {isUnderTablet ? (
                <Extension1Wrap>
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
                    <VideoWrap>
                        <DemoVideo
                            src={DemoVideoGif.src}
                            alt="Pocket Prompt 데모 비디오"
                        />
                    </VideoWrap>
                    <DownloadButton
                        href="https://chromewebstore.google.com/detail/pocket-prompt/ffinlaeadcgbhecidamekinhbfkdhodd?utm_source=official_website&utm_medium=download_button&utm_campaign=extension_landing_page"
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
                </Extension1Wrap>
            ) : (
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
                            href="https://chromewebstore.google.com/detail/pocket-prompt/ffinlaeadcgbhecidamekinhbfkdhodd?utm_source=official_website&utm_medium=download_button&utm_campaign=extension_landing_page"
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
                    <VideoWrap>
                        <DemoVideo
                            src={DemoVideoGif.src}
                            alt="Pocket Prompt 데모 비디오"
                        />
                    </VideoWrap>
                </Extension1Wrap>
            )}
        </Extension1Container>
    );
};

export default Extension1;
