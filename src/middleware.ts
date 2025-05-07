// src/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
    matcher: ["/prompt/:promptId*"],
};

export async function middleware(req: NextRequest) {
    console.log("DEBUG [middleware]: Triggered for:", req.nextUrl.pathname);

    const match = req.nextUrl.pathname.match(/^\/prompt\/([a-f0-9]{24})$/);
    if (!match) return NextResponse.next();
    const promptId = match[1];

    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/prompts/${promptId}`;
        console.log("DEBUG [middleware]: API URL:", apiUrl);

        const apiRes = await fetch(apiUrl, { cache: "no-store" });
        if (!apiRes.ok) {
            console.log("DEBUG [middleware]: API failed:", apiRes.status);
            return NextResponse.rewrite(new URL("/404", req.url));
        }

        const json = await apiRes.json();
        console.log("DEBUG [middleware]: Fetched raw JSON:", json);
        const type = json.type ?? json.data?.type;
        console.log("DEBUG [middleware]: Resolved type:", type);

        if (type !== "text" && type !== "image") {
            return NextResponse.rewrite(new URL("/404", req.url));
        }

        const redirectUrl = new URL(`/prompt/${type}/${promptId}`, req.url);
        console.log("DEBUG [middleware]: Redirecting to:", redirectUrl);
        return NextResponse.redirect(redirectUrl);
    } catch (e) {
        console.error("DEBUG [middleware]: Error during fetch:", e);
        return NextResponse.rewrite(new URL("/404", req.url));
    }
}
