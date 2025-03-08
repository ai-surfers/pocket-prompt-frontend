import { JSX } from "react";
import Branding from "@public/svg/home/Branding";
import Blog from "@public/svg/home/Blog";
import Business from "@public/svg/home/Business";
import Develop from "@public/svg/home/Develop";
import Marketing from "@public/svg/home/Marketing";
import Research from "@public/svg/home/Research";
import Writing from "@public/svg/home/Writing";
import Productivity from "@public/svg/home/Productivity";
import Language from "@public/svg/home/Language";
import Entertainment from "@public/svg/home/Entertainment";
import Video from "@public/svg/home/Video";

export const Visibility: string[] = ["public", "private"];

export interface Category {
    [key: string]: { ko: string; en: string; emoji: JSX.Element };
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

export const AIPlatforms = {
    ChatGPT: "ChatGPT",
    Claude: "Claude",
    Gemini: "Gemini",
    Perplexity: "Perplexity",
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
