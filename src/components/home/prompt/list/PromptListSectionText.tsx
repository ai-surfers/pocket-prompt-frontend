"use client";

import PromptCardText from "../card/PromptCardText";
import PromptList from "../PromptList";
import PromptListSectionBase from "./PromptListSectionBase";

const PromptListSectionText = () => {
    return (
        <PromptListSectionBase
            promptType="text"
            renderPromptList={({
                searchType,
                viewType,
                limit,
                title,
                sortBy,
            }) => (
                <PromptList
                    promptType="text"
                    searchType={searchType}
                    viewType={viewType}
                    title={title}
                    limit={limit}
                    defaultSortBy={sortBy}
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
            )}
        />
    );
};

export default PromptListSectionText;
``;
