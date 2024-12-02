import { Col, Flex, Pagination, Row, Select } from "antd";
import Prompt from "../Prompt/Prompt";
import styled from "styled-components";
import usePromptsListQuery, {
    PromptQueryProps,
} from "@/hooks/queries/prompts/usePromptsListQuery";
import { SortType } from "@/apis/prompt/prompt.model";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import {
    searchedKeywordState,
    searchedCategoryState,
} from "@/states/searchState";
import { Categories } from "@/core/Prompt";
import useDeviceSize from "@/hooks/useDeviceSize";
import { ImgEmpty } from "@/assets/svg";
import Text from "@/components/common/Text/Text";

interface PaginatedPromptProps {
    usePage?: boolean;
    type: "total" | "popular" | "search" | "category";
}

const PaginatedPrompt = ({ type, usePage = true }: PaginatedPromptProps) => {
    const [sortBy, setSortBy] = useState<SortType>("created_at");
    const searchedKeyword = useRecoilValue(searchedKeywordState);
    const searchCategory = useRecoilValue(searchedCategoryState);

    const { isUnderTablet } = useDeviceSize();

    const limit = isUnderTablet ? 5 : undefined;
    const promptQueryParams: PromptQueryProps = (() => {
        switch (type) {
            case "total":
                return { sortBy: sortBy, limit: limit };
            case "popular":
                return { sortBy: "star", limit: 3 };
            case "search":
                return {
                    sortBy: sortBy,
                    limit: limit,
                    query: searchedKeyword,
                };
            case "category":
                if (searchCategory === "total") {
                    return { sortBy: sortBy, limit: limit };
                }
                return {
                    sortBy: sortBy,
                    limit: limit,
                    categories: searchCategory,
                };
        }
    })();

    const {
        items,
        totalItems,
        currentPage,
        itemsPerPage,
        handlePageChange,
        isLoading,
    } = usePromptsListQuery({ ...promptQueryParams });

    const handleChange = (value: SortType) => {
        setSortBy(value);
    };

    const promptTitle = (() => {
        switch (type) {
            case "total":
                return "📖 전체 프롬프트";
            case "popular":
                return "🔥 지금 인기 있는 프롬프트";
            case "search":
                return "검색된 프롬프트";
            case "category":
                return `${Categories[searchCategory].emoji} ${Categories[searchCategory].ko} 프롬프트`;
        }
    })();

    return (
        <Flex vertical gap={20} style={{ width: "100%" }}>
            <TitleWrapper>
                <Title>{promptTitle}</Title>
                {usePage && (
                    <SelectWrapper>
                        <Select
                            defaultValue="created_at"
                            style={{ width: 123 }}
                            onChange={handleChange}
                            options={[
                                { value: "created_at", label: "최신 순" },
                                { value: "relevance", label: "관련도 순" },
                                { value: "star", label: "인기 순" },
                            ]}
                        />
                    </SelectWrapper>
                )}
            </TitleWrapper>

            <Row gutter={[16, 16]}>
                {isLoading ? (
                    Array.from({ length: itemsPerPage }).map((_, idx) => (
                        <Col key={idx} xs={24} sm={12} md={8}>
                            <SkeletonBox key={idx} />
                        </Col>
                    ))
                ) : items.length < 1 ? (
                    <Empty />
                ) : (
                    items.map((item, index) => (
                        <Col key={item.id} xs={24} sm={12} md={8}>
                            <Prompt
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                views={item.views}
                                star={item.star}
                                usages={item.usages}
                                colored={type === "popular"}
                                index={index + 1}
                            />
                        </Col>
                    ))
                )}
            </Row>

            {usePage && (
                <div style={{ margin: "0 auto" }}>
                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={totalItems || 0}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </div>
            )}
        </Flex>
    );
};

export default PaginatedPrompt;

const SkeletonBox = styled.div`
    ${({ theme }) => theme.mixins.skeleton()};
    width: 358px;
    height: 157px;
    border-radius: 8px;
`;

const SelectWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "end")};
    width: 100%;
`;

const TitleWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "space-between")};
    width: 100%;
`;

const Title = styled.div`
    text-align: start;
    width: 100%;
    ${({ theme }) => theme.colors.G_800};
    ${({ theme }) => theme.fonts.header1};
    ${({ theme }) => theme.fonts.bold};
`;

const Empty = () => {
    return (
        <EmptyWrapper vertical justify="center" align="center" gap={16}>
            <ImgEmpty width={148} />

            <Flex vertical align="center" gap={2}>
                <Text font="b2_16_semi" color="G_700">
                    아직 등록된 프롬프트가 없어요!
                </Text>
                <Text font="b3_14_reg" color="G_400">
                    1등으로 관련 프롬프트를 등록해볼까요?
                </Text>
            </Flex>
        </EmptyWrapper>
    );
};

const EmptyWrapper = styled(Flex)`
    width: 100%;
    padding: 80px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.G_50};
`;
