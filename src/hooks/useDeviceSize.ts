import { useMediaQuery } from "react-responsive";

export default function useDeviceSize() {
    const isDesktop = useMediaQuery({ minWidth: "1024px" });
    const isTablet = useMediaQuery({ minWidth: "768px", maxWidth: "1023px" });
    const isMobile = useMediaQuery({ maxWidth: "767px" });

    const isUnderTablet = isTablet || isMobile;

    return { isDesktop, isTablet, isMobile, isUnderTablet };
}
