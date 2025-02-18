import Script from "next/script";

export default function DetailPageSiderBar() {
    return (
        <div>
            {/* 광고 마크업 */}
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-3373210774302054"
                data-ad-slot="3822254570"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
            {/* 광고 초기화 스크립트 */}
            <Script id="adsbygoogle-push" strategy="afterInteractive">
                {`(adsbygoogle = window.adsbygoogle || []).push({});`}
            </Script>
        </div>
    );
}
