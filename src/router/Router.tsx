import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layouts/Layout";
import HomePage from "@/pages/home/HomePage";
import PricePage from "@/pages/price/PricePage";
import MyPage from "@/pages/my/MyPage";
import ExtensionPage from "@/pages/extension/ExtensionPage";

const router = createBrowserRouter(
    [
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
    ],
    {
        basename: import.meta.env.BASE_URL,
    }
);

export default router;
