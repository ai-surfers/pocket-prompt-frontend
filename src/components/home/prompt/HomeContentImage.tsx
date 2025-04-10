"use client";

import HomeContentBase from "../HomeContentBase";
import PromptListSectionImage from "./list/PromptListSectionImage";

export default function HomeContentImage() {
    return (
        <HomeContentBase
            PromptListSection={PromptListSectionImage}
            initialMenu="2"
        />
    );
}
