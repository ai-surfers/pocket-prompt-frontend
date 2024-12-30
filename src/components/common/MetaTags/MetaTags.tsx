import React from "react";
import { Helmet } from "react-helmet-async";

interface MetaTagsProps {
    title?: string;
    description?: string;
    url?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, url }) => {
    return (
        <Helmet>
            {url && <meta property="og:url" content={url} />}
            {url && <link rel="canonical" href={url} />}
            {title && (
                <meta
                    property="og:title"
                    content="포켓 프롬프트 - ChatGPT 프롬프트 모음 | AI 프롬프트 템플릿 저장소"
                />
            )}
            {description && (
                <meta
                    property="og:description"
                    content="ChatGPT, Claude 등 AI 프롬프트 작성이 어려우신가요? 검증된 프롬프트 템플릿을 저장하고 바로 사용하세요!"
                />
            )}
        </Helmet>
    );
};

export default MetaTags;
