// [Reference] https://yogjin.tistory.com/121

const PROMPT_KEYS = {
    all: ["prompts"] as const,

    lists: () => [...PROMPT_KEYS.all, "list"] as const, // ["prompts", "list"]
    list: (filters: object) => [...PROMPT_KEYS.lists(), { filters }] as const, // ["prompts", "list", "..."]

    details: () => [...PROMPT_KEYS.all, "detail"] as const, // ["prompts", "detail"]
    detail: (id: string) => [...PROMPT_KEYS.details(), id] as const, // ["prompts", "detail", "id"]
};

// src/constants/PROMPT_KEYS.ts
export const PROMPT_QUERY_KEYS_FOR_PREFETCH = {
    ALL_PROMPTS: {
        viewType: "open",
        currentPage: 1,
        itemsPerPage: 18,
        sortBy: "created_at",
    },
    ALL_PROMPTS_MOBILE: {
        viewType: "open",
        currentPage: 1,
        itemsPerPage: 5,
        sortBy: "created_at",
    },
    POPULAR_PROMPTS: {
        viewType: "open",
        limit: 3,
        sortBy: "star",
        currentPage: 1,
        itemsPerPage: 18,
    },
    FEATURED_PROMPTS: {
        viewType: "featured",
        limit: 3,
        sortBy: "created_at",
        currentPage: 1,
        itemsPerPage: 18,
    },
} as const;

const PAYMENTS_KEYS = {
    all: ["payments"] as const,
};

const CARD_INFO_KEYS = {
    all: ["cardInfos"] as const,
};

export { PROMPT_KEYS, PAYMENTS_KEYS, CARD_INFO_KEYS };
