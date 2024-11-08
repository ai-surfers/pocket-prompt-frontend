import styled from "styled-components";

export const PromptWrapper = styled.div<{ colored: boolean }>`
    ${({ theme }) => theme.mixins.flexBox("column", "space-between")};
    width: 358px;
    height: 157px;
    border-radius: 12px;
    border: 1.5px solid;
    border-color: ${({ theme, colored }) =>
        colored ? "#ACB3F2" : theme.colors.primary_20};
    padding: 16px;
    gap: 9.5px;
    background-color: ${({ colored, theme }) =>
        colored ? "#F2F3FD" : theme.colors.white};
    position: relative;
    cursor: pointer;
`;

export const NumberTag = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
    position: absolute;
    width: 33px;
    height: 35px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 0px 11px 0px 12px;
    top: 0;
    right: 0;
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.body2};
    ${({ theme }) => theme.fonts.bold};
`;

export const TitlesWrapper = styled.div`
    width: 100%;
    box-sizing: content-box;
    height: 76px;
    padding-bottom: 15.5px;
    border-bottom: 1.5px solid;
    border-color: ${({ theme }) => theme.colors.primary_20};
`;

export const Title = styled.div<{ colored: boolean }>`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${({ theme }) => theme.fonts.body1};
    ${({ theme }) => theme.fonts.semibold};
    color: ${({ theme }) => theme.colors.G_600};
    margin-bottom: 8px;
    width: ${({ colored }) => (colored ? "calc(100% - 33px)" : "100%")};
`;

export const Subtitle = styled.div`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    ${({ theme }) => theme.fonts.body3};
    ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.G_400};
`;

export const DetailsWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "flex-end")};
    width: 100%;
    height: 21px;
    gap: 20px;
`;

export const Details = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row")};
    gap: 4px;
`;

export const Numbers = styled.div`
    color: ${({ color }) => color};
    ${({ theme }) => theme.fonts.body3};
    ${({ theme }) => theme.fonts.regular};
`;
