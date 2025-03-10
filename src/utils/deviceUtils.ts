export function detectDevice(userAgent: string) {
    const isMobile = /mobile/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent);
    const isUnderTablet = isMobile || isTablet;

    return { isMobile, isTablet, isUnderTablet };
}
