import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import styled from "styled-components";

export default function Layout() {
    return (
        <LayoutContainer>
            <Header />
            <Outlet />
        </LayoutContainer>
    );
}

const LayoutContainer = styled.div`
    position: relative;
`;
