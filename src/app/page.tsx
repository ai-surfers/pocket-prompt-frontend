import { redirect } from "next/navigation";

export default function Home() {
    redirect("/text"); // 기본적으로 텍스트 프롬프트 홈으로 이동
}
