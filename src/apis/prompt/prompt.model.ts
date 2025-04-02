export type PromptInputField = {
    name: string;
    type: string;
    placeholder?: string;
    options?: string[];
    default?: number;
};

export type PromptDetails = {
    id: string;
    type?: "text" | "image" | "video";
    title: string;
    description: string;
    prompt_template: string;
    visibility: string;
    categories: string[];
    author_nickname: string | null;
    star: number;
    usages: number;
    created_at: string;
    views: number;
    user_input_format: PromptInputField[];
    is_starred_by_user: boolean;
    sample_media: string[];
};

export type PaginationInfo = {
    total_pages: number;
    total_count: number;
    current_page: number;
    is_last: boolean;
};

export type GetPromptsListResponse = {
    prompt_info_list: PromptDetails[];
    page_meta_data: PaginationInfo;
};

export type ViewType = "open" | "starred" | "my" | "featured";

export type SortType =
    | "created_at"
    | "star"
    | "usages"
    | "relevance"
    | "usages_7_days"
    | "usages_30_days";

export type GetPromptsListParams = {
    view_type: ViewType;
    query?: string;
    categories?: string;
    sort_by?: SortType;
    sort_order?: "asc" | "desc";
    limit?: number;
    page?: number;
};
