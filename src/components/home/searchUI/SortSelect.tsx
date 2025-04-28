import { SortType } from "@/apis/prompt/prompt.model";
import { searchedKeywordState } from "@/states/searchState";
import { sortTypeState } from "@/states/sortState";
import { Select } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

const SortSelect = ({ effectiveSortBy }: { effectiveSortBy: SortType }) => {
    const [sortBy, setSortBy] = useRecoilState(sortTypeState);
    const searchedKeyword = useRecoilValue(searchedKeywordState);

    const handleSortChange = (value: SortType) => {
        setSortBy(value);
    };

    const selectOptions = [
        { value: "created_at", label: "최신 순" },
        ...(searchedKeyword
            ? [{ value: "relevance", label: "관련도 순" }]
            : []),
        { value: "star", label: "인기 순" },
    ];

    return (
        <SelectWrapper>
            <Select
                id="prompt-sort-select"
                value={sortBy}
                style={{ width: 123 }}
                onChange={handleSortChange}
                options={selectOptions}
            />
        </SelectWrapper>
    );
};

const SelectWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "end")};
    width: 100%;
    flex: 1;
`;

export default SortSelect;
