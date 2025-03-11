"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface DeviceContextProps {
    isUnderTablet: boolean;
    isMobile: boolean;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

export const DeviceProvider = ({
    isUnderTablet: serverIsUnderTablet,
    isMobile: serverIsMobile,
    children,
}: {
    isUnderTablet: boolean;
    isMobile: boolean;
    children: React.ReactNode;
}) => {
    const [deviceState, setDeviceState] = useState({
        isUnderTablet: serverIsUnderTablet,
        isMobile: serverIsMobile,
    });

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 768;
            const isTablet =
                window.innerWidth >= 768 && window.innerWidth < 1025;
            setDeviceState({
                isUnderTablet: isMobile || isTablet,
                isMobile,
            });
        };

        handleResize(); // 초기 실행
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <DeviceContext.Provider value={deviceState}>
            {children}
        </DeviceContext.Provider>
    );
};

export const useDeviceSize = () => {
    const context = useContext(DeviceContext);
    if (!context) {
        throw new Error("useDeviceSize must be used within a DeviceProvider");
    }
    return context;
};
