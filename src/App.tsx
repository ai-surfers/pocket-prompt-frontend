import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import Styles from "./styles";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./apis/queryClient";
import { RecoilRoot } from "recoil";
import Toast from "./components/common/Toast/Toast";

function App() {
    console.log(`🍀 Environment - ${import.meta.env.MODE}`);
    return (
        <Styles>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <Toast />
                </QueryClientProvider>
            </RecoilRoot>
        </Styles>
    );
}

export default App;
