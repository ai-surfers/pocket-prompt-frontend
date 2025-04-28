// @/hooks/usePromptList.ts
import { PromptDetails, SortType, ViewType } from "@/apis/prompt/prompt.model";
import { searchedKeywordState } from "@/states/searchState";
import { sortTypeState } from "@/states/sortState";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

interface UsePromptListProps {
    items: PromptDetails[];
    searchType: "total" | "popular" | "search" | "category";
    viewType: ViewType;
    defaultSortBy?: SortType;
}

export const usePromptList = ({
    items,
    searchType,
    viewType,
    defaultSortBy,
}: UsePromptListProps) => {
    const sortBy = useRecoilValue(sortTypeState);
    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const effectiveSortBy: SortType =
        searchType === "popular"
            ? defaultSortBy ?? "usages_7_days"
            : sortBy ?? "created_at";

    const [activeTab, setActiveTab] = useState<"public" | "private">("public");
    const [publicCount, setPublicCount] = useState(0);
    const [privateCount, setPrivateCount] = useState(0);

    const sortedItems = useMemo(() => {
        const itemsToSort = [...items];
        const sorted = itemsToSort.sort((a, b) => {
            if (effectiveSortBy === "created_at") {
                return (
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                );
            } else if (effectiveSortBy === "star") {
                return (b.star || 0) - (a.star || 0);
            } else if (effectiveSortBy === "relevance" && searchedKeyword) {
                return 0;
            } else if (
                effectiveSortBy === "usages_7_days" ||
                effectiveSortBy === "usages_30_days"
            ) {
                return (b.usages || 0) - (a.usages || 0);
            }
            return 0;
        });

        if (viewType === "my") {
            const publicItems = sorted.filter(
                (item) => item.visibility === "public"
            ).length;
            const privateItems = sorted.filter(
                (item) => item.visibility === "private"
            ).length;
            setPublicCount(publicItems);
            setPrivateCount(privateItems);
        }

        return viewType === "my"
            ? sorted.filter((item) =>
                  activeTab === "public"
                      ? item.visibility === "public"
                      : item.visibility === "private"
              )
            : sorted;
    }, [items, effectiveSortBy, searchedKeyword, viewType, activeTab]);

    return {
        sortedItems,
        effectiveSortBy,
        activeTab,
        setActiveTab,
        publicCount,
        privateCount,
    };
};
