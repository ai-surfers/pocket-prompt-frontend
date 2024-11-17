import Slider from "react-slick";
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
const Extension6 = () => {
    const isSmallPC = useMediaQuery({
        maxWidth: "1279px",
    });

    const isTablet = useMediaQuery({
        maxWidth: "1024px",
    });

    const isMoblie = useMediaQuery({
        maxWidth: "767px",
    });

    const getSlidesToShow = () => {
        if (isMoblie) {
            return 1.5;
        } else if (isTablet) {
            return 2.4;
        } else if (isSmallPC) {
            return 3;
        } else {
            return 4.5;
        }
    };

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: getSlidesToShow(),
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 0,
        cssEase: "linear",
    };

    const settings2 = {
        dots: false,
        infinite: true,
        slidesToShow: getSlidesToShow(),
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 0,
        cssEase: "linear",
        initialSlide: 2.6,
    };

    return (
        <Extension6Container>
            <Title>
                이미 많은 사람들의 일상이
                <br />
                포켓 프롬프트로 편리해졌어요
            </Title>
            <CarouselWrap className="slider-container">
                <Slider {...settings}>
                    {CarouselData.map((data) => (
                        <CarouselCard key={data.userName}>
                            <CarouselCardTitleWrap>
                                <CarouselCardUserImg
                                    src={data.img}
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
                </Slider>
            </CarouselWrap>
            {isTablet && (
                <CarouselWrap className="slider-container">
                    <Slider {...settings2}>
                        {CarouselData.reverse().map((data) => (
                            <CarouselCard key={data.userName}>
                                <CarouselCardTitleWrap>
                                    <CarouselCardUserImg
                                        src={data.img}
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
                    </Slider>
                </CarouselWrap>
            )}
        </Extension6Container>
    );
};

export default Extension6;
