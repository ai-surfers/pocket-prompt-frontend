export const Visibility: string[] = ["public", "private"];

interface Category {
    [key: string]: { ko: string; en: string; emoji: string };
}

export const Categories: Category = {
    branding: { ko: "브랜딩", en: "branding", emoji: "✨" },
    blog: { ko: "블로그", en: "blog", emoji: "✍️" },
    business: { ko: "비즈니스", en: "business", emoji: "👔" },
    development: { ko: "개발", en: "development", emoji: "💻" },
    marketing: { ko: "마케팅", en: "marketing", emoji: "📣" },
    research: { ko: "연구", en: "research", emoji: "🔬" },
    writing: { ko: "글쓰기", en: "writing", emoji: "✍️" },
    productivity: { ko: "생산성", en: "productivity", emoji: "🚀" },
    language: { ko: "언어", en: "language", emoji: "💬" },
    entertainment: { ko: "재미", en: "entertainment", emoji: "😂" },
    video: { ko: "영상기획", en: "video", emoji: "📹" },
};

export const AIPlatforms = {
    ChatGPT: "ChatGPT",
    // Claude: "Claude",
    // Gemini: "Gemini",
};

export const PocketRunModel: Record<string, { label: string; value: string }> =
    {
        Basic: { label: "기본 모델", value: "gpt-4o-mini" },
        ChatGPT: { label: "ChatGPT", value: "gpt-4o" },
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
