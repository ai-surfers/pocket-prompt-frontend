import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layouts/Layout";
import HomePage from "@/pages/home";
import PricePage from "@/pages/price";
import MyPage from "@/pages/my";
import ExtensionPage from "@/pages/extension";
import PromptNewPage from "@/pages/promptNew";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/extension",
                element: <ExtensionPage />,
            },
            {
                path: "/price",
                element: <PricePage />,
            },
            {
                path: "/my",
                element: <MyPage />,
            },
            {
                path: "/prompt-new",
                element: <PromptNewPage />,
            },
        ],
    },
]);

export default router;
