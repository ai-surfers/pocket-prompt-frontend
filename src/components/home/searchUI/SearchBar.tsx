// import Search from "@/assets/svg/home/Search";
import Icon from "@/components/common/Icon";
import Input from "@/components/common/Input/Input";
import {
    keywordState,
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

const SearchBar = () => {
    const [keyword, setKeyword] = useRecoilState(keywordState);
    const setSearchedKeyword = useSetRecoilState(searchedKeywordState);
    const setSearchedCategory = useSetRecoilState(searchedCategoryState);

    const handleChange = () => {
        setSearchedKeyword(keyword);
        // setSearchedCategory("");
    };

    return (
        <InputWrapper>
            <SearchIcon>
                <Icon name="SearchNormal" />
            </SearchIcon>

            <Input
                id="search-input"
                placeholder="필요한 프롬프트를 검색해보세요"
                value={keyword}
                onChange={setKeyword}
                onEnter={handleChange}
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
