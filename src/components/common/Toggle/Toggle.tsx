import styled, { css } from "styled-components";
import { PropsWithChildren, useMemo } from "react";

interface ToggleProps {
    items: string[];
    value: string;
    onChange: (value: string) => void;
}
export default function Toggle({ items, value, onChange }: ToggleProps) {
    const activeIndex = useMemo(() => {
        return items.indexOf(value);
    }, [value, items]);

    function handleOnClick(item: string) {
        onChange(item);
    }

    return (
        <ToggleContainer>
            <SlideBackground
                activeIndex={activeIndex}
                itemCount={items.length}
            />
            {items.map((it) => (
                <Item
                    active={it === value}
                    key={it}
                    onClick={() => handleOnClick(it)}
                >
                    {it}
                </Item>
            ))}
        </ToggleContainer>
    );
}

const ToggleContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox()}
    position: relative;

    gap: 5px;
    padding: 4px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.primary_10};
    overflow: hidden;
`;

interface ItemProps {
    active?: boolean;
    onClick: () => void;
}
const Item = ({ active, children, onClick }: PropsWithChildren<ItemProps>) => {
    return (
        <ItemContainer active={active} onClick={onClick}>
            {children}
        </ItemContainer>
    );
};

const ItemContainer = styled.div<{ active?: boolean }>`
    ${({ theme }) => theme.mixins.flexBox()}
    flex: 1;
    border-radius: 6px;
    padding: 8px 36px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.G_500};
    ${({ theme }) => theme.fonts.b3_14_med};
    z-index: 1;

    ${({ theme, active }) =>
        active &&
        css`
            ${theme.fonts.b3_14_semi}
            color: ${theme.colors.primary_100};
        `};
`;

const SlideBackground = styled.div<{ activeIndex: number; itemCount: number }>`
    position: absolute;
    top: 4px;
    left: 4px;
    z-index: 0;

    height: calc(100% - 8px);
    width: ${({ itemCount }) => `calc((100% - 12px) / ${itemCount})`};
    border-radius: 6px;

    background: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 0px 64px 0px rgba(117, 128, 234, 0.6);

    transition: transform 0.3s ease;
    transform: translateX(${({ activeIndex }) => `${activeIndex * 101}%`});
`;
