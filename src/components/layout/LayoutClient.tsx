"use client";

import Header from "../header";
import Sidebar from "../sidebar";
import { useState } from "react";
import styled from "styled-components";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <LayoutContainer>
            <Header onOpen={() => setIsOpen(true)} />
            <Sidebar open={isOpen} onClose={() => setIsOpen(false)} />
            <ContentWrapper>{children}</ContentWrapper>
        </LayoutContainer>
    );
}

const LayoutContainer = styled.div`
    position: relative;
    min-height: 100vh; // 전체 뷰포트 높이를 차지하도록 설정
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex: 1; // 남은 공간을 모두 차지하도록 설정
`;

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    max-width: 1080px;
    padding-top: 60px;
    margin: 0 auto;
`;
