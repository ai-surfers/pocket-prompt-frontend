import Footer from "@/components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function FooterLayout() {
    return (
        <div style={{ width: "100vw" }}>
            <Outlet />
            <Footer />
        </div>
    );
}
