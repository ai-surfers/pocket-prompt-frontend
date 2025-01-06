import Banner from "./components/Banner/Banner";
import { Wrapper } from "@/layouts/Layout";
import styled from "styled-components";
import LNB, { MenuItemsType } from "../../components/LNB/LNB";
import PaginatedPromptSection from "./components/Prompt/PaginatedPromptSection";
import Button from "@/components/common/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Text from "@/components/common/Text/Text";
import Icon from "@/components/common/Icon";
import useToast from "@/hooks/useToast";
import useDeviceSize from "@/hooks/useDeviceSize";
import { useEffect, useState } from "react";
import { useResetRecoilState } from "recoil";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import MetaTags from "@/components/common/MetaTags/MetaTags";

export default function HomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const showToast = useToast();
    const { isUnderTablet } = useDeviceSize();
    const [promptListType, setPromptListType] = useState("text");
    const resetSearchedKeyword = useResetRecoilState(searchedKeywordState);
    const resetSearchedCategory = useResetRecoilState(searchedCategoryState);

    const menuItems: MenuItemsType[] = [
        {
            key: "1",
            label: "텍스트 프롬프트",
            iconType: "TextBlock",
            onClick: () => setPromptListType("text"),
            "data-tracking-id": "text-prompt",
        },
        {
            key: "2",
            label: "이미지 프롬프트",
            iconType: "Image",
            onClick: () =>
                showToast({
                    title: "이미지 프롬프트는 아직 준비 중인 기능이에요.",
                    subTitle:
                        "더 많은 프롬프트 탐색을 위해 빠르게 준비하고 있을게요!",
                    iconName: "Timer",
                }),
            disabled: true,
            "data-tracking-id": "image-prompt",
        },
        {
            key: "3",
            label: "동영상 프롬프트",
            iconType: "Video",
            onClick: () =>
                showToast({
                    title: `동영상 프롬프트는 아직 준비 중인 기능이에요.`,
                    subTitle:
                        "더 많은 프롬프트 탐색을 위해 빠르게 준비하고 있을게요!",
                    iconName: "Timer",
                }),
            disabled: true,
            "data-tracking-id": "video-prompt",
        },
        ...(isUnderTablet
            ? []
            : [{ type: "divider" as const, key: "divider-1" }]),
        {
            key: "4",
            label: "저장한 프롬프트",
            iconType: "Bookmark",
            onClick: () => setPromptListType("saved"),
            "data-tracking-id": "saved-prompt",
        },
    ];

    const handleClickNewButton = () => {
        navigate("/prompt-new");
    };

    const newPropmptButton = (
        <Button
            onClick={handleClickNewButton}
            style={{ padding: "8px 12px", gap: 2 }}
            size={isUnderTablet ? 40 : 52}
        >
            <Icon name="Add" color="white" size={20} />
            <Text font="b2_16_semi" color="white">
                프롬프트 등록
            </Text>
        </Button>
    );

    const promptContent = () => {
        if (promptListType === "text") {
            return (
                <>
                    <BannerWrapper>
                        <Banner />
                    </BannerWrapper>
                    <PaginatedPromptSection />
                </>
            );
        } else {
            return <PaginatedPromptSection viewType="starred" />;
        }
    };

    useEffect(() => {
        resetSearchedKeyword();
        resetSearchedCategory();
    }, [promptListType, resetSearchedCategory, resetSearchedKeyword]);

    useEffect(() => {
        if (location.pathname === "/" && location.state?.resetPromptList) {
            setPromptListType("text");
        }
    }, [location, navigate]);

    return (
        <HomeWrapper>
            <MetaTags
                title="포켓 프롬프트 - ChatGPT 프롬프트 모음 | AI 프롬프트 템플릿 저장소"
                description="ChatGPT, Claude 등 AI 프롬프트 작성이 어려우신가요? 검증된 프롬프트 템플릿을 저장하고 바로 사용하세요!"
                url="https://pocket-prompt.com/"
            />
            <HomeContentWrapper $isUnderTablet={isUnderTablet}>
                <LNB menuItems={menuItems} button={newPropmptButton} />
                <ContentWrapper>{promptContent()}</ContentWrapper>
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

const ContentWrapper = styled(Wrapper)`
    max-width: 1107px;
    width: 100vw;
    padding: 0 10px;
`;

const BannerWrapper = styled.div`
    margin-bottom: 15px;
    width: 100%;
`;
