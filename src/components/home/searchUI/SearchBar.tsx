"use client";

import Icon from "@/components/common/Icon";
import Input from "@/components/common/Input/Input";
import styled from "styled-components";

// TypeScript 타입 정의
interface SearchBarProps {
    value: string; // 검색어 값
    onChange: (value: string) => void; // 검색어 변경 핸들러
    onEnter: () => void; // Enter 키 입력 핸들러
    placeholder?: string; // 플레이스홀더 (선택적)
    id?: string; // 입력 요소 ID (선택적)
}

const SearchBar = ({
    value,
    onChange,
    onEnter,
    placeholder = "필요한 프롬프트를 검색해보세요",
    id = "search-input",
}: SearchBarProps) => {
    return (
        <InputWrapper>
            <SearchIcon>
                <Icon name="SearchNormal" />
            </SearchIcon>

            <Input
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onEnter={onEnter}
            />
        </InputWrapper>
    );
};

export default SearchBar;

const InputWrapper = styled.div`
    width: 100%;
    height: 52px;
    position: relative;

    Input {
        padding-left: 44px;
    }

    div {
        border-radius: 52px;
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    top: 15.5px;
    left: 16px;
`;
