import styled from "styled-components";
import videoGif from "../../assets/pocket-prompt-demo-video.gif";

const PageContainer = styled.div`
    padding: 2rem 4rem;
    /* cspell:disable-file */
    /* webkit printing magic: print all background colors */
    html {
        -webkit-print-color-adjust: exact;
    }
    * {
        box-sizing: border-box;
        -webkit-print-color-adjust: exact;
    }

    @media only screen {
        body {
            margin: 2em auto;
            max-width: 900px;
            color: rgb(55, 53, 47);
        }
    }

    body {
        line-height: 1.5;
        white-space: pre-wrap;
    }

    a,
    a.visited {
        color: inherit;
        text-decoration: underline;
    }

    .pdf-relative-link-path {
        font-size: 80%;
        color: #444;
    }

    h1,
    h2,
    h3 {
        letter-spacing: -0.01em;
        line-height: 1.2;
        font-weight: 600;
        margin-bottom: 0;
    }

    .page-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 0.75em;
    }

    h1 {
        font-size: 1.875rem;
        margin-top: 1.875rem;
    }

    h2 {
        font-size: 1.5rem;
        margin-top: 1.5rem;
    }

    h3 {
        font-size: 1.25rem;
        margin: 3rem 0 1.25rem;
    }

    .source {
        border: 1px solid #ddd;
        border-radius: 3px;
        padding: 1.5em;
        word-break: break-all;
    }

    .callout {
        border-radius: 3px;
        padding: 1rem;
    }

    figure {
        margin: 1.25em 0;
        page-break-inside: avoid;
    }

    figcaption {
        opacity: 0.5;
        font-size: 85%;
        margin-top: 0.5em;
    }

    mark {
        background-color: transparent;
    }

    .indented {
        padding-left: 1.5em;
    }

    hr {
        background: transparent;
        display: block;
        width: 100%;
        height: 1px;
        visibility: visible;
        border: none;
        border-bottom: 1px solid rgba(55, 53, 47, 0.09);
    }

    img {
        max-width: 100%;
    }

    @media only print {
        img {
            max-height: 100vh;
            object-fit: contain;
        }
    }

    @page {
        margin: 1in;
    }

    .collection-content {
        font-size: 0.875rem;
    }

    .column-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .column {
        padding: 0 1em;
        flex: 1;
    }

    .column:first-child {
        padding-left: 0;
    }

    .column:last-child {
        padding-right: 0;
    }

    .table_of_contents-item {
        display: block;
        font-size: 0.875rem;
        line-height: 1.3;
        padding: 0.125rem;
    }

    .table_of_contents-indent-1 {
        margin-left: 1.5rem;
    }

    .table_of_contents-indent-2 {
        margin-left: 3rem;
    }

    .table_of_contents-indent-3 {
        margin-left: 4.5rem;
    }

    .table_of_contents-link {
        text-decoration: none;
        opacity: 0.7;
        border-bottom: 1px solid rgba(55, 53, 47, 0.18);
    }

    table,
    th,
    td {
        border: 1px solid rgba(55, 53, 47, 0.09);
        border-collapse: collapse;
    }

    table {
        border-left: none;
        border-right: none;
    }

    th,
    td {
        font-weight: normal;
        padding: 0.25em 0.5em;
        line-height: 1.5;
        min-height: 1.5em;
        text-align: left;
    }

    th {
        color: rgba(55, 53, 47, 0.6);
    }

    ol,
    ul {
        margin: 0;
        margin-block-start: 0.6em;
        margin-block-end: 0.6em;
    }

    li > ol:first-child,
    li > ul:first-child {
        margin-block-start: 0.6em;
    }

    ul > li {
        list-style: disc;
    }

    ul.to-do-list {
        padding-inline-start: 0;
    }

    ul.to-do-list > li {
        list-style: none;
    }

    .to-do-children-checked {
        text-decoration: line-through;
        opacity: 0.375;
    }

    ul.toggle > li {
        list-style: none;
    }

    ul {
        padding-inline-start: 1.7em;
    }

    ul > li {
        padding-left: 0.1em;
    }

    ol {
        padding-inline-start: 1.6em;
    }

    ol > li {
        padding-left: 0.2em;
    }

    .mono ol {
        padding-inline-start: 2em;
    }

    .mono ol > li {
        text-indent: -0.4em;
    }

    .toggle {
        padding-inline-start: 0em;
        list-style-type: none;
    }

    /* Indent toggle children */
    .toggle > li > details {
        padding-left: 1.7em;
    }

    .toggle > li > details > summary {
        margin-left: -1.1em;
    }

    .selected-value {
        display: inline-block;
        padding: 0 0.5em;
        background: rgba(206, 205, 202, 0.5);
        border-radius: 3px;
        margin-right: 0.5em;
        margin-top: 0.3em;
        margin-bottom: 0.3em;
        white-space: nowrap;
    }

    .collection-title {
        display: inline-block;
        margin-right: 1em;
    }

    .page-description {
        margin-bottom: 2em;
    }

    .simple-table {
        margin-top: 1em;
        font-size: 0.875rem;
        empty-cells: show;
    }
    .simple-table td {
        height: 29px;
        min-width: 120px;
    }

    .simple-table th {
        height: 29px;
        min-width: 120px;
    }

    .simple-table-header-color {
        background: rgb(247, 246, 243);
        color: black;
    }
    .simple-table-header {
        font-weight: 500;
    }

    time {
        opacity: 0.5;
    }

    .icon {
        display: inline-block;
        max-width: 1.2em;
        max-height: 1.2em;
        text-decoration: none;
        vertical-align: text-bottom;
        margin-right: 0.5em;
    }

    img.icon {
        border-radius: 3px;
    }

    .user-icon {
        width: 1.5em;
        height: 1.5em;
        border-radius: 100%;
        margin-right: 0.5rem;
    }

    .user-icon-inner {
        font-size: 0.8em;
    }

    .text-icon {
        border: 1px solid #000;
        text-align: center;
    }

    .page-cover-image {
        display: block;
        object-fit: cover;
        width: 100%;
        max-height: 30vh;
    }

    .page-header-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .page-header-icon-with-cover {
        margin-top: -0.72em;
        margin-left: 0.07em;
    }

    .page-header-icon img {
        border-radius: 3px;
    }

    .link-to-page {
        margin: 1em 0;
        padding: 0;
        border: none;
        font-weight: 500;
    }

    p > .user {
        opacity: 0.5;
    }

    td > .user,
    td > time {
        white-space: nowrap;
    }

    input[type="checkbox"] {
        transform: scale(1.5);
        margin-right: 0.6em;
        vertical-align: middle;
    }

    p {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }

    .image {
        border: none;
        margin: 1.5em 0;
        padding: 0;
        border-radius: 0;
        text-align: center;
    }

    .code,
    code {
        background: rgba(135, 131, 120, 0.15);
        border-radius: 3px;
        padding: 0.2em 0.4em;
        border-radius: 3px;
        font-size: 85%;
        tab-size: 2;
    }

    code {
        color: #eb5757;
    }

    .code {
        padding: 1.5em 1em;
    }

    .code-wrap {
        white-space: pre-wrap;
        word-break: break-all;
    }

    .code > code {
        background: none;
        padding: 0;
        font-size: 100%;
        color: inherit;
    }

    blockquote {
        font-size: 1.25em;
        margin: 1em 0;
        padding-left: 1em;
        border-left: 3px solid rgb(55, 53, 47);
    }

    .bookmark {
        text-decoration: none;
        max-height: 8em;
        padding: 0;
        display: flex;
        width: 100%;
        align-items: stretch;
    }

    .bookmark-title {
        font-size: 0.85em;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 1.75em;
        white-space: nowrap;
    }

    .bookmark-text {
        display: flex;
        flex-direction: column;
    }

    .bookmark-info {
        flex: 4 1 180px;
        padding: 12px 14px 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .bookmark-image {
        width: 33%;
        flex: 1 1 180px;
        display: block;
        position: relative;
        object-fit: cover;
        border-radius: 1px;
    }

    .bookmark-description {
        color: rgba(55, 53, 47, 0.6);
        font-size: 0.75em;
        overflow: hidden;
        max-height: 4.5em;
        word-break: break-word;
    }

    .bookmark-href {
        font-size: 0.75em;
        margin-top: 0.25em;
    }

    .sans {
        font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont,
            "Segoe UI Variable Display", "Segoe UI", Helvetica,
            "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji",
            "Segoe UI Symbol";
    }
    .code {
        font-family: "SFMono-Regular", Menlo, Consolas, "PT Mono",
            "Liberation Mono", Courier, monospace;
    }
    .serif {
        font-family: Lyon-Text, Georgia, ui-serif, serif;
    }
    .mono {
        font-family: iawriter-mono, Nitti, Menlo, Courier, monospace;
    }
    .pdf .sans {
        font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,
            "Segoe UI Variable Display", "Segoe UI", Helvetica,
            "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji",
            "Segoe UI Symbol", "Twemoji", "Noto Color Emoji", "Noto Sans CJK JP";
    }
    .pdf:lang(zh-CN) .sans {
        font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,
            "Segoe UI Variable Display", "Segoe UI", Helvetica,
            "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji",
            "Segoe UI Symbol", "Twemoji", "Noto Color Emoji", "Noto Sans CJK SC";
    }
    .pdf:lang(zh-TW) .sans {
        font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,
            "Segoe UI Variable Display", "Segoe UI", Helvetica,
            "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji",
            "Segoe UI Symbol", "Twemoji", "Noto Color Emoji", "Noto Sans CJK TC";
    }
    .pdf:lang(ko-KR) .sans {
        font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont,
            "Segoe UI Variable Display", "Segoe UI", Helvetica,
            "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji",
            "Segoe UI Symbol", "Twemoji", "Noto Color Emoji", "Noto Sans CJK KR";
    }
    .pdf .code {
        font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas,
            "PT Mono", "Liberation Mono", Courier, monospace, "Twemoji",
            "Noto Color Emoji", "Noto Sans Mono CJK JP";
    }
    .pdf:lang(zh-CN) .code {
        font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas,
            "PT Mono", "Liberation Mono", Courier, monospace, "Twemoji",
            "Noto Color Emoji", "Noto Sans Mono CJK SC";
    }
    .pdf:lang(zh-TW) .code {
        font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas,
            "PT Mono", "Liberation Mono", Courier, monospace, "Twemoji",
            "Noto Color Emoji", "Noto Sans Mono CJK TC";
    }
    .pdf:lang(ko-KR) .code {
        font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas,
            "PT Mono", "Liberation Mono", Courier, monospace, "Twemoji",
            "Noto Color Emoji", "Noto Sans Mono CJK KR";
    }
    .pdf .serif {
        font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, "Twemoji",
            "Noto Color Emoji", "Noto Serif CJK JP";
    }
    .pdf:lang(zh-CN) .serif {
        font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, "Twemoji",
            "Noto Color Emoji", "Noto Serif CJK SC";
    }
    .pdf:lang(zh-TW) .serif {
        font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, "Twemoji",
            "Noto Color Emoji", "Noto Serif CJK TC";
    }
    .pdf:lang(ko-KR) .serif {
        font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, "Twemoji",
            "Noto Color Emoji", "Noto Serif CJK KR";
    }
    .pdf .mono {
        font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace,
            "Twemoji", "Noto Color Emoji", "Noto Sans Mono CJK JP";
    }
    .pdf:lang(zh-CN) .mono {
        font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace,
            "Twemoji", "Noto Color Emoji", "Noto Sans Mono CJK SC";
    }
    .pdf:lang(zh-TW) .mono {
        font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace,
            "Twemoji", "Noto Color Emoji", "Noto Sans Mono CJK TC";
    }
    .pdf:lang(ko-KR) .mono {
        font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace,
            "Twemoji", "Noto Color Emoji", "Noto Sans Mono CJK KR";
    }
    .highlight-default {
        color: rgba(55, 53, 47, 1);
    }
    .highlight-gray {
        color: rgba(120, 119, 116, 1);
        fill: rgba(120, 119, 116, 1);
    }
    .highlight-brown {
        color: rgba(159, 107, 83, 1);
        fill: rgba(159, 107, 83, 1);
    }
    .highlight-orange {
        color: rgba(217, 115, 13, 1);
        fill: rgba(217, 115, 13, 1);
    }
    .highlight-yellow {
        color: rgba(203, 145, 47, 1);
        fill: rgba(203, 145, 47, 1);
    }
    .highlight-teal {
        color: rgba(68, 131, 97, 1);
        fill: rgba(68, 131, 97, 1);
    }
    .highlight-blue {
        color: rgba(51, 126, 169, 1);
        fill: rgba(51, 126, 169, 1);
    }
    .highlight-purple {
        color: rgba(144, 101, 176, 1);
        fill: rgba(144, 101, 176, 1);
    }
    .highlight-pink {
        color: rgba(193, 76, 138, 1);
        fill: rgba(193, 76, 138, 1);
    }
    .highlight-red {
        color: rgba(212, 76, 71, 1);
        fill: rgba(212, 76, 71, 1);
    }
    .highlight-default_background {
        color: rgba(55, 53, 47, 1);
    }
    .highlight-gray_background {
        background: rgba(241, 241, 239, 1);
    }
    .highlight-brown_background {
        background: rgba(244, 238, 238, 1);
    }
    .highlight-orange_background {
        background: rgba(251, 236, 221, 1);
    }
    .highlight-yellow_background {
        background: rgba(251, 237, 214, 1);
    }
    .highlight-teal_background {
        background: rgba(237, 243, 236, 1);
    }
    .highlight-blue_background {
        background: rgba(231, 243, 248, 1);
    }
    .highlight-purple_background {
        background: rgba(244, 240, 247, 0.8);
    }
    .highlight-pink_background {
        background: rgba(249, 238, 243, 0.8);
    }
    .highlight-red_background {
        background: rgba(253, 235, 236, 1);
    }
    .block-color-default {
        color: inherit;
        fill: inherit;
    }
    .block-color-gray {
        color: rgba(120, 119, 116, 1);
        fill: rgba(120, 119, 116, 1);
    }
    .block-color-brown {
        color: rgba(159, 107, 83, 1);
        fill: rgba(159, 107, 83, 1);
    }
    .block-color-orange {
        color: rgba(217, 115, 13, 1);
        fill: rgba(217, 115, 13, 1);
    }
    .block-color-yellow {
        color: rgba(203, 145, 47, 1);
        fill: rgba(203, 145, 47, 1);
    }
    .block-color-teal {
        color: rgba(68, 131, 97, 1);
        fill: rgba(68, 131, 97, 1);
    }
    .block-color-blue {
        color: rgba(51, 126, 169, 1);
        fill: rgba(51, 126, 169, 1);
    }
    .block-color-purple {
        color: rgba(144, 101, 176, 1);
        fill: rgba(144, 101, 176, 1);
    }
    .block-color-pink {
        color: rgba(193, 76, 138, 1);
        fill: rgba(193, 76, 138, 1);
    }
    .block-color-red {
        color: rgba(212, 76, 71, 1);
        fill: rgba(212, 76, 71, 1);
    }
    .block-color-default_background {
        color: inherit;
        fill: inherit;
    }
    .block-color-gray_background {
        background: rgba(241, 241, 239, 1);
    }
    .block-color-brown_background {
        background: rgba(244, 238, 238, 1);
    }
    .block-color-orange_background {
        background: rgba(251, 236, 221, 1);
    }
    .block-color-yellow_background {
        background: rgba(251, 237, 214, 1);
    }
    .block-color-teal_background {
        background: rgba(237, 243, 236, 1);
    }
    .block-color-blue_background {
        background: rgba(231, 243, 248, 1);
    }
    .block-color-purple_background {
        background: rgba(244, 240, 247, 0.8);
    }
    .block-color-pink_background {
        background: rgba(249, 238, 243, 0.8);
    }
    .block-color-red_background {
        background: rgba(253, 235, 236, 1);
    }
    .select-value-color-uiBlue {
        background-color: rgba(35, 131, 226, 0.07);
    }
    .select-value-color-pink {
        background-color: rgba(245, 224, 233, 1);
    }
    .select-value-color-purple {
        background-color: rgba(232, 222, 238, 1);
    }
    .select-value-color-green {
        background-color: rgba(219, 237, 219, 1);
    }
    .select-value-color-gray {
        background-color: rgba(227, 226, 224, 1);
    }
    .select-value-color-transparentGray {
        background-color: rgba(227, 226, 224, 0);
    }
    .select-value-color-translucentGray {
        background-color: rgba(0, 0, 0, 0.06);
    }
    .select-value-color-orange {
        background-color: rgba(250, 222, 201, 1);
    }
    .select-value-color-brown {
        background-color: rgba(238, 224, 218, 1);
    }
    .select-value-color-red {
        background-color: rgba(255, 226, 221, 1);
    }
    .select-value-color-yellow {
        background-color: rgba(249, 228, 188, 1);
    }
    .select-value-color-blue {
        background-color: rgba(211, 229, 239, 1);
    }
    .select-value-color-pageGlass {
        background-color: undefined;
    }
    .select-value-color-washGlass {
        background-color: undefined;
    }

    .checkbox {
        display: inline-flex;
        vertical-align: text-bottom;
        width: 16;
        height: 16;
        background-size: 16px;
        margin-left: 2px;
        margin-right: 5px;
    }

    .checkbox-on {
        background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%2358A9D7%22%2F%3E%0A%3Cpath%20d%3D%22M6.71429%2012.2852L14%204.9995L12.7143%203.71436L6.71429%209.71378L3.28571%206.2831L2%207.57092L6.71429%2012.2852Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E");
    }

    .checkbox-off {
        background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.75%22%20y%3D%220.75%22%20width%3D%2214.5%22%20height%3D%2214.5%22%20fill%3D%22white%22%20stroke%3D%22%2336352F%22%20stroke-width%3D%221.5%22%2F%3E%0A%3C%2Fsvg%3E");
    }
`;

const PocketPromptPage = () => {
    return (
        <PageContainer>
            <article
                id="23f9b19e-a2cb-4488-a28a-22a0fa8599de"
                className="page sans"
            >
                <header>
                    <div className="page-header-icon undefined">
                        <span className="icon">🚀</span>
                    </div>
                    <h1 className="page-title">포켓 프롬프트(Pocket Prompt)</h1>
                    <p className="page-description"></p>
                </header>
                <div className="page-body">
                    <p id="e89dfd2e-1479-44a1-8fa5-cba88dfc6aa1" className="">
                        당신의 AI에 날개를 달아줄 최고의 프롬프트와 함께
                    </p>
                    <p id="a3a34be5-c68a-4b5d-b2ac-176b7e8cbeeb" className="">
                        <a href="https://chromewebstore.google.com/detail/pocker-prompt/ffinlaeadcgbhecidamekinhbfkdhodd?authuser=2&amp;hl=en">
                            → 지금 바로 시작하기
                        </a>
                    </p>
                    <hr id="54c740cf-7b2e-4556-8837-6918de277d87" />
                    <div
                        id="9ee8aa7a-a421-4625-9dd9-e18bea777916"
                        className="column-list"
                    >
                        <div
                            id="ce50ff17-bf01-44e0-b7ca-62607820fb04"
                            className="column"
                        >
                            <h3
                                id="6aad71f9-6471-462b-b14e-9a77c8dded05"
                                className=""
                            >
                                프롬프트 작성, 더 이상 고민하지 마세요!
                            </h3>
                            <ul
                                id="f6fa95f4-59e5-4664-8d44-5c7ef73ef97d"
                                className="bulleted-list"
                            >
                                <li style={{ listStyleType: "disc" }}>
                                    아무것도 모르는 초보자도 쉽게 AI를 레버리지
                                </li>
                            </ul>
                            <ul
                                id="f560a146-60e5-4301-a5a2-b6c1b11d116d"
                                className="bulleted-list"
                            >
                                <li style={{ listStyleType: "disc" }}>
                                    대한민국 최고 퀄리티 프롬프트가 모인 곳
                                </li>
                            </ul>
                            <p
                                id="564919db-8772-472b-a577-acadf19b9339"
                                className=""
                            ></p>
                        </div>
                        <div
                            id="b0215247-4668-4414-b07e-332b8b08eb07"
                            className="column"
                        >
                            <h3
                                id="98d48186-7dfd-455a-86a2-116053a0b58a"
                                className=""
                            >
                                언제 어디서나 포켓 프롬프트와 함께
                            </h3>
                            <ul
                                id="f23b3b36-0ee4-4874-9ffb-13b15c478eab"
                                className="bulleted-list"
                            >
                                <li style={{ listStyleType: "disc" }}>
                                    챗GPT, 클로드, 제미나이.
                                </li>
                            </ul>
                            <ul
                                id="852c62cf-b11d-4af7-b2eb-2d515d861d7c"
                                className="bulleted-list"
                            >
                                <li style={{ listStyleType: "disc" }}>
                                    어디서나 사용가능한 플러그인
                                </li>
                            </ul>
                            <p
                                id="019bab39-517f-49b0-8f06-0097bfa2840b"
                                className=""
                            ></p>
                        </div>
                        <div
                            id="32546173-e1e5-4d4e-927d-2bc7becc4966"
                            className="column"
                        >
                            <h3
                                id="228732b2-e862-42d4-9c8b-09c96658b661"
                                className=""
                            >
                                1분 1초가 소중하잖아요?
                            </h3>
                            <ul
                                id="4cd8b7cc-2faa-4e42-bec0-6c6a10287050"
                                className="bulleted-list"
                            >
                                <li style={{ listStyleType: "disc" }}>
                                    클릭 한 번으로 나만의 프롬프트를 쉽고
                                    빠르게, 꺼내 쓰세요
                                </li>
                            </ul>
                            <p
                                id="66bfec32-ca75-4443-97bc-92c0b042d865"
                                className=""
                            ></p>
                        </div>
                    </div>
                    <h3 id="8f2de4bf-4867-4b36-8eb4-3411566a63d6" className="">
                        지금 바로 시작하세요!
                    </h3>
                    <ul
                        id="eb5dfb5a-0f1d-443d-8e47-163be2e4e3f0"
                        className="bulleted-list"
                    >
                        <li style={{ listStyleType: "disc" }}>
                            무료로 크롬 익스텐션을 다운로드하고 당신의 챗GPT에
                            날개를 달아주세요
                        </li>
                    </ul>
                    <p
                        id="9d2f6a78-caa3-410c-9ffa-63a7e999e276"
                        className=""
                    ></p>
                    <figure
                        id="d3a293e1-d7bc-4a36-a87f-2160ee1a528c"
                        className="image"
                    >
                        <a href={videoGif}>
                            <img style={{ width: "708px" }} src={videoGif} />
                        </a>
                    </figure>
                    <p
                        id="0df98ec2-e69d-4b11-926b-624c185fde06"
                        className=""
                    ></p>
                    <p
                        id="d209f2d7-ec7d-4c97-abba-9f24541a7391"
                        className=""
                    ></p>
                    <h3 id="4b63dbe4-111a-4e7c-9b8a-3630ff1a5d50" className="">
                        자주 묻는 질문
                    </h3>
                    <ul
                        id="a4c873a2-ad1e-4617-8f76-fe4b67348364"
                        className="toggle"
                    >
                        <li>
                            <details>
                                <summary>어느 AI에서 사용 가능한가요?</summary>
                                <ul
                                    id="70999df5-a0d7-4d92-989d-3d55950d4826"
                                    className="bulleted-list"
                                >
                                    <li style={{ listStyleType: "disc" }}>
                                        포켓 프롬프트는 어떤 AI 서비스를
                                        이용하더라도 함께 사용할 수 있는
                                        <strong>크롬 익스텐션</strong>으로 현재
                                        아래 3개 플랫폼에서 쉽게 사용
                                        가능합니다.
                                        <ul
                                            id="b975858a-7196-4c81-99a3-cf51c37fddde"
                                            className="bulleted-list"
                                        >
                                            <li
                                                style={{
                                                    listStyleType: "circle",
                                                }}
                                            >
                                                챗GPT
                                            </li>
                                        </ul>
                                        <ul
                                            id="07478c7c-5872-41a4-ae9b-fdb43e5ca662"
                                            className="bulleted-list"
                                        >
                                            <li
                                                style={{
                                                    listStyleType: "circle",
                                                }}
                                            >
                                                클로드
                                            </li>
                                        </ul>
                                        <ul
                                            id="3d0f86d9-7f85-4e4e-ae64-07e05c2c4bc1"
                                            className="bulleted-list"
                                        >
                                            <li
                                                style={{
                                                    listStyleType: "circle",
                                                }}
                                            >
                                                제미나이
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                    <ul
                        id="a31a4251-ae24-43ef-96d0-5bce153235ee"
                        className="toggle"
                    >
                        <li>
                            <details>
                                <summary>
                                    왜 크롬 웹스토어에 검색해도 안나오나요?
                                </summary>
                                <p
                                    id="2b9744e9-d3f0-4f17-bcbc-8bb6ba3407cb"
                                    className=""
                                >
                                    현재는 런칭을 준비하고 있는 Beta 단계입니다.
                                    8월 중순에 공개 익스텐션으로 전환 예정이고,
                                    현재는 링크를 통해서만 접속이 가능합니다.
                                </p>
                            </details>
                        </li>
                    </ul>
                    <ul
                        id="8c3e6688-8fc5-46e7-86f7-2c4bd10a8c81"
                        className="toggle"
                    >
                        <li>
                            <details>
                                <summary>
                                    다른 사용자들과 프롬프트를 공유할 수 있나요?
                                </summary>
                                <ul
                                    id="4dd17878-4efd-4bc4-bd5f-241c65f4145f"
                                    className="bulleted-list"
                                >
                                    <li style={{ listStyleType: "disc" }}>
                                        네, 포켓 프롬프트는 사용자들 간의
                                        프롬프트 공유를 지원하고 있습니다. 이를
                                        통해 고품질의 한국어 프롬프트 플랫폼으로
                                        발전해 나갈 것입니다.
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                    <ul
                        id="e4cc277a-49ec-4d80-b255-ff48f641cb46"
                        className="toggle"
                    >
                        <li>
                            <details>
                                <summary>
                                    포켓 프롬프트를 사용하면 어떤 이점이 있나요?
                                </summary>
                                <ul
                                    id="395970ed-149e-45ba-bcc5-68416f13e495"
                                    className="bulleted-list"
                                >
                                    <li style={{ listStyleType: "disc" }}>
                                        시간 절약, 높은 품질의 프롬프트 사용,
                                        프롬프트 작성 스킬 향상 등 다양한 이점이
                                        있습니다. AI와의 상호작용을 더욱
                                        효율적이고 생산적으로 만들어 줍니다.
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                    <ul
                        id="1182b42b-f54c-45d9-a476-85c4e4be6ec5"
                        className="toggle"
                    >
                        <li>
                            <details>
                                <summary>프롬프트를 만드는 게 어려워요</summary>
                                <ul
                                    id="9486df0e-fbf3-4fa0-9bbf-2928459cc2d5"
                                    className="bulleted-list"
                                >
                                    <li style={{ listStyleType: "disc" }}>
                                        <a href="https://www.notion.so/da477857a0cc44888b06dd23cf6682ff?pvs=21">
                                            <span className="icon">💁‍♂️</span>
                                            프롬프트 추가하기 가이드
                                        </a>
                                        에 자세한 예시와 함께 친절한 가이드를
                                        작성해두었습니다. 천천히 읽으면서
                                        따라해보시면 금방 익숙해지길거예요!
                                    </li>
                                </ul>
                                <ul
                                    id="cf69fde7-22be-4cf1-aa27-7b31770d623f"
                                    className="bulleted-list"
                                >
                                    <li style={{ listStyleType: "disc" }}>
                                        그래도 어려우면 다른 사람들이 작성한
                                        프롬프트를 참고해 나만의 프롬프트를
                                        만들어보세요!
                                    </li>
                                </ul>
                                <ul
                                    id="60220e99-c218-479d-9ef9-c0db0103cdd3"
                                    className="bulleted-list"
                                >
                                    <li style={{ listStyleType: "disc" }}>
                                        완벽한 프롬프트란 없습니다. 여러분의
                                        필요에 맞는 프롬프트를 만드는 것이
                                        중요해요. 포켓 프롬프트와 함께 한 단계씩
                                        AI를 마스터해나가요 😉
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                    <ul
                        id="daf31ae2-477f-47a5-9d9e-6cf40c09df6a"
                        className="toggle"
                    >
                        <li>
                            <details>
                                <summary>크롬에서밖에 사용 못하나요??</summary>
                                <ul
                                    id="e81b1cd6-1ebb-4c77-93f8-e22a57c47489"
                                    className="bulleted-list"
                                >
                                    <li style={{ listStyleType: "disc" }}>
                                        현재는 크롬 익스텐션으로 개발 중이므로
                                        구글 크롬에서 사용 가능합니다. 향후
                                        파이어폭스, 사파리 등 다른 주요
                                        브라우저로의 확장을 고려하고 있습니다.
                                    </li>
                                </ul>
                                <ul
                                    id="67bb7a6b-5b44-4680-909f-283160b5f8dd"
                                    className="bulleted-list"
                                >
                                    <li style={{ listStyleType: "disc" }}>
                                        장기적으로는 고퀄리티의 프롬프트와
                                        결과물을 서로 공유할 수 있는 거대한
                                        웹플랫폼으로의 도약을 준비 중입니다.
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                    <ul
                        id="237ba05e-7627-4c09-aa0d-691a5cdf916b"
                        className="toggle"
                    >
                        <li>
                            <details>
                                <summary>무료인가요?</summary>
                                <ul
                                    id="06494480-c4e1-47ea-9dd4-25f36ee8f8f1"
                                    className="bulleted-list"
                                >
                                    <li style={{ listStyleType: "disc" }}>
                                        포켓 프롬프트는 크롬 브라우저를
                                        사용하시는 모든 분들이 무료로 다운로드
                                        받을 수 있습니다. 또한 플러그인의
                                        기본적인 기능은 모두 무료로 제공합니다.
                                        다만 서버 및 데이터베이스 상황이
                                        제한적이라서 private 프롬프트와
                                        즐겨찾기의 수는 제한을 두고 있습니다.
                                        추후 추가적인 기능에 대해 유료 플랜이
                                        있을 수 있습니다.
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                    <ul
                        id="4fbd5381-c2b3-455a-9ce6-579b57e31cbe"
                        className="toggle"
                    >
                        <li>
                            <details>
                                <summary>
                                    프롬프트 템플릿을 수정할 수 있나요?
                                </summary>
                                <ul
                                    id="44ece39d-df51-45b8-a9e2-5215725fc217"
                                    className="bulleted-list"
                                >
                                    <li style={{ listStyleType: "disc" }}>
                                        네, 저장된 프롬프트 템플릿을 언제든지
                                        수정하고 커스터마이즈할 수 있습니다.
                                        사용자의 필요에 맞게 템플릿을 지속적으로
                                        개선할 수 있습니다.
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                    <p
                        id="602637ff-7231-485b-a452-268d46998377"
                        className=""
                    ></p>
                    <p
                        id="e3c7884f-9a93-49b7-b41b-4d41d502a73c"
                        className=""
                    ></p>
                    <figure
                        id="c699c0fd-cf44-41b6-a436-22e3b196b4e3"
                        className="link-to-page"
                        style={{ marginTop: "100px" }}
                    >
                        <a href="https://www.notion.so/Pocket-Prompt-c699c0fdcf4441b6a43622e3b196b4e3?pvs=21">
                            <span className="icon">📓</span>포켓 프롬프트(Pocket
                            Prompt) 사용 가이드
                        </a>
                    </figure>
                    <figure
                        id="da477857-a0cc-4488-8b06-dd23cf6682ff"
                        className="link-to-page"
                    >
                        <a href="https://www.notion.so/da477857a0cc44888b06dd23cf6682ff?pvs=21">
                            <span className="icon">💁‍♂️</span>프롬프트 추가하기
                            가이드
                        </a>
                    </figure>
                    <figure
                        id="6dc9bbd2-599a-46d3-bbca-c24a18848770"
                        className="link-to-page"
                    >
                        <a href="https://www.notion.so/6dc9bbd2599a46d3bbcac24a18848770?pvs=21">
                            <span className="icon">📃</span>개인정보 처리방침
                        </a>
                    </figure>
                    <figure
                        id="fffd0218-5fca-8083-bad2-ea2cbf1c3420"
                        className="link-to-page"
                    >
                        <a href="https://www.notion.so/Release-Note-fffd02185fca8083bad2ea2cbf1c3420?pvs=21">
                            <span className="icon">🗨️</span>업데이트 Release
                            Note
                        </a>
                    </figure>
                    <div
                        id="b6cd9f42-dfc5-436c-a357-8d0232f07863"
                        className="column-list"
                    >
                        <div
                            id="17e14568-d946-451e-b487-a6b3920dcf97"
                            style={{ width: "25%" }}
                            className="column"
                        >
                            <p
                                id="434a988d-4940-4e98-a8aa-b2021625c6bb"
                                className=""
                            ></p>
                        </div>
                        <div
                            id="6b37dcc0-cb78-4625-887d-44aa9aabdc26"
                            style={{ width: "50%" }}
                            className="column"
                        >
                            <h1
                                id="f2081b02-7fc2-49f5-b76b-0b362cdeb915"
                                className=""
                            >
                                <a href="https://chromewebstore.google.com/detail/pocker-prompt/ffinlaeadcgbhecidamekinhbfkdhodd?authuser=2&amp;hl=en">
                                    Get started for free →
                                </a>
                            </h1>
                        </div>
                        <div
                            id="7eb08f5c-e2f9-443e-8746-9a43116eeb8b"
                            style={{ width: "25.00000000000001%" }}
                            className="column"
                        >
                            <p
                                id="53a67263-d2b7-4bb8-9abf-d58cc6d675e0"
                                className=""
                            ></p>
                        </div>
                    </div>
                    <p
                        id="e3e6fe51-72c3-4966-9c02-c5c2cfb63fed"
                        className=""
                    ></p>
                </div>
            </article>
            <span
                className="sans"
                style={{ fontSize: "14px", paddingTop: "2em" }}
            ></span>
        </PageContainer>
    );
};

export default PocketPromptPage;
