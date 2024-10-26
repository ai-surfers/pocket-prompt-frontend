import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Result
            status="warning"
            title="존재하지 않는 페이지입니다."
            extra={
                <Button
                    type="primary"
                    key="console"
                    onClick={() => navigate("/", { replace: true })}
                >
                    홈으로 이동
                </Button>
            }
        />
    );
}
