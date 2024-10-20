import styled, { css } from "styled-components";

export interface InputProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    count?: number;
    disabled?: boolean;
}
export default function Input({
    placeholder,
    value,
    onChange,
    count,
    disabled = false,
}: InputProps) {
    function handleChange(e) {
        const value = e.target.value;

        if (count && value.length > count) return;
        onChange(value);
    }

    return (
        <InputContainer $length={value.length} $disabled={disabled}>
            <StyledInput
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                disabled={disabled}
            />
            {count && (
                <CountBox $length={value.length}>
                    <b>{value.length}</b>/{count}
                </CountBox>
            )}
        </InputContainer>
    );
}

const InputContainer = styled.div<{ $length: number; $disabled?: boolean }>`
    display: flex;
    align-items: center;
    padding: 11px 12px;
    margin-top: 8px;

    ${({ theme }) => theme.fonts.b3_14_reg};
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
            color: ${theme.colors.G_300};
            pointer-events: none;
        `}
`;

const StyledInput = styled.input`
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    color: ${({ theme }) => theme.colors.black};

    &::placeholder {
        color: ${({ theme }) => theme.colors.primary_60};
    }

    &:disabled {
        color: ${({ theme }) => theme.colors.G_300};

        &::placeholder {
            color: ${({ theme }) => theme.colors.G_300};
        }
    }
`;

const CountBox = styled.div<{ $length: number }>`
    margin-left: 8px;
    ${({ theme }) => theme.fonts.c1_12_reg};
    color: ${({ theme }) => theme.colors.G_300};

    b {
        ${({ theme }) => theme.fonts.c1_12_semi};
        color: ${({ theme, $length }) =>
            $length > 0 ? theme.colors.primary : theme.colors.G_300};
    }
`;
