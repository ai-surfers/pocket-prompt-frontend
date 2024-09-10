import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";
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

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;

    max-width: 1080px;
    padding-top: 60px;
    margin: 0 auto;
`;
