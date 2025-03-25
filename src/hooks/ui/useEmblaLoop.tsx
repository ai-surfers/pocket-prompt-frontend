import { useDeviceSize } from "@/components/DeviceContext";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const useEmblaLoop = (slides: React.JSX.Element[]) => {
    const { isUnderTablet } = useDeviceSize();
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
        <EmblaWrapper $isUnderTablet={isUnderTablet}>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((slide, i) => (
                        <div className="embla__slide" key={i}>
                            {slide}
                        </div>
                    ))}
                </div>
            </div>
            <DotContainer>
                {slides.map((_, i) => (
                    <Dot
                        key={i}
                        $active={i === selectedIndex}
                        onClick={() => handleClickDot(i)}
                    />
                ))}
            </DotContainer>
        </EmblaWrapper>
    );
};

export default useEmblaLoop;

const EmblaWrapper = styled.div<{ $isUnderTablet: boolean }>`
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
