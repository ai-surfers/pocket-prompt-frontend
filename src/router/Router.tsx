import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layouts/Layout";
import HomePage from "@/pages/home";
import PricePage from "@/pages/price";
import MyPage from "@/pages/my";
import ExtensionPage from "@/pages/extension";
import PromptNewPage from "@/pages/promptNew";
import FooterLayout from "@/layouts/FooterLayout";
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <NotFound />,
        element: <FooterLayout />,
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
        ],
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/prompt-new",
                element: <PromptNewPage />,
            },
            {
                path: "/my",
                element: <MyPage />,
            },
        ],
    },
]);

export default router;
