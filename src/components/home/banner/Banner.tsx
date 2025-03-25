import Image from "next/image";
import styled from "styled-components";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useRecoilValue } from "recoil";
import { useDeviceSize } from "@/components/DeviceContext";
import { HOME_BANNER_SLIDES } from "@/core/Banner";
import useEmblaLoop from "@/hooks/ui/useEmblaLoop";

const Banner = () => {
    const searchedkeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);
    const { isUnderTablet, isMobile } = useDeviceSize();

    const isVisible = !searchedkeyword && searchedCategory === "total";

    const handleClickBanner = (src: string) => {
        window.open(src, "_blank");
    };

    const slides = HOME_BANNER_SLIDES.map((slide) => (
        <Image
            src={isMobile ? slide.mobileImgSrc : slide.imgSrc}
            alt="banner-ai-prompt"
            width={isMobile ? 736 : 808}
            height={isMobile ? 320 : 124}
            style={{ borderRadius: "15px" }}
            onClick={() => handleClickBanner(slide.linkSrc)}
        />
    ));

    return (
        <Wrapper
            $isVisible={isVisible}
            $isUnderTablet={isUnderTablet}
            $isMobile={isMobile}
        >
            {useEmblaLoop(slides)}
        </Wrapper>
    );
};

export default Banner;

const Wrapper = styled.div<{
    $isVisible: boolean;
    $isUnderTablet: boolean;
    $isMobile: boolean;
}>`
    display: flex;
    flex-direction: column;
    margin: 0 auto 15px auto;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    max-height: ${({ $isVisible, $isMobile }) =>
        $isVisible
            ? $isMobile
                ? "356px"
                : "156px"
            : "0px"}; /* 배너 높이 지정 */
    overflow: hidden;
    transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out;
`;
