import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layouts/Layout";
import HomePage from "@/pages/home";
import PricePage from "@/pages/price";
import MyPage from "@/pages/my";
import ExtensionPage from "@/pages/extension";

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
        ],
    },
]);

export default router;
