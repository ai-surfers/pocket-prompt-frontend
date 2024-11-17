import { getUser } from "@/apis/auth/auth";
import useToast from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { LOCALSTORAGE_KEYS, setLocalStorage } from "@/utils/storageUtils";
import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const { userData, setUser } = useUser();

    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");

    const showToast = useToast();

    // Extension에서 넘어온 경우, token으로 자동 로그인 체크
    useEffect(() => {
        const checkLogin = async () => {
            if (token) {
                setLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN, token);

                try {
                    const res = await getUser();
                    const { data } = res.data;
                    setUser(data);
                } catch (error) {
                    console.error("로그인 실패:", error);
                } finally {
                    searchParams.delete("token");
                    setSearchParams(searchParams, { replace: true });
                }
            }

            setLoading(false);
        };

        checkLogin();
    }, [token, setUser, searchParams, setSearchParams]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData || !userData.isLogin) {
        showToast("로그인 후 이용 가능합니다.", "");

        return <Navigate to="/" replace={true} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
