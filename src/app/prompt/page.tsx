// src/app/prompt/page.tsx
import { redirect } from "next/navigation";

export default function PromptIndexPage() {
    // “/prompt” → “/prompt/text”
    redirect("/prompt/text");
}
