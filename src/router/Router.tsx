import { createBrowserRouter } from "react-router-dom";

import Layout from "@/layouts/Layout";
import HomePage from "@/pages/Home";
import PricePage from "@/pages/Price";
import MyPage from "@/pages/My";
import ExtensionPage from "@/pages/Extension";

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
