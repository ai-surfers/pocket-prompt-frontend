export function detectDevice(userAgent: string) {
    const isMobile = /mobile/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent);
    const isMacLikeTablet =
        /macintosh/i.test(userAgent) && "ontouchend" in globalThis;
    const isUnderTablet = isMobile || isTablet || isMacLikeTablet;

    return { isMobile, isTablet, isUnderTablet };
}
