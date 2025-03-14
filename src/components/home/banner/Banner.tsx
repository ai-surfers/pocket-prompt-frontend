import Image from "next/image";
import React from "react";
import AIBanner from "@img/banner/banner-ai-prompt.png";
import AIBannerMobile from "@img/banner/banner-ai-prompt-mobile.png";
import styled from "styled-components";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useRecoilValue } from "recoil";
import { useDeviceSize } from "@/components/DeviceContext";
const Banner = () => {
    const searchedkeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);
    const { isUnderTablet, isMobile } = useDeviceSize();

    const isVisible = !searchedkeyword && searchedCategory === "total";

    return (
        <Wrapper
            $isVisible={isVisible}
            $isUnderTablet={isUnderTablet}
            $isMobile={isMobile}
        >
            <Image
                src={isMobile ? AIBannerMobile : AIBanner}
                alt="banner-ai-prompt"
                width={isMobile ? 736 : 808}
                height={isMobile ? 320 : 124}
                layout="intrinsic"
                style={{ borderRadius: "15px" }}
            />
        </Wrapper>
    );
};

export default Banner;

const Wrapper = styled.div<{
    $isVisible: boolean;
    $isUnderTablet: boolean;
    $isMobile: boolean;
}>`
    margin: 0 auto 40px auto;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    max-height: ${({ $isVisible, $isMobile }) =>
        $isVisible
            ? $isMobile
                ? "320px"
                : "124px"
            : "0px"}; /* 배너 높이 지정 */
    overflow: hidden;
    transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out;
    padding: ${({ $isUnderTablet }) => ($isUnderTablet ? "0 10px" : "none")};
`;
