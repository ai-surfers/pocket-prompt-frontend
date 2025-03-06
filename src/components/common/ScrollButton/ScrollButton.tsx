import React from "react";
import styled from "styled-components";
import Icon from "../Icon";
import { ArrowRight } from "iconsax-react";

interface ScrollButtonProps {
    direction: "left" | "right";
    onClick: () => void;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ direction, onClick }) => {
    return (
        <StyledButton
            onClick={onClick}
            style={{
                position: "absolute",
                [direction === "left" ? "left" : "right"]: 0,
                top: "40%",
                transform: "translateY(-70%)",
                zIndex: 10,
                background: "",
                border: "none",
                cursor: "pointer",
                padding: "10px",
                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            }}
        >
            {direction === "left" ? (
                <Icon name="ArrowLeft2" color="G_400" />
            ) : (
                <Icon name="ArrowRight2" color="G_400" />
            )}
        </StyledButton>
    );
};

export default ScrollButton;

const StyledButton = styled.button`
    border-radius: 20px;
    background: var(--white, #fff);
    box-shadow: 0px 7px 31px 0px rgba(7, 9, 68, 0.1);
`;
