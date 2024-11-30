import { useMediaQuery } from "react-responsive";

export default function useDeviceSize() {
    const isDesktop = useMediaQuery({ minWidth: "1025px" });
    const isTablet = useMediaQuery({ minWidth: "768px", maxWidth: "1024px" });
    const isMobile = useMediaQuery({ maxWidth: "767px" });

    const isUnderTablet = isTablet || isMobile;

    return { isDesktop, isTablet, isMobile, isUnderTablet };
}
