import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import styled from "styled-components";

export default function Layout() {
    return (
        <LayoutContainer>
            <Header />

            <Wrapper>
                <Outlet />
            </Wrapper>
        </LayoutContainer>
    );
}

const LayoutContainer = styled.div`
    position: relative;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding-top: 60px;
`;
