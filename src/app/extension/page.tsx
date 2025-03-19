"use client";

import {
    keywordState,
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import Extension1 from "@components/extension/Extension1";
import Extension2 from "@components/extension/Extension2";
import Extension3 from "@components/extension/Extension3";
import Extension4 from "@components/extension/Extension4";
import Extension5 from "@components/extension/Extension5";
import Extension6 from "@components/extension/Extension6";
import Extension7 from "@components/extension/Extension7";
import Extension8 from "@components/extension/Extension8";
import Extension9 from "@components/extension/Extension9";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const ExtensionPage = () => {
    const [isClient, setIsClient] = useState(false);
    const [keyword, setKeyword] = useRecoilState(keywordState);
    const [searchedKeyword, setSearchedKeyword] =
        useRecoilState(searchedKeywordState);
    const [searchedCategory, setSearchedCategory] = useRecoilState(
        searchedCategoryState
    );

    useEffect(() => {
        setIsClient(true); // 클라이언트에서만 렌더링 허용
        return () => {
            setKeyword("");
            setSearchedKeyword("");
            setSearchedCategory("");
        };
    }, []);

    if (!isClient) {
        // 서버와 클라이언트 렌더링 불일치 방지
        return null;
    }

    return (
        <ExtensionPageContainer>
            <Extension1 />
            <Extension2 />
            <Extension3 />
            <Extension4 />
            <Extension5 />
            <Extension6 />
            <Extension7 />
            <Extension8 />
            <Extension9 />
        </ExtensionPageContainer>
    );
};

export default ExtensionPage;

const ExtensionPageContainer = styled.main`
    padding-top: 52px;
    width: 100vw;
`;
