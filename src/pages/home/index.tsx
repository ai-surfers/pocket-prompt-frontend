import Banner from "./components/Banner/Banner";
import { Wrapper } from "@/layouts/Layout";
import styled from "styled-components";
import LNB, { MenuItemsType } from "../../components/LNB/LNB";
import PaginatedPromptSection from "./components/Prompt/PaginatedPromptSection";
import Button from "@/components/common/Button/Button";
import { useNavigate } from "react-router-dom";
import Text from "@/components/common/Text/Text";
import Icon from "@/components/common/Icon";
import useToast from "@/hooks/useToast";
import useDeviceSize from "@/hooks/useDeviceSize";

export default function HomePage() {
    const navigate = useNavigate();
    const showToast = useToast();
    const { isUnderTablet } = useDeviceSize();

    const menuItems: MenuItemsType[] = [
        {
            key: "1",
            label: "텍스트 프롬프트",
            iconType: "TextBlock",
            onClick: () => navigate("/"),
        },
        {
            key: "2",
            label: "이미지 프롬프트",
            iconType: "Image",
            onClick: () =>
                showToast(
                    `이미지 프롬프트는 아직 준비 중인 기능이에요.`,
                    "더 많은 프롬프트 탐색을 위해 빠르게 준비하고 있을게요!"
                ),
            disabled: true,
        },
        {
            key: "3",
            label: "동영상 프롬프트",
            iconType: "Video",
            onClick: () =>
                showToast(
                    `동영상 프롬프트는 아직 준비 중인 기능이에요.`,
                    "더 많은 프롬프트 탐색을 위해 빠르게 준비하고 있을게요!"
                ),
            disabled: true,
        },
        ...(isUnderTablet
            ? []
            : [{ type: "divider" as const, key: "divider-1" }]),
        {
            key: "4",
            label: "저장한 프롬프트",
            iconType: "Bookmark",
            onClick: () =>
                showToast(
                    `저장한 프롬프트는 아직 준비 중인 기능이에요.`,
                    "더 많은 프롬프트 탐색을 위해 빠르게 준비하고 있을게요!"
                ),
            disabled: true,
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

    return (
        <HomeWrapper>
            <HomeContentWrapper $isUnderTablet={isUnderTablet}>
                <LNB menuItems={menuItems} button={newPropmptButton} />
                <ContentWrapper>
                    <BannerWrapper>
                        <Banner />
                    </BannerWrapper>
                    <PaginatedPromptSection viewType="starred" />
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
