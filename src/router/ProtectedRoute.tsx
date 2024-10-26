import { useUser } from "@/hooks/useUser";
import { LOCALSTORAGE_KEYS, setLocalStorage } from "@/utils/storageUtils";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { userData } = useUser();
    const location = useLocation();

    if (!userData || !userData.isLogin) {
        setLocalStorage(LOCALSTORAGE_KEYS.REDIRECT_URL, location.pathname);
        alert("로그인 후 이용 가능합니다.");

        return <Navigate to="/" replace={true} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
