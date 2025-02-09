import {
    CarouselCard,
    CarouselCardDescription,
    CarouselCardTitleWrap,
    CarouselCardUserImg,
    CarouselCardUserName,
    CarouselWrap,
    Extension6Container,
    Title,
} from "./styles";
import { CarouselData } from "./carouselData";
import { useMediaQuery } from "react-responsive";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import AutoScroll from "embla-carousel-auto-scroll";

const Extension6 = () => {
    const [viewportRef, embla] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            skipSnaps: false,
        },
        [
            AutoScroll({
                speed: 1.5, // 매끄러운 스크롤 속도 (높을수록 빠름)
                stopOnInteraction: false, // 사용자 상호작용 시에도 스크롤 지속
            }),
        ]
    );

    const [slidesToShow, setSlidesToShow] = useState(4.5);

    const updateSlidesToShow = useCallback(() => {
        const width = window.innerWidth;

        if (width <= 767) {
            setSlidesToShow(1.5);
        } else if (width <= 1024) {
            setSlidesToShow(2.4);
        } else if (width <= 1279) {
            setSlidesToShow(3);
        } else {
            setSlidesToShow(4.5);
        }
    }, []);

    useEffect(() => {
        updateSlidesToShow();
        window.addEventListener("resize", updateSlidesToShow);

        return () => {
            window.removeEventListener("resize", updateSlidesToShow);
        };
    }, [updateSlidesToShow]);

    useEffect(() => {
        if (embla) {
            embla.reInit({ loop: true });
        }
    }, [embla, slidesToShow]);

    return (
        <Extension6Container>
            <Title>
                이미 많은 사람들의 일상이
                <br />
                포켓 프롬프트로 편리해졌어요
            </Title>
            <CarouselWrap className="slider-container">
                <div
                    className="embla"
                    style={{ overflow: "hidden", width: "100%" }}
                    ref={viewportRef}
                >
                    <div
                        className="embla__container"
                        style={{
                            display: "flex",
                            gap: "16px",
                            willChange: "transform",
                        }}
                    >
                        {CarouselData.map((data) => (
                            <CarouselCard
                                key={data.userName}
                                style={{
                                    flex: `0 0 calc(100% / ${slidesToShow})`,
                                }}
                            >
                                <CarouselCardTitleWrap>
                                    <CarouselCardUserImg
                                        src={data.img.src}
                                        alt="user"
                                    />
                                    <CarouselCardUserName>
                                        {data.userName}
                                    </CarouselCardUserName>
                                </CarouselCardTitleWrap>
                                <CarouselCardDescription>
                                    {data.description}
                                </CarouselCardDescription>
                            </CarouselCard>
                        ))}
                    </div>
                </div>
            </CarouselWrap>
        </Extension6Container>
    );
};

export default Extension6;
