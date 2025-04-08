"use client";

import HomeContentBase from "../HomeContentBase";
import PromptListSectionText from "./list/PromptListSectionText";

export default function HomeContentText() {
    return (
        <HomeContentBase
            PromptListSection={PromptListSectionText}
            initialMenu="1"
        />
    );
}
