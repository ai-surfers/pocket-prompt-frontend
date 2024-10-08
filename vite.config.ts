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
        alias: [
            { find: "@", replacement: "/src" },
            { find: "@components", replacement: "/src/components" },
        ],
    },
    envDir: "./pocket-prompt-frontend-envs/",
});
