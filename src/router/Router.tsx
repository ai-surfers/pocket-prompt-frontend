import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts/Layout";
import LayoutWithFooter from "@/layouts/LayoutWithFooter";
import ExtensionPage from "@/pages/Extension";
import HomePage from "@/pages/Home";
import MyPage from "@/pages/My";
import PricePage from "@/pages/Price";
import PromptNewPage from "@/pages/PromptNew";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutWithFooter />,
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
        ],
    },
]);

export default router;
