import Search from "@/assets/svg/home/Search";
import Input from "@/components/common/Input/Input";
import { keywordState, searchedKeywordState } from "@/states/searchState";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

const SearchBar = () => {
    const [keyword, setKeyword] = useRecoilState(keywordState);
    const setSearchedKeyword = useSetRecoilState(searchedKeywordState);

    return (
        <InputWrapper>
            <SearchIcon />
            <Input
                placeholder="필요한 프롬프트를 검색해보세요"
                value={keyword}
                onChange={setKeyword}
                onEnter={() => setSearchedKeyword(keyword)}
            />
        </InputWrapper>
    );
};

export default SearchBar;

const InputWrapper = styled.div`
    width: 543px;
    height: 52px;
    position: relative;

    Input {
        padding-left: 44px;
    }

    div {
        border-radius: 52px;
    }
`;

const SearchIcon = styled(Search)`
    position: absolute;
    top: 15.5px;
    left: 16px;
`;
