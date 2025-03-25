import Image, { StaticImageData } from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import AIBanner from "@img/banner/banner-ai-prompt.png";
import AIBannerMobile from "@img/banner/banner-ai-prompt-mobile.png";
import BlogBanner from "@img/banner/banner-blog.png";
import BlogBannerMobile from "@img/banner/banner-blog-mobile.png";
import RecommendationBanner from "@img/banner/banner-recommendation.png";
import RecommendationBannerMobile from "@img/banner/banner-recommendation-mobile.png";
import EntertainmentBanner from "@img/banner/banner-entertainment.png";
import EntertainmentBannerMobile from "@img/banner/banner-entertainment-mobile.png";
import styled from "styled-components";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useRecoilValue } from "recoil";
import { useDeviceSize } from "@/components/DeviceContext";
import useEmblaCarousel from "embla-carousel-react";

const Banner = () => {
    const searchedkeyword = useRecoilValue(searchedKeywordState);
    const searchedCategory = useRecoilValue(searchedCategoryState);
    const { isUnderTablet, isMobile } = useDeviceSize();

    const isVisible = !searchedkeyword && searchedCategory === "total";

    const SLIDES: { imgSrc: StaticImageData; linkSrc: string }[] = [
        {
            imgSrc: isMobile ? AIBannerMobile : AIBanner,
            linkSrc:
                "https://pocket-prompt.notion.site/1bbd02185fca805f92e8f79e371dd309",
        },
        {
            imgSrc: isMobile
                ? RecommendationBannerMobile
                : RecommendationBanner,
            linkSrc:
                "https://pocket-prompt.notion.site/10-1bbd02185fca802cab85ec783aba88b2",
        },
        {
            imgSrc: isMobile ? BlogBannerMobile : BlogBanner,
            linkSrc:
                "https://pocket-prompt.notion.site/10-1bbd02185fca8086b375ec5e23d0d521",
        },
        // TODO: 재미 프롬프트 배너 추후 추가 예정
        // {
        //     imgSrc: isMobile ? EntertainmentBannerMobile : EntertainmentBanner,
        // },
    ];

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        containScroll: "trimSnaps",
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    // 슬라이드 선택 시 index 변경
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    // Dot 네비게이션 클릭시 index, 현재 슬라이드 이동
    const handleClickDot = (key: number) => {
        setSelectedIndex(key);
        emblaApi?.scrollTo(key);
    };

    const handleClickBanner = (src: string) => {
        window.open(src, "_blank");
    };

    // 자동 슬라이드
    useEffect(() => {
        if (!emblaApi) return;

        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 10000);

        emblaApi.on("select", onSelect);
        onSelect();

        return () => clearInterval(interval);
    }, [emblaApi, onSelect]);

    return (
        <Wrapper
            $isVisible={isVisible}
            $isUnderTablet={isUnderTablet}
            $isMobile={isMobile}
        >
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {SLIDES.map((slide, i) => (
                        <div className="embla__slide" key={i}>
                            <Image
                                src={slide.imgSrc}
                                alt="banner-ai-prompt"
                                width={isMobile ? 736 : 808}
                                height={isMobile ? 320 : 124}
                                style={{ borderRadius: "15px" }}
                                onClick={() => handleClickBanner(slide.linkSrc)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <DotContainer>
                {SLIDES.map((_, i) => (
                    <Dot
                        key={i}
                        $active={i === selectedIndex}
                        onClick={() => handleClickDot(i)}
                    />
                ))}
            </DotContainer>
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
    // padding: ${({ $isUnderTablet }) => ($isUnderTablet ? "0 10px" : "none")};

    .embla {
        position: relative;
        overflow: hidden;
    }

    .embla__container {
        display: flex;
        flex-direction: row;
        gap: 16px;
        padding: 0 16px;
    }

    .embla__slide {
        display: flex;
        justify-content: center;
        position: relative;
        // flex: 0 0 85%;
        // width: 100%;
        flex: 0 0 ${({ $isUnderTablet }) => ($isUnderTablet ? "85%" : "808px")};
        width: ${({ $isUnderTablet }) => ($isUnderTablet ? "100%" : "808px")};

        &:hover {
            cursor: pointer;
        }
    }

    .embla::before,
    .embla::after {
        content: "";
        position: absolute;
        top: 0;
        width: 60px;
        height: 100%;
        z-index: 1;
        pointer-events: none;
    }

    .embla::before {
        left: 0;
        background: linear-gradient(
            90deg,
            #ffffff 0%,
            rgba(255, 255, 255, 0.8) 30%,
            rgba(255, 255, 255, 0.4) 60%,
            rgba(255, 255, 255, 0) 100%
        );
    }

    .embla::after {
        right: 0;
        background: linear-gradient(
            270deg,
            #ffffff 0%,
            rgba(255, 255, 255, 0.8) 30%,
            rgba(255, 255, 255, 0.4) 60%,
            rgba(255, 255, 255, 0) 100%
        );
    }
`;

const DotContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    height: 20px;
`;

const Dot = styled.div<{ $active: boolean }>`
    width: ${({ $active }) => ($active ? "60px" : "16px")};
    height: 4px;
    border-radius: 4px;
    margin: 0 4px;
    background-color: ${({ $active, theme }) =>
        $active ? theme.colors.primary : theme.colors.G_200};
    transition: background-color 0.3s ease-in-out, width 0.3s ease-in-out;

    &:hover {
        cursor: pointer;
    }
`;
