import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import Styles from "./styles";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./apis/queryClient";
import { RecoilRoot } from "recoil";
import Toast from "./components/common/Toast/Toast";
import * as Sentry from "@sentry/react";
import GlobalModal from "@/components/common/Modal/GlobalModal";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import { HelmetProvider } from "react-helmet-async";
import MetaTags from "./components/common/MetaTags/MetaTags";

function App() {
    console.log(`🍀 Environment - ${import.meta.env.MODE}`);

    useEffect(() => {
        /** Sentry */
        if (import.meta.env.MODE === "production") {
            Sentry.init({
                dsn: import.meta.env.VITE_SENTRY_DSN,
                environment: process.env.NODE_ENV,
                integrations: [
                    Sentry.browserTracingIntegration(),
                    Sentry.replayIntegration(),
                ],
                // Tracing
                tracesSampleRate: 1.0, //  Capture 100% of the transactions

                // Session Replay
                replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
                replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
            });
        }

        /** GTM */
        const GTM_ID = import.meta.env.VITE_GTM_ID;
        if (GTM_ID) {
            TagManager.initialize({ gtmId: GTM_ID });
        }
    }, []);

    return (
        <HelmetProvider>
            <MetaTags
                title="포켓 프롬프트 - ChatGPT 프롬프트 모음 | AI 프롬프트 템플릿 저장소"
                description="ChatGPT, Claude 등 AI 프롬프트 작성이 어려우신가요? 검증된 프롬프트 템플릿을 저장하고 바로 사용하세요!"
                url="https://pocket-prompt.com/"
            />
            <Styles>
                <RecoilRoot>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router} />
                        <Toast />
                        <GlobalModal />
                    </QueryClientProvider>
                </RecoilRoot>
            </Styles>
        </HelmetProvider>
    );
}

export default App;
