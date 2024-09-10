import SvgLogoPrimary from "@/assets/svg/LogoPrimary";
import styled from "styled-components";

export default function Header() {
    return (
        <HeaderContainer>
            <HeaderLeftContainer>
                <SvgLogoPrimary style={{ width: 30 }} />
            </HeaderLeftContainer>
            <HeaderRightContainer></HeaderRightContainer>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
    width: 100%;
    background: #fff;
    border: 1px solid black;

    ${({ theme }) => theme.mixins.flexBox("row", "space-between")};
    height: 52px;
    padding: 0px 120px;

    opacity: var(--sds-size-stroke-border);
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(40px);

    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
`;

const HeaderLeftContainer = styled.div``;
const HeaderRightContainer = styled.div``;
