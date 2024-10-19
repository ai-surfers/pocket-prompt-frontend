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
    width: 100%;
    min-height: 100vh; // 전체 뷰포트 높이를 차지하도록 설정
    display: flex;
    flex-direction: column;
`;

export const Wrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    max-width: 1080px;
    padding-top: 60px;
    margin: 0 auto;
`;
