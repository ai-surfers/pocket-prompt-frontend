import { Logo } from "@/assets/svg";
import Close from "@/assets/svg/home/Close";
import Text from "@/components/common/Text/Text";
import LoginButton from "@/components/Header/LoginButton/LoginButton";
import Icon from "@/pages/home/components/common/Icon";
import { Drawer, Flex } from "antd";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Menus = [
    {
        label: "Home",
        path: "/",
    },
    {
        label: "Extension",
        path: "/extension",
    },
    {
        label: "Pricing",
        path: "/price",
    },
];
export default function Sidebar() {
    return (
        <StyledDrawer
            id="drawer"
            className="drawer"
            width="100%"
            open={true}
            closable={false}
            style={{ background: "none" }}
        >
            <HeaderContainer>
                <Logo style={{ width: "44px" }} />
                <Close stroke="#3E4151" />
            </HeaderContainer>

            <BodyContainer>
                <div style={{ margin: "0 20px 12px" }}>
                    <LoginButton />
                </div>

                {Menus.map((menu, idx) => (
                    <MenuItem menu={menu} key={idx} />
                ))}
                <GuideItem />
            </BodyContainer>
        </StyledDrawer>
    );
}

const StyledDrawer = styled(Drawer)`
    .ant-drawer-body {
        padding: 0;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(40px);
    }
`;

const HeaderContainer = styled.header`
    width: 100%;

    height: 52px;
    padding: 4px 20px;

    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(40px);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.02);

    position: sticky;
    top: 0;
    left: 0;

    ${({ theme }) => theme.mixins.flexBox("row", "space-between")};
`;

const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 24px 0;
`;

type MenuItemProps = {
    menu: {
        label: string;
        path: string;
    };
};
const MenuItem = ({ menu }: MenuItemProps) => {
    const location = useLocation();
    const selected = location.pathname === menu.path;
    const font = selected ? "b2_16_med" : "b2_16_reg";
    const color = selected ? "primary" : "G_400";

    return (
        <Item>
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

const GuideItem = () => {
    return (
        <Item>
            <Flex justify="space-between">
                <Flex gap={8}>
                    <Icon name="Book" />
                    <Text font="b2_16_reg" color="primary">
                        Guide
                    </Text>
                </Flex>
                <Icon name="ExportSquare" />
            </Flex>
        </Item>
    );
};
