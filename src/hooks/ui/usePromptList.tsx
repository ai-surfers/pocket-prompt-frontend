import { PromptDetails, SortType, ViewType } from "@/apis/prompt/prompt.model";
import { sortTypeState } from "@/states/sortState";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

export function usePromptList(
    items: PromptDetails[],
    promptType: string,
    searchType: "total" | "popular" | "search" | "category",
    viewType: ViewType,
    defaultSortBy?: SortType,
    activeTab?: "public" | "private" | "text" | "image"
) {
    const sortBy = useRecoilValue(sortTypeState);
    const effectiveSort: SortType =
        searchType === "popular"
            ? defaultSortBy ?? "usages_7_days"
            : sortBy ?? "created_at";

    const [publicCount, setPublicCount] = useState(0);
    const [privateCount, setPrivateCount] = useState(0);
    const [textCount, setTextCount] = useState(0);
    const [imageCount, setImageCount] = useState(0);

    const sorted = useMemo(() => {
        const clone = [...items];
        return clone.sort((a, b) => {
            switch (effectiveSort) {
                case "created_at":
                    return (
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    );
                case "star":
                    return (b.star || 0) - (a.star || 0);
                case "usages_7_days":
                case "usages_30_days":
                    return (b.usages || 0) - (a.usages || 0);
                default:
                    return 0;
            }
        });
    }, [items, effectiveSort]);

    const filtered = useMemo(() => {
        if (viewType === "my" && activeTab) {
            return sorted.filter((i) =>
                activeTab === "public"
                    ? i.visibility === "public"
                    : i.visibility === "private"
            );
        } else if (viewType === "starred" && activeTab) {
            return sorted.filter((i) =>
                activeTab === "text" ? i.type === "text" : i.type === "image"
            );
        }
        return sorted;
    }, [sorted, viewType, activeTab]);

    useEffect(() => {
        if (viewType === "my") {
            setPublicCount(
                sorted.filter((i) => i.visibility === "public").length
            );
            setPrivateCount(
                sorted.filter((i) => i.visibility === "private").length
            );
        } else if (viewType === "starred") {
            setTextCount(sorted.filter((i) => i.type === "text").length);
            setImageCount(sorted.filter((i) => i.type === "image").length);
        }
    }, [sorted, viewType]);

    return {
        filtered,
        effectiveSort,
        publicCount,
        privateCount,
        textCount,
        imageCount,
    };
}
