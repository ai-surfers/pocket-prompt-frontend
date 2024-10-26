import { useUser } from "@/hooks/useUser";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { userData } = useUser();

    if (!userData || !userData.isLogin) {
        alert("로그인 후 이용 가능합니다.");
        return <Navigate to="/" replace={true} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
