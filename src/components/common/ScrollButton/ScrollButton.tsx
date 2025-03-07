import React from "react";
import styled from "styled-components";
import Icon from "../Icon";
import { CurrentScrollType } from "@/components/home/prompt/PromptListSection";

interface ScrollButtonProps {
    currentScroll: CurrentScrollType;
    onClick: () => void;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({
    currentScroll,
    onClick,
}) => {
    if (currentScroll === "switching") return <></>;
    console.log(
        "버튼 렌더링, 버튼 방향",
        currentScroll === "left" ? "right" : "left"
    );
    return currentScroll === "left" ? (
        <StyledButton
            onClick={onClick}
            style={{
                position: "absolute",
                left: "calc(100vw - 64px)",
                top: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                background: "",
                border: "none",
                cursor: "pointer",
                padding: "10px",
                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            }}
        >
            <Icon name="ArrowRight2" color="G_400" />
        </StyledButton>
    ) : (
        <StyledButton
            onClick={onClick}
            style={{
                position: "absolute",
                right: "calc(100vw - 43px)",
                top: "50%",
                transform: "translate(100%, -50%)",
                zIndex: 100,
                background: "",
                border: "none",
                cursor: "pointer",
                padding: "10px",
                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            }}
        >
            <Icon name="ArrowLeft2" color="G_400" />
        </StyledButton>
    );
};

export default ScrollButton;

const StyledButton = styled.button`
    border-radius: 20px;
    background: var(--white, #fff);
    box-shadow: 0px 7px 31px 0px rgba(7, 9, 68, 0.1);
`;
