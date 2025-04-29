import { getPromptsList } from "@/apis/prompt/prompt";
import { PromptDetails } from "@/apis/prompt/prompt.model";
import {
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { sortTypeState } from "@/states/sortState";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface PromptData {
    top7Days: PromptDetails[];
    top30Days: PromptDetails[];
    allPrompts: PromptDetails[];
}

export const usePromptData = (promptType: "text" | "image") => {
    const [data, setData] = useState<PromptData>({
        top7Days: [],
        top30Days: [],
        allPrompts: [],
    });
    const sortBy = useRecoilValue(sortTypeState);
    const searchedCategory = useRecoilValue(searchedCategoryState);
    const searchedKeyword = useRecoilValue(searchedKeywordState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allPromptsParams: any = {
                    prompt_type: promptType,
                    view_type: "open",
                    sort_by: sortBy ?? "created_at",
                    limit: 18,
                    page: 1,
                };

                if (searchedKeyword?.trim()) {
                    allPromptsParams.query = searchedKeyword;
                }
                if (searchedCategory && searchedCategory !== "total") {
                    allPromptsParams.categories = searchedCategory;
                }

                const [monthRes, weekRes, allRes] = await Promise.all([
                    getPromptsList({
                        prompt_type: promptType,
                        view_type: "open",
                        sort_by: "usages_30_days",
                        limit: 9,
                        page: 1,
                    }),
                    getPromptsList({
                        prompt_type: promptType,
                        view_type: "open",
                        sort_by: "usages_7_days",
                        limit: 9,
                        page: 1,
                    }),
                    getPromptsList(allPromptsParams),
                ]);

                const weekList = weekRes.prompt_info_list.slice(0, 3);
                const monthList = monthRes.prompt_info_list;

                // 🛠️ 주간 id 세트
                const weekIds = new Set(weekList.map((item) => item.id));

                // 🛠️ 월간에서 주간에 없는 것만 필터링
                const filteredMonthList = monthList
                    .filter((item) => !weekIds.has(item.id))
                    .slice(0, 3); // 여기서 다시 3개만 잘라준다

                setData({
                    top7Days: weekList,
                    top30Days: filteredMonthList,
                    allPrompts: allRes.prompt_info_list,
                });
            } catch (err) {
                console.error("Prompt list fetch error", err);
                setData({ top7Days: [], top30Days: [], allPrompts: [] });
            }
        };

        fetchData();
    }, [promptType, sortBy, searchedCategory, searchedKeyword]);

    return data;
};
