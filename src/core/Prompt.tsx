import Animal from "@public/svg/home/Animal";
import Architect from "@public/svg/home/Architect";
import Art from "@public/svg/home/Art";
import Blog from "@public/svg/home/Blog";
import Branding from "@public/svg/home/Branding";
import Business from "@public/svg/home/Business";
import Design from "@public/svg/home/Design";
import Develop from "@public/svg/home/Develop";
import Entertainment from "@public/svg/home/Entertainment";
import Etc from "@public/svg/home/Etc";
import Fashion from "@public/svg/home/Fashion";
import Food from "@public/svg/home/Food";
import Language from "@public/svg/home/Language";
import Logo from "@public/svg/home/Logo";
import Marketing from "@public/svg/home/Marketing";
import Object from "@public/svg/home/Object";
import Person from "@public/svg/home/Person";
import Picture from "@public/svg/home/Picture";
import Productivity from "@public/svg/home/Productivity";
import Research from "@public/svg/home/Research";
import Video from "@public/svg/home/Video";
import Writing from "@public/svg/home/Writing";
import { JSX } from "react";

export const Visibility: string[] = ["public", "private"];

export interface Category {
    [key: string]: { ko: string; en: string; emoji?: JSX.Element };
}

export const Categories: Category = {
    branding: {
        ko: "브랜딩",
        en: "branding",
        emoji: <Branding />,
    },
    blog: { ko: "블로그", en: "blog", emoji: <Blog /> },
    business: { ko: "비즈니스", en: "business", emoji: <Business /> },
    development: { ko: "개발", en: "development", emoji: <Develop /> },
    marketing: { ko: "마케팅", en: "marketing", emoji: <Marketing /> },
    research: { ko: "연구", en: "research", emoji: <Research /> },
    writing: { ko: "글쓰기", en: "writing", emoji: <Writing /> },
    productivity: { ko: "생산성", en: "productivity", emoji: <Productivity /> },
    language: { ko: "언어", en: "language", emoji: <Language /> },
    entertainment: {
        ko: "재미",
        en: "entertainment",
        emoji: <Entertainment />,
    },
    video: { ko: "영상기획", en: "video", emoji: <Video /> },
};

export const ImageCategories: Category = {
    object: { ko: "사물", en: "object", emoji: <Object /> },
    animal: { ko: "동물", en: "animal", emoji: <Animal /> },
    human: { ko: "인물", en: "human", emoji: <Person /> },
    character: { ko: "캐릭터", en: "character", emoji: <Develop /> },
    design: { ko: "디자인", en: "design", emoji: <Design /> },
    art: { ko: "예술", en: "art", emoji: <Art /> },
    fashion: { ko: "패션", en: "fashion", emoji: <Fashion /> },
    architecture: {
        ko: "건축",
        en: "architecture",
        emoji: <Architect />,
    },
    food: { ko: "음식", en: "food", emoji: <Food /> },
    photo: { ko: "사진", en: "photo", emoji: <Picture /> },
    logo: { ko: "로고", en: "logo", emoji: <Logo /> },
    etc: { ko: "기타", en: "etc", emoji: <Etc /> },
};

export const AIPlatforms = {
    ChatGPT: "ChatGPT",
    Claude: "Claude",
    Gemini: "Gemini",
    Perplexity: "Perplexity",
};

export const ImgAIPlatforms = {
    DallE: "Dall-E",
    imageFX: "imageFX",
    Midjourney: "Midjourney",
    Flux: "Flux",
};

export const PocketRunModel: Record<
    string,
    { id: string; label: string; value: string }
> = {
    Basic: {
        id: "based-pocket-run-toggle",
        label: "기본 모델",
        value: "gpt-4o-mini",
    },
    ChatGPT: { id: "gpt-pocket-run-toggle", label: "ChatGPT", value: "gpt-4o" },
};

export enum InputType {
    TEXT = "text",
    LONGTEXT = "longtext",
    DROPDOWN = "dropdown",
    NUMBER = "number",
}

export type TypeOfInputType = `${InputType}`;

export enum AIPlatformType {
    CHATGPT = "ChatGPT",
    CLAUDE = "Claude",
    GEMINI = "Gemini",
    NONE = "Not Supported",
}

export type TypeOfAIPlatformType = AIPlatformType;

export const SortBy = {
    star: "즐겨찾기 순",
    created_at: "최신 순",
    usages: "사용 많은 순",
    // relevance: "",
};
