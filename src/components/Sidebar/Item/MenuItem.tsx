import Text from "@/components/common/Text/Text";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

type MenuItemProps = {
    menu: {
        label: string;
        path: string;
    };
    onClose: () => void;
};
const MenuItem = ({ menu, onClose }: MenuItemProps) => {
    const location = useLocation();
    const selected = location.pathname === menu.path;

    const font = selected ? "b2_16_med" : "b2_16_reg";
    const color = selected ? "primary" : "G_400";

    const navigate = useNavigate();
    const handleOnNavigate = () => {
        navigate(menu.path);
        onClose();
    };
    return (
        <Item onClick={handleOnNavigate}>
            {selected && <Rectangle />}
            <Text font={font} color={color}>
                {menu.label}
            </Text>
        </Item>
    );
};

const Item = styled.div`
    width: 100%;
    padding: 14px 20px;
    position: relative;
    cursor: pointer;
`;

const Rectangle = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    border-radius: 0px 2px 2px 0px;
    background: ${({ theme }) => theme.colors.primary};
`;

export default MenuItem;
