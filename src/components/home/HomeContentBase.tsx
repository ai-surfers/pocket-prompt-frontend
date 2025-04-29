"use client";

import { PromptDetails } from "@/apis/prompt/prompt.model";
import VocModal from "@/components/home/VocModal";

import { promptConfigs } from "@/components/home/prompt/promptConfig";
import HomeSiderBar from "@/components/home/siderbarAd/HomeSiderBar";
import HomeLnb from "@/components/lnb/HomeLnb";
import { usePromptData } from "@/hooks/mutations/prompts/usePromptData";
import { useGetSubscription } from "@/hooks/queries/payments/useGetSubscription";

import { useSearch } from "@/hooks/queries/useSearch";
import { useUser } from "@/hooks/useUser";
import { useDeviceSize } from "@components/DeviceContext";
import Icon from "@components/common/Icon";
import { Wrapper } from "@components/layout/LayoutClient";
import { useState } from "react";
import styled from "styled-components";
import SearchSection from "./SearchSection";
import Banner from "./banner/Banner";
import PromptListSection from "./prompt/list/PromptListSection";

interface PromptData {
    top7Days: PromptDetails[];
    top30Days: PromptDetails[];
    allPrompts: PromptDetails[];
}

type HomeContentBaseProps = {
    promptType: "text" | "image";
    initialMenu: string;
};

export default function HomeContentBase({
    promptType,
    initialMenu,
}: HomeContentBaseProps) {
    const [isVocModalOpen, setIsVocModalOpen] = useState(false);
    const promptData = usePromptData(promptType);
    const { searchResults, isLoading } = useSearch(promptType);
    const { isUnderTablet } = useDeviceSize();
    const { userData } = useUser();
    const { data: userPaymentData } = useGetSubscription({
        isLogin: userData.isLogin,
    });
    const isSubscriber =
        userData.isLogin && userPaymentData?.subscription_status === "active";

    return (
        <HomeWrapper>
            <HomeContentWrapper $isUnderTablet={isUnderTablet}>
                <LeftSection>
                    <HomeLnb initialMenu={initialMenu} />
                    {!isSubscriber && (
                        <AdContainer $isUnderTablet={isUnderTablet}>
                            <HomeSiderBar />
                        </AdContainer>
                    )}
                </LeftSection>
                <ContentWrapper>
                    <Banner />
                    <SearchSection promptType={promptType} />
                    <PromptListSection
                        promptData={promptData}
                        searchResults={searchResults}
                        config={promptConfigs[promptType]}
                        isLoading={isLoading}
                    />
                </ContentWrapper>
            </HomeContentWrapper>
            <IconWrap onClick={() => setIsVocModalOpen(true)}>
                <Icon name="MessageText" color="white" size={30} />
            </IconWrap>
            <VocModal
                isOpen={isVocModalOpen}
                onClose={() => setIsVocModalOpen(false)}
            />
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
    position: relative;
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

const ContentWrapper = styled(Wrapper)`
    max-width: 1107px;
    width: 100vw;
    padding: 0 10px;
`;

const SearchSectionWrapper = styled.div`
    margin-bottom: 15px;
    width: 100%;
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const AdContainer = styled.div<{ $isUnderTablet: boolean }>`
    height: fit-content;
    display: ${({ $isUnderTablet }) => ($isUnderTablet ? "none" : "block")};
`;

const IconWrap = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: ${({ theme }) => theme.colors.G_900};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
