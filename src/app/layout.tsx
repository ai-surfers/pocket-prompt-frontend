import type { Metadata } from "next";
import "./globals.css";
import Styles from "@/styles";
import RecoilProvider from "@/components/RecoilProvider";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import LayoutClient from "@/components/layout/LayoutClient";
import Toast from "@/components/common/Toast/Toast";
import GlobalModal from "@/components/common/Modal/GlobalModal";

const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";

export const defaultMetadata: Metadata = {
    title: "포켓 프롬프트 - ChatGPT 프롬프트 모음 | AI 프롬프트 템플릿 저장소",
    keywords:
        "ChatGPT 프롬프트, AI 프롬프트 템플릿, 프롬프트 엔지니어링, 프롬프트 모음, AI 활용법, 프롬프트 저장, 프롬프트 공유, ChatGPT 활용, Claude 프롬프트",
    description:
        "ChatGPT, Claude 등 AI 프롬프트 작성이 어려우신가요? 검증된 프롬프트 템플릿을 저장하고 바로 사용하세요!",
    icons: {
        icon: `${webUrl}/img/logo_white_square.png`,
    },
    openGraph: {
        title: "포켓 프롬프트 - ChatGPT 프롬프트 모음 | AI 프롬프트 템플릿 저장소",
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
        title: "포켓 프롬프트 - ChatGPT 프롬프트 모음 | AI 프롬프트 템플릿 저장소",
        description:
            "ChatGPT, Claude 등 AI 프롬프트 작성이 어려우신가요? 검증된 프롬프트 템플릿을 저장하고 바로 사용하세요!",
        images: [`${webUrl}/img/shared-thumbnail.png`],
    },
};

export const metadata = defaultMetadata;

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ko">
            <head>
                {/* Google Tag Manager */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NV4289B5');`,
                    }}
                />

                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="stylesheet"
                    crossOrigin="anonymous"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
                />
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3373210774302054"
                    crossOrigin="anonymous"
                ></script>
            </head>
            <body>
                {/* Google Tag Manager */}
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NV4289B5" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                    }}
                ></noscript>
                <Styles>
                    <ReactQueryProvider>
                        <RecoilProvider>
                            <LayoutClient>{children}</LayoutClient>
                            <Toast />
                            <GlobalModal />
                        </RecoilProvider>
                    </ReactQueryProvider>
                </Styles>
            </body>
        </html>
    );
}
