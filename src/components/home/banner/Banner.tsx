import Image from "next/image";
import React from "react";
import AIBanner from "@img/banner-ai-prompt.png";
import styled from "styled-components";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useRecoilValue } from "recoil";
import useDeviceSize from "@/hooks/useDeviceSize";
const Banner = () => {
    const searchedkeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);
    const { isUnderTablet } = useDeviceSize();

    const isVisible = !searchedkeyword && searchedCategory === "total";

    return (
        <Wrapper $isVisible={isVisible} $isUnderTablet={isUnderTablet}>
            <Image
                src={AIBanner}
                alt="banner-ai-prompt"
                width={808}
                height={124}
            />
        </Wrapper>
    );
};

export default Banner;

const Wrapper = styled.div<{ $isVisible: boolean; $isUnderTablet: boolean }>`
    margin: 0 auto 40px auto;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    max-height: ${({ $isVisible }) =>
        $isVisible ? "124px" : "0px"}; /* 배너 높이 지정 */
    overflow: hidden;
    transition: opacity 0.5s ease-in-out, max-height 0.5s ease-in-out;
    padding: ${({ $isUnderTablet }) => ($isUnderTablet ? "0 10px" : "none")};
`;
