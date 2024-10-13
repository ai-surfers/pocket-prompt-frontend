import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                icon: true,
                memo: true,
            },
        }),
    ],
    resolve: {
        alias: [{ find: "@", replacement: "/src" }],
    },
    envDir: "./pocket-prompt-frontend-envs/",
});
