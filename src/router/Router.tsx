import { createBrowserRouter, createHashRouter } from "react-router-dom";

import Layout from "@/layouts/Layout";
import HomePage from "@/pages/home/HomePage";
import PricePage from "@/pages/price/PricePage";
import MyPage from "@/pages/my/MyPage";
import ExtensionPage from "@/pages/extension/ExtensionPage";

const isGitHubPages = window.location.hostname === "ai-surfers.github.io/";
const createRouter = isGitHubPages ? createHashRouter : createBrowserRouter;
console.log("🔎 isGitHubPages - ", isGitHubPages);

const router = createRouter([
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
        ],
    },
]);

export default router;
