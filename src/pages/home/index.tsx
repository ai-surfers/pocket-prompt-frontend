import Banner from "./components/Banner/Banner";
import { Wrapper } from "@/layouts/Layout";
import styled from "styled-components";
import LNB from "./components/LNB/LNB";

import PaginatedPromptSection from "./components/Prompt/PaginatedPromptSection";

export default function HomePage() {
    return (
        <HomeWrapper>
            <HomeContentWrapper>
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
    padding-top: 92px;
    align-items: start;
    width: 100vw;
    background-color: white;
`;

const HomeContentWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "center", "start")};
    gap: 40px;
    margin: auto;
`;

const ContentWrapper = styled(Wrapper)`
    max-width: 1107px;
    padding: 0;
`;

const BannerWrapper = styled.div`
    margin-bottom: 15px;
`;
