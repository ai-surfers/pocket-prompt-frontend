"use client";

import { getPromptsList } from "@/apis/prompt/prompt";
import { PromptDetails } from "@/apis/prompt/prompt.model";
import { useEffect, useState } from "react";
import PromptCardText from "../card/PromptCardText";
import PromptList from "../PromptList";
import PromptListSectionBase from "./PromptListSectionBase";

interface PromptListSectionTextProps {
    searchResults?: PromptDetails[];
}

const PromptListSectionText = ({
    searchResults,
}: PromptListSectionTextProps) => {
    const [top7Days, setTop7Days] = useState<PromptDetails[]>([]);
    const [top30Days, setTop30Days] = useState<PromptDetails[]>([]);
    const [allPrompts, setAllPrompts] = useState<PromptDetails[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const type = "text";

                const [monthRes, weekRes, allRes] = await Promise.all([
                    getPromptsList({
                        prompt_type: type,
                        view_type: "open",
                        sort_by: "usages_30_days",
                        limit: 3,
                        page: 1,
                    }),
                    getPromptsList({
                        prompt_type: type,
                        view_type: "open",
                        sort_by: "usages_7_days",
                        limit: 9,
                        page: 1,
                    }),
                    getPromptsList({
                        prompt_type: type,
                        view_type: "open",
                        sort_by: "created_at",
                        limit: 50,
                        page: 1,
                    }),
                ]);

                const monthTop3 = monthRes.prompt_info_list;
                const weekFiltered = weekRes.prompt_info_list.filter(
                    (item) => !monthTop3.some((m) => m.id === item.id)
                );
                const weekTop3 = weekFiltered.slice(0, 3);

                setTop30Days(monthTop3);
                setTop7Days(weekTop3);
                setAllPrompts(allRes.prompt_info_list);
            } catch (err) {
                console.error("Prompt list fetch error", err);
            }
        };

        fetchData();
    }, []);

    return (
        <PromptListSectionBase
            promptType="text"
            renderPromptList={({
                searchType,
                viewType,
                limit,
                title,
                sortBy,
            }) => {
                let data: PromptDetails[] = [];

                if (searchType === "popular" && sortBy === "usages_7_days") {
                    data = top7Days;
                } else if (
                    searchType === "popular" &&
                    sortBy === "usages_30_days"
                ) {
                    data = top30Days;
                } else if (searchType === "total") {
                    data = allPrompts;
                } else if (
                    searchType === "search" ||
                    searchType === "category"
                ) {
                    data = searchResults || [];
                }

                return (
                    <PromptList
                        promptType="text"
                        searchType={searchType}
                        viewType={viewType}
                        title={title}
                        limit={limit}
                        defaultSortBy={sortBy}
                        items={data}
                        renderItem={(item, index) => (
                            <PromptCardText
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                views={item.views}
                                star={item.star}
                                usages={item.usages}
                                index={index + 1}
                                isMiniHeight={searchType === "popular"}
                            />
                        )}
                    />
                );
            }}
        />
    );
};

export default PromptListSectionText;
