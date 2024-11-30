import Banner from "./components/Banner/Banner";
import { Wrapper } from "@/layouts/Layout";
import styled from "styled-components";
import LNB from "./components/LNB/LNB";

import PaginatedPromptSection from "./components/Prompt/PaginatedPromptSection";
import useDeviceSize from "@/hooks/useDeviceSize";

export default function HomePage() {
    const { isUnderTablet } = useDeviceSize();

    return (
        <HomeWrapper>
            <HomeContentWrapper $isUnderTablet={isUnderTablet}>
                <LNB />
                <ContentWrapper>
                    <BannerWrapper>
                        <Banner />
                    </BannerWrapper>
                    <PaginatedPromptSection />
                </ContentWrapper>
            </HomeContentWrapper>
        </HomeWrapper>
    );
}

const HomeWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox()}
    gap: 40px;
    padding-top: 80px;
    align-items: start;
`;

const HomeContentWrapper = styled.div<{ $isUnderTablet: boolean }>`
    ${({ theme, $isUnderTablet }) =>
        theme.mixins.flexBox(
            $isUnderTablet ? "column" : "row",
            "center",
            "start"
        )};
    gap: ${({ $isUnderTablet }) => ($isUnderTablet ? "20px" : "40px")};
    margin: auto;
`;

const ContentWrapper = styled(Wrapper)`
    max-width: 1107px;
    width: 100vw;
    padding: 0 10px;
`;

const BannerWrapper = styled.div`
    margin-bottom: 15px;
    width: 100%;
`;
