import { getPrompt } from "@/apis/prompt/prompt";
import { defaultMetadata } from "@/app/layout";
import { Metadata } from "next";

interface Props {
    params: { promptId: string }; // URL의 id 파라미터를 정의
}

const webUrl = process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { promptId } = params;

    try {
        // getPrompt 함수로 데이터 가져오기
        const promptDetails = await getPrompt(promptId);

        // 가져온 데이터를 메타데이터로 반환
        return {
            ...defaultMetadata,
            description: promptDetails.description,
            keywords: promptDetails.title,
            openGraph: {
                ...defaultMetadata.openGraph,
                title: `[프롬프트] ${promptDetails.title}`,
                description: promptDetails.description,
                url: `${webUrl}/prompt/${promptDetails.id}`,
            },
            twitter: {
                ...defaultMetadata.twitter,
                card: "summary_large_image",
                title: `[프롬프트] ${promptDetails.title}`,
                description: promptDetails.description,
            },
        };
    } catch (error) {
        console.error("Error fetching prompt data for metadata:", error);

        // 실패 시 기본값 메타데이터 설정
        return defaultMetadata;
    }
}

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <main>{children}</main>;
};

export default Layout;
