import Footer from "@/components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function FooterLayout() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
}
