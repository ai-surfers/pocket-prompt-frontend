import Banner from "./components/Banner/Banner";
import { Wrapper } from "@/layouts/Layout";
import styled from "styled-components";
import LNB, { MenuItemsType } from "../../components/LNB/LNB";
import Add from "@/assets/svg/home/Add";
import PaginatedPromptSection from "./components/Prompt/PaginatedPromptSection";
import Button from "@/components/common/Button/Button";
import { useNavigate } from "react-router-dom";
import Text from "@/components/common/Text/Text";

export default function HomePage() {
    const navigate = useNavigate();

    const menuItems: MenuItemsType[] = [
        {
            key: "1",
            label: "텍스트 프롬프트",
            iconType: "TextBlock",
        },
        {
            key: "2",
            label: "이미지 프롬프트",
            iconType: "Image",
        },
        {
            key: "3",
            label: "동영상 프롬프트",
            iconType: "Video",
        },
        { type: "divider", key: "divider-1" },
        {
            key: "4",
            label: "저장한 프롬프트",
            iconType: "Bookmark",
        },
    ];

    const handleClickNewButton = () => {
        navigate("/prompt-new");
    };

    const newPropmptButton = (
        <Button
            onClick={handleClickNewButton}
            style={{ padding: "8px 12px", gap: 2 }}
        >
            <Add />
            <Text font="b2_16_semi" color="white">
                프롬프트 등록
            </Text>
        </Button>
    );

    return (
        <HomeWrapper>
            <HomeContentWrapper>
                <LNB menuItems={menuItems} button={newPropmptButton} />
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
    margin-top: 92px;
    align-items: start;
    width: 100vw;
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
