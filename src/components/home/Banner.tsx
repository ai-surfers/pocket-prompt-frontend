"use client";

import { styled } from "styled-components";
import SearchBar from "./Search/SearchBar";
import SearchChips from "./Search/SearchChips";
import Text from "@/components/common/Text/Text";
import useDeviceSize from "@/hooks/useDeviceSize";
import LogoNoLine from "@svg/LogoNoLine";

const Banner = () => {
    const { isUnderTablet } = useDeviceSize();

    return (
        <BannerWrapper>
            <Icon />

            <div style={{ zIndex: 1, width: "100%" }}>
                <BannerTitle
                    font={isUnderTablet ? "h1_24_bold" : "xlarge_36_bold"}
                    color="white"
                >
                    당신이 찾는 프롬프트,
                    <br />
                    <span>여기 다 있습니다.</span>
                </BannerTitle>
                <SearchWrapper>
                    <SearchBar />
                    <SearchChips />
                </SearchWrapper>
            </div>
        </BannerWrapper>
    );
};

const BannerWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
    border-radius: 16px;
    background: ${({ theme }) => theme.mixins.gradientPrimary()};
    position: relative;
    padding: 40px 10px;
`;

const BannerTitle = styled(Text)`
    ${({ theme }) => theme.mixins.flexBox("column")};
    line-height: 136%;
    margin-bottom: 26px;

    span {
        background-color: ${({ theme }) => theme.colors.primary_dark};
        padding: 0 10px;
    }
`;

const Icon = styled(LogoNoLine)`
    position: absolute;
    left: 42px;
    height: 169px;
    flex-shrink: 0;
`;

const SearchWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    ${({ theme }) => theme.mixins.flexBox("column")};
    gap: 12px;
`;

export default Banner;
