import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import Styles from "./styles";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./apis/queryClient";

function App() {
    return (
        <Styles>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </Styles>
    );
}

export default App;
