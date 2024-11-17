import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import Styles from "./styles";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./apis/queryClient";
import { RecoilRoot } from "recoil";
import Toast from "./components/common/Toast/Toast";
import * as Sentry from "@sentry/react";
import GlobalModal from "@/components/common/Modal/GlobalModal";

function App() {
    console.log(`🍀 Environment - ${import.meta.env.MODE}`);

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

    return (
        <Styles>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <Toast />
                    <GlobalModal />
                </QueryClientProvider>
            </RecoilRoot>
        </Styles>
    );
}

export default App;
