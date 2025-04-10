"use client";

import PromptCardImage from "../card/PromptCardImage";
import PromptList from "../PromptList";
import PromptListSectionBase from "./PromptListSectionBase";

const PromptListSectionImage = () => {
    return (
        <PromptListSectionBase
            promptType="image"
            renderPromptList={({
                searchType,
                viewType,
                limit,
                title,
                sortBy,
            }) => (
                <PromptList
                    promptType="image"
                    searchType={searchType}
                    viewType={viewType}
                    title={title}
                    limit={limit}
                    defaultSortBy={sortBy}
                    renderItem={(item) => (
                        <PromptCardImage
                            id={item.id}
                            title={item.title}
                            sampleMedia={item.sample_media}
                            views={item.views}
                            star={item.star}
                            usages={item.usages}
                            isMiniHeight={searchType === "popular"}
                        />
                    )}
                />
            )}
        />
    );
};

export default PromptListSectionImage;
