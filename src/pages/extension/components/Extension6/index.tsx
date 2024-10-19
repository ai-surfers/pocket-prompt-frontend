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
const Extension6 = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4.5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 0,
        cssEase: "linear",
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
        </Extension6Container>
    );
};

export default Extension6;
