const dotenv = require("dotenv");
const path = require("path");

// 환경 변수 파일 경로 설정
const envFilePath = path.resolve(
    __dirname,
    "pocket-prompt-frontend-next-envs/.env.next." +
        (process.env.APP_ENV || process.env.NODE_ENV || "development")
);

// .env 파일 로드
dotenv.config({ path: envFilePath });

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true, // SSR 활성화
      },
    reactStrictMode: true,
    swcMinify: true,
    images: {
        formats: ["image/avif", "image/webp"],
    },
    env: {
        APP_ENV: process.env.APP_ENV, 
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
        NEXT_PUBLIC_PORTONE_STORE_ID: process.env.NEXT_PUBLIC_PORTONE_STORE_ID,
        NEXT_PUBLIC_PORTONE_CHANNEL_KEY:
            process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY,
        NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
            process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        NEXT_PUBLIC_FIREBASE_PROJECT_ID:
            process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
            process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
            process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
            process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
        SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    },
};

module.exports = nextConfig;
