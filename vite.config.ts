import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

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
        tsconfigPaths(),
    ],
    resolve: {
        alias: { find: "@", replacement: resolve(__dirname, "src") },
    },
    envDir: "./pocket-prompt-frontend-envs/",
});
