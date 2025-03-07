import React, { useEffect, useRef, useState } from "react";

export type CurrentScrollType = "right" | "left" | "switching";

const useScrollButtonControl = () => {
    const [currentScroll, setCurrentScroll] =
        useState<CurrentScrollType>("left");
    const scrollLeftRef = useRef<HTMLDivElement>(null);
    const scrollRightRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (currentScroll === "left" && scrollRightRef.current) {
            scrollRightRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
            });
            setCurrentScroll("right");
        }
        if (currentScroll === "right" && scrollLeftRef.current) {
            scrollLeftRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
            });
            setCurrentScroll("left");
        }
    };

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.7, // 요소가 90% 이상 보일 때 감지
        };
        console.log("감지중");

        const handleIntersection = () => {
            const leftBound =
                scrollLeftRef.current?.getBoundingClientRect().left ??
                Number.NEGATIVE_INFINITY;
            const rightBound =
                scrollRightRef.current?.getBoundingClientRect().right ??
                Number.POSITIVE_INFINITY;
            const viewportWidth = window.innerWidth;

            const leftVisible = leftBound >= 0;
            const rightVisible = rightBound <= viewportWidth;

            if (leftVisible && !rightVisible) {
                setCurrentScroll("left");
                console.log("set to left");
            } else if (!leftVisible && rightVisible) {
                setCurrentScroll("right");
                console.log("set to right");
            } else {
                setCurrentScroll("switching");
                console.log("set to switching");
            }
        };

        const leftObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setCurrentScroll("left");
                console.log("90% left, set to left");
            } else {
                handleIntersection();
            }
        }, observerOptions);

        const rightObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setCurrentScroll("right");
                console.log("90% right, set to right");
            } else {
                handleIntersection();
            }
        }, observerOptions);

        if (scrollLeftRef.current) leftObserver.observe(scrollLeftRef.current);
        if (scrollRightRef.current)
            rightObserver.observe(scrollRightRef.current);

        return () => {
            leftObserver.disconnect();
            rightObserver.disconnect();
        };
    }, []);
    return { scrollLeftRef, scrollRightRef, handleScroll, currentScroll };
};

export default useScrollButtonControl;
