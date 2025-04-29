import { PromptDetails, SortType, ViewType } from "@/apis/prompt/prompt.model";
import { sortTypeState } from "@/states/sortState";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

export function usePromptList(
    items: PromptDetails[],
    promptType: string,
    searchType: "total" | "popular" | "search" | "category",
    viewType: ViewType,
    defaultSortBy?: SortType
) {
    const sortBy = useRecoilValue(sortTypeState);
    const effectiveSort: SortType =
        searchType === "popular"
            ? defaultSortBy ?? "usages_7_days"
            : sortBy ?? "created_at";

    const [activeTab, setActiveTab] = useState<"public" | "private">("public");
    const [publicCount, setPublicCount] = useState(0);
    const [privateCount, setPrivateCount] = useState(0);

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

    const filtered = useMemo(
        () =>
            viewType === "my"
                ? sorted.filter((i) =>
                      activeTab === "public"
                          ? i.visibility === "public"
                          : i.visibility === "private"
                  )
                : sorted,
        [sorted, viewType, activeTab]
    );

    useEffect(() => {
        if (viewType === "my") {
            setPublicCount(
                sorted.filter((i) => i.visibility === "public").length
            );
            setPrivateCount(
                sorted.filter((i) => i.visibility === "private").length
            );
        }
    }, [sorted, viewType]);

    return {
        filtered,
        effectiveSort,
        activeTab,
        setActiveTab,
        publicCount,
        privateCount,
    };
}
