import Banner from "./components/Banner/Banner";
import { Wrapper } from "@/layouts/Layout";
import Prompt from "./components/Prompt/Prompt";
import styled from "styled-components";
import LNB from "./components/LNB/LNB";

export default function HomePage() {
    return (
        <HomeWrapper>
            <LNB />
            <ContentWrapper>
                <BannerWrapper>
                    <Banner />
                </BannerWrapper>
                <SectionWrapper>
                    <Title>🔥 지금 인기 있는 프롬프트</Title>
                    <PromptWrapper>
                        <Prompt colored={true} />
                    </PromptWrapper>
                </SectionWrapper>
                <SectionWrapper>
                    <Title>📖 전체 프롬프트</Title>
                    <PromptWrapper>
                        <Prompt colored={false} />
                        <Prompt colored={false} />
                        <Prompt colored={false} />
                        <Prompt colored={false} />
                        <Prompt colored={false} />
                        <Prompt colored={false} />
                    </PromptWrapper>
                </SectionWrapper>
            </ContentWrapper>
        </HomeWrapper>
    );
}

const HomeWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox()}
    gap: 40px;
    margin-top: 92px;
    align-items: start;
`;

const ContentWrapper = styled(Wrapper)`
    max-width: 1107px;
    padding: 0;
`;

const BannerWrapper = styled.div`
    margin-bottom: 15px;
`;

const SectionWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "start")};
    gap: 12px;
    margin: 9px 0 44px 0;
`;

const Title = styled.div`
    ${({ theme }) => theme.colors.G_800};
    ${({ theme }) => theme.fonts.header1};
    ${({ theme }) => theme.fonts.bold};
`;

const PromptWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "start", "start")};
    align-content: flex-start;
    gap: 16px;
    flex-wrap: wrap;
    box-sizing: border-box;
`;
