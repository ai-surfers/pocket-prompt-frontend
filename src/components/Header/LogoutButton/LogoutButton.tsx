import Button from "@/components/common/Button/Button";
import { useUser } from "@/hooks/useUser";
import { LOCALSTORAGE_KEYS, removeLocalStorage } from "@/utils/storageUtils";
import Text from "@/components/common/Text/Text";
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
    isUnderTablet: boolean;
}

const LogoutButton = ({ isUnderTablet }: LogoutButtonProps) => {
    const { resetUserState } = useUser();
    const navigate = useNavigate();

    function handleLogout() {
        removeLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
        resetUserState();
        navigate("/", { replace: true });
    }
    return (
        <Button
            hierarchy="default"
            size={isUnderTablet ? 44 : 36}
            style={{ justifyContent: "center" }}
            onClick={handleLogout}
        >
            <Text
                font={isUnderTablet ? "b3_14_med" : "b3_14_semi"}
                color="G_400"
            >
                로그아웃
            </Text>
        </Button>
    );
};

export default LogoutButton;
