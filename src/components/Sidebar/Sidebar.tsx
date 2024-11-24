import { Logo } from "@/assets/svg";
import Close from "@/assets/svg/home/Close";
import LoginButton from "@/components/Header/LoginButton/LoginButton";
import GuideItem from "@/components/Sidebar/Item/GuideItem";
import MenuItem from "@/components/Sidebar/Item/MenuItem";
import { Menus } from "@/core/Menu";
import { useUser } from "@/hooks/useUser";
import { Drawer } from "antd";
import styled from "styled-components";

type SidebarProps = {
    open: boolean;
    onClose: () => void;
};
export default function Sidebar({ open, onClose }: SidebarProps) {
    const { userData } = useUser();

    return (
        <StyledDrawer
            id="drawer"
            className="drawer"
            width="100%"
            open={open}
            closable={false}
            style={{ background: "none" }}
        >
            <HeaderContainer>
                <Logo style={{ width: "44px" }} />
                <Close stroke="#3E4151" onClick={onClose} />
            </HeaderContainer>

            <BodyContainer>
                {!userData.isLogin && (
                    <div style={{ margin: "12px 20px" }}>
                        <LoginButton />
                    </div>
                )}

                {Menus.map((menu, idx) => (
                    <MenuItem menu={menu} key={idx} onClose={onClose} />
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
    padding: 12px 0;
`;
