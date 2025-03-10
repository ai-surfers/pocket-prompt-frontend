"use client";

import HomeLnb from "@/components/lnb/HomeLnb";
import PromptListSection from "@/components/home/prompt/PromptListSection";
import { useDeviceSize } from "@components/DeviceContext";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function SavedPromptPage() {
    const { isUnderTablet } = useDeviceSize();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        setIsInitialized(true);
    }, []);

    if (!isInitialized) {
        return null; // hydration 에러 방지
    }

    return (
        <HomeWrapper>
            <HomeContentWrapper $isUnderTablet={isUnderTablet}>
                <HomeLnb initialMenu="4" />
                <ContentWrapper>
                    <PromptListSection viewType="starred" />
                </ContentWrapper>
            </HomeContentWrapper>
        </HomeWrapper>
    );
}

const HomeWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox()}
    gap: 40px;
    padding-top: 92px;
    align-items: start;
    width: 100vw;
    background-color: white;
`;

const HomeContentWrapper = styled.div<{ $isUnderTablet: boolean }>`
    ${({ theme, $isUnderTablet }) =>
        theme.mixins.flexBox(
            $isUnderTablet ? "column" : "row",
            "center",
            "start"
        )};
    gap: ${({ $isUnderTablet }) => ($isUnderTablet ? "20px" : "40px")};
    margin: 0 auto;
`;

const ContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    max-width: 1107px;
    width: 100vw;
    padding: 0 10px;
    padding-top: 0;
`;
