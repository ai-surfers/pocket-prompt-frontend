import AiClubBanner from "@img/banner/banner-ai-club.png";
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

    {
        imgSrc: AiClubBanner,
        mobileImgSrc: AiClubBanner,
        linkSrc:
            "https://ai-start-club.oopy.io/?utm_source=pocket-prompt&utm_medium=referral&utm_campaign=pocket-prompt-web-banner-7th-gen",
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
        linkSrc:
            "https://pocket-prompt.notion.site/1d8d02185fca802dacbefee6faf6473e",
    },
    {
        imgSrc: ModelPrompt,
        mobileImgSrc: ModelPrompt,
        linkSrc:
            "https://pocket-prompt.notion.site/10-1d8d02185fca80f2add1c41aee0c08cd",
    },
    {
        imgSrc: AnimalPrompt,
        mobileImgSrc: AnimalPrompt,
        linkSrc:
            "https://pocket-prompt.notion.site/10-1d8d02185fca804393c8d592216c7687",
    },
    {
        imgSrc: IconPrompt,
        mobileImgSrc: IconPrompt,
        linkSrc:
            "https://pocket-prompt.notion.site/3D-10-1d8d02185fca805ab5f0d37d707cc29d",
    },
];
