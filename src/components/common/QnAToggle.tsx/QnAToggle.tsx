"use client";

import { useState } from "react";
import ArrowDown from "@svg/extension/arrow-down.svg";
import ArrowUp from "@svg/extension/arrow-up.svg";

import styled from "styled-components";
import Image from "next/image";

interface Props {
    question: string;
    answer: React.ReactNode;
}
const QnAToggle = ({ question, answer }: Props) => {
    const [opened, setOpend] = useState(false);

    return (
        <ToggleContainer>
            <ToggleHeader onClick={() => setOpend(!opened)}>
                <ToggleHeaderTitle $opened={opened}>
                    <span>Q.</span>
                    <p>{question}</p>
                </ToggleHeaderTitle>
                <Image src={opened ? ArrowUp : ArrowDown} alt={question} />
            </ToggleHeader>
            <ToggleContent $opened={opened}>
                <span>A.</span>
                <ToggleContentText>{answer}</ToggleContentText>
            </ToggleContent>
        </ToggleContainer>
    );
};

export default QnAToggle;

const ToggleContainer = styled.div`
    border-radius: 12px;
    background: var(--white, #fff);
    display: flex;
    padding: 12px 20px;
    flex-direction: column;

    @media screen and (max-width: 1279px) {
        padding: 12px;
    }
`;

const ToggleHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
`;

const ToggleHeaderTitle = styled.span<{ $opened: boolean }>`
    display: flex;
    color: var(--gray-600, #3e4151);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: ${({ $opened }) => ($opened ? "700" : "500")};
    line-height: 150%; /* 27px */
    letter-spacing: -0.36px;

    span {
        color: var(--gray-300, #afb1c1);
        font-weight: 500;
        margin-right: 8px;
    }

    @media screen and (max-width: 1279px) {
        font-size: 16px;
    }
`;

const ToggleContent = styled.div<{ $opened: boolean }>`
    display: ${({ $opened }) => ($opened ? "flex" : "none")};
    margin-top: 12px;
    margin-right: 20px;

    span {
        font-family: Pretendard;
        font-size: 18px;
        font-style: normal;
        line-height: 150%; /* 27px */
        letter-spacing: -0.36px;
        font-weight: 500;
        color: var(--primary-100, #7580ea);
        margin-right: 8px;

        @media screen and (max-width: 1279px) {
            font-size: 16px;
        }
    }
`;

const ToggleContentText = styled.p`
    color: var(--gray-500, #5b5f70);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 27px */
    letter-spacing: -0.36px;

    a {
        text-decoration: underline;
    }

    @media screen and (max-width: 1279px) {
        font-size: 16px;
    }
`;
