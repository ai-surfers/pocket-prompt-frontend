import AIBannerMobile from "@img/banner/banner-ai-prompt-mobile.png";
import AIBanner from "@img/banner/banner-ai-prompt.png";
import BlogBannerMobile from "@img/banner/banner-blog-mobile.png";
import BlogBanner from "@img/banner/banner-blog.png";
import RecommendationBannerMobile from "@img/banner/banner-recommendation-mobile.png";
import RecommendationBanner from "@img/banner/banner-recommendation.png";
// import EntertainmentBanner from "@img/banner/banner-entertainment.png";
// import EntertainmentBannerMobile from "@img/banner/banner-entertainment-mobile.png";
//이미지 배너
import IconPrompt from "@img/banner/banner-3d-icon.png";
import AnimalPrompt from "@img/banner/banner-animals.png";
import CreateImagePrompt from "@img/banner/banner-image-create.png";
import ModelPrompt from "@img/banner/banner-model.png";

import { StaticImageData } from "next/image";

export const HOME_BANNER_SLIDES: {
    imgSrc: StaticImageData;
    mobileImgSrc: StaticImageData;
    linkSrc: string;
}[] = [
    {
        imgSrc: AIBanner,
        mobileImgSrc: AIBannerMobile,
        linkSrc:
            "https://pocket-prompt.notion.site/1bbd02185fca805f92e8f79e371dd309",
    },
    {
        imgSrc: RecommendationBanner,
        mobileImgSrc: RecommendationBannerMobile,
        linkSrc:
            "https://pocket-prompt.notion.site/10-1bbd02185fca802cab85ec783aba88b2",
    },
    {
        imgSrc: BlogBanner,
        mobileImgSrc: BlogBannerMobile,
        linkSrc:
            "https://pocket-prompt.notion.site/10-1bbd02185fca8086b375ec5e23d0d521",
    },
    // TODO: 재미 프롬프트 배너 추후 추가 예정
    // {
    //     imgSrc: isMobile ? EntertainmentBannerMobile : EntertainmentBanner,
    // },
];

export const HOME_BANNER_SLIDES_IMAGE: {
    imgSrc: StaticImageData;
    mobileImgSrc: StaticImageData;
    linkSrc: string;
}[] = [
    {
        imgSrc: CreateImagePrompt,
        mobileImgSrc: CreateImagePrompt,
        linkSrc: "https://example.com/image-banner",
    },
    {
        imgSrc: ModelPrompt,
        mobileImgSrc: ModelPrompt,
        linkSrc: "https://example.com/image-banner",
    },
    {
        imgSrc: AnimalPrompt,
        mobileImgSrc: AnimalPrompt,
        linkSrc: "https://example.com/image-banner",
    },
    {
        imgSrc: IconPrompt,
        mobileImgSrc: IconPrompt,
        linkSrc: "https://example.com/image-banner",
    },
];
