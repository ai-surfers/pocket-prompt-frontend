// ref: https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-components
"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { extractStyle, createCache, StyleProvider } from "@ant-design/cssinjs";

const cache = createCache();

export default function StyledComponentsRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement();
        const antdStyles = extractStyle(cache);

        return (
            <>
                {styles}
                <style dangerouslySetInnerHTML={{ __html: antdStyles }} />{" "}
                {/* ✅ `antd` 스타일을 서버에서 삽입 */}
            </>
        );
    });

    // ✅ 클라이언트에서 실행될 때는 `StyleSheetManager` 없이 렌더링
    if (typeof window !== "undefined") {
        return <>{children}</>;
    }

    return (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
            <StyleProvider cache={cache}>{children}</StyleProvider>
        </StyleSheetManager>
    );
}
