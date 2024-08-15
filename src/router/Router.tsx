import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import HomePage from "../pages/home/HomePage";
import PricePage from "../pages/price/PricePage";

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
                path: "/price",
                element: <PricePage />,
            },
        ],
    },
]);

export default router;
