import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    return (
        <div>
            <Button onClick={() => navigate("/price")}>결제 화면</Button>
            <Button onClick={() => navigate("/my")}>구독 화면</Button>
        </div>
    );
}
