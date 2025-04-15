"use client";

import { getPromptsList } from "@/apis/prompt/prompt";
import { PromptDetails } from "@/apis/prompt/prompt.model";
import { useEffect, useState } from "react";
import PromptCardText from "../card/PromptCardText";
import PromptList from "../PromptList";
import PromptListSectionBase from "./PromptListSectionBase";

const PromptListSectionText = () => {
    const [top7Days, setTop7Days] = useState<PromptDetails[]>([]);
    const [top30Days, setTop30Days] = useState<PromptDetails[]>([]);
    const [allPrompts, setAllPrompts] = useState<PromptDetails[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const type = "text";

                // "이번 주", "이번 달", "전체" 프롬프트 데이터를 병렬로 가져옴
                const [weekRes, monthRes, allRes] = await Promise.all([
                    getPromptsList({
                        prompt_type: type,
                        view_type: "open",
                        sort_by: "usages_7_days",
                        limit: 3,
                        page: 1,
                    }),
                    getPromptsList({
                        prompt_type: type,
                        view_type: "open",
                        sort_by: "usages_30_days",
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

                const weekTop3 = weekRes.prompt_info_list;
                // "이번 달" 데이터에서 "이번 주" TOP 3와 중복되지 않도록 필터링
                const monthFiltered = monthRes.prompt_info_list.filter(
                    (item) => !weekTop3.some((w) => w.id === item.id)
                );
                const monthTop3 = monthFiltered.slice(0, 3);

                setTop7Days(weekTop3);
                setTop30Days(monthTop3);
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

                // searchType과 sortBy에 따라 적절한 데이터 선택
                if (searchType === "popular" && sortBy === "usages_7_days") {
                    data = top7Days;
                } else if (
                    searchType === "popular" &&
                    sortBy === "usages_30_days"
                ) {
                    data = top30Days;
                } else {
                    data = allPrompts;
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
