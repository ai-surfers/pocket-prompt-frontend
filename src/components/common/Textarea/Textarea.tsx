"use client";

import React, { forwardRef } from "react";
import styled, { css } from "styled-components";

export interface TextareaProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    count?: number;
    disabled?: boolean;
    isMini?: boolean;
    defaultHeight?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            placeholder,
            value = "",
            onChange,
            count,
            disabled = false,
            isMini = false,
            defaultHeight,
        },
        ref
    ) => {
        function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
            const value = e.target.value;
            if (count && value.length > count) return;
            onChange(value);

            // 높이 자동 조절
            if (isMini) {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
            }
        }

        return (
            <TextareaContainer $length={value.length} $disabled={disabled}>
                <StyledTextarea
                    ref={ref}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    $isMini={isMini}
                    rows={isMini ? 1 : undefined}
                    $defaultHeight={defaultHeight}
                />
                {count && (
                    <CountBox $length={value.length}>
                        <b>{value.length}</b>/{count}
                    </CountBox>
                )}
            </TextareaContainer>
        );
    }
);

export default Textarea;

const TextareaContainer = styled.div<{ $length: number; $disabled?: boolean }>`
    position: relative;

    display: flex;
    flex-direction: column;
    margin-top: 8px;

    gap: 1px;
    padding: 11px 12px;

    transition: all 0.1s;

    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.primary_20};
    background: ${({ theme, $length }) =>
        $length > 0 ? theme.colors.primary_10 : theme.colors.white};

    &:hover {
        background: ${({ theme }) => theme.colors.primary_10};
    }

    &:focus-within {
        background: ${({ theme }) => theme.colors.primary_10};
        border: 1px solid ${({ theme }) => theme.colors.primary_60};
    }

    ${({ $disabled, theme }) =>
        $disabled &&
        css`
            background: ${theme.colors.G_100};
            border: 1px solid ${theme.colors.G_100};
            pointer-events: none;
        `}
`;

const StyledTextarea = styled.textarea<{
    $isMini: boolean;
    $defaultHeight?: string;
}>`
    ${({ theme }) => theme.fonts.b3_14_reg};
    height: ${({ $isMini, $defaultHeight }) =>
        $isMini ? "23px" : $defaultHeight || "87px"};
    min-height: 23px;
    max-height: 300px;

    border: none;
    background: transparent;
    outline: none;
    color: ${({ theme }) => theme.colors.black};
    resize: vertical;

    &::placeholder {
        color: ${({ theme }) => theme.colors.primary_60};
    }

    &:disabled {
        resize: none;
        color: ${({ theme }) => theme.colors.G_300};

        &::placeholder {
            color: ${({ theme }) => theme.colors.G_300};
        }
    }
`;

const CountBox = styled.span<{ $length: number }>`
    align-self: flex-end;
    ${({ theme }) => theme.fonts.c1_12_reg};
    color: ${({ theme }) => theme.colors.G_300};

    b {
        ${({ theme }) => theme.fonts.c1_12_semi};
        color: ${({ theme, $length }) =>
            $length > 0 ? theme.colors.primary : theme.colors.G_300};
    }
`;
