import ReactQueryProvider from "@/components/ReactQueryProvider";
import RecoilProvider from "@/components/RecoilProvider";
import GlobalModal from "@/components/common/Modal/GlobalModal";
import Toast from "@/components/common/Toast/Toast";
import PrevPathUpdater from "@/components/home/prompt/PrevPathUpdater";
import LayoutClient from "@/components/layout/LayoutClient";
import Styles from "@/styles";
import { detectDevice } from "@/utils/deviceUtils";
import { DeviceProvider } from "@components/DeviceContext";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";

const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";

const pretendard = localFont({
    src: "../fonts/PretendardVariable.woff2",
    display: "swap",
    weight: "400 900",
    variable: "--font-pretendard",
});

export const defaultMetadata: Metadata = {
    title: "포켓 프롬프트 - ChatGPT 프롬프트 모음 | AI 프롬프트 사이트",
    keywords:
        "ChatGPT 프롬프트, AI 프롬프트 사이트, AI 프롬프트, 프롬프트 엔지니어링, AI 프롬프트 모음, AI 활용법",
    description:
        "ChatGPT, Claude 등 AI 프롬프트 작성이 어려우신가요? 검증된 프롬프트 템플릿을 저장하고 바로 사용하세요!",
    icons: {
        icon: `${webUrl}/img/logo_white_square.png`,
    },
    openGraph: {
        title: "포켓 프롬프트 - ChatGPT 프롬프트 모음 | AI 프롬프트 사이트",
        description:
            "ChatGPT, Claude 등 AI 프롬프트 작성이 어려우신가요? 검증된 프롬프트 템플릿을 저장하고 바로 사용하세요!",
        url: webUrl,
        type: "website",
        siteName: "Pocket Prompt",
        images: [
            {
                type: "image/svg",
                url: `${webUrl}/img/shared-thumbnail.png`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "포켓 프롬프트 - ChatGPT 프롬프트 모음 | AI 프롬프트 사이트",
        description:
            "ChatGPT, Claude 등 AI 프롬프트 작성이 어려우신가요? 검증된 프롬프트 템플릿을 저장하고 바로 사용하세요!",
        images: [`${webUrl}/img/shared-thumbnail.png`],
    },
};

export const metadata = defaultMetadata;

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { isMobile, isUnderTablet } = detectDevice(
        headers().get("user-agent") || ""
    );

    return (
        <DeviceProvider isUnderTablet={isUnderTablet} isMobile={isMobile}>
            <html lang="ko" className={`${pretendard.variable}`}>
                <head>
                    {/* Google Tag Manager */}
                    <Script id="gtm-script" strategy="afterInteractive">
                        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NV4289B5');`}
                    </Script>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <Script
                        strategy="afterInteractive"
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3373210774302054"
                        crossOrigin="anonymous"
                    />
                    {/* Naver Search Advisor */}
                    <meta
                        name="naver-site-verification"
                        content="d443f76797693978bd171adda208aedfcef580e7"
                    />
                </head>
                <body>
                    {/* Google Tag Manager (noscript) */}
                    <noscript>
                        <iframe
                            src="https://www.googletagmanager.com/ns.html?id=GTM-NV4289B5"
                            height="0"
                            width="0"
                            style={{ display: "none", visibility: "hidden" }}
                        ></iframe>
                    </noscript>
                    <Styles>
                        <ReactQueryProvider>
                            <RecoilProvider>
                                <PrevPathUpdater />
                                <LayoutClient>{children}</LayoutClient>
                                <Toast />
                                <GlobalModal />
                            </RecoilProvider>
                        </ReactQueryProvider>
                    </Styles>
                </body>
            </html>
        </DeviceProvider>
    );
}
