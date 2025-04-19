"use client";

import { getPromptsList } from "@/apis/prompt/prompt";
import { PromptDetails } from "@/apis/prompt/prompt.model";
import VocModal from "@/components/home/VocModal";
import HomeSiderBar from "@/components/home/siderbarAd/HomeSiderBar";
import HomeLnb from "@/components/lnb/HomeLnb";
import { useGetSubscription } from "@/hooks/queries/payments/useGetSubscription";
import { useUser } from "@/hooks/useUser";
import { prevPathState } from "@/states/navigationState";
import {
    keywordState,
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import { useDeviceSize } from "@components/DeviceContext";
import Icon from "@components/common/Icon";
import { Wrapper } from "@components/layout/LayoutClient";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    useRecoilState,
    useRecoilValue,
    useResetRecoilState,
    useSetRecoilState,
} from "recoil";
import styled from "styled-components";
import SearchSection from "./SearchSection";
import Banner from "./banner/Banner";

type HomeContentBaseProps = {
    PromptListSection: React.ComponentType<{
        searchResults?: PromptDetails[];
    }>;
    initialMenu: string;
};

export default function HomeContentBase({
    PromptListSection,
    initialMenu,
}: HomeContentBaseProps) {
    const { isUnderTablet } = useDeviceSize();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const prevPath = useRecoilValue(prevPathState);

    const [keyword, setKeyword] = useRecoilState(keywordState);
    const [searchedCategory, setSearchedCategory] = useRecoilState(
        searchedCategoryState
    );
    const setSearchedKeyword = useSetRecoilState(searchedKeywordState);
    const resetSearchedKeyword = useResetRecoilState(searchedKeywordState);
    const resetSearchedCategory = useResetRecoilState(searchedCategoryState);

    const [isVocModalOpen, setIsVocModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<
        PromptDetails[] | undefined
    >(undefined);

    const { userData } = useUser();
    const { data: userPaymentData } = useGetSubscription({
        isLogin: userData.isLogin,
    });

    const isSubscriber =
        userData.isLogin && userPaymentData?.subscription_status === "active";

    const isFirstLoadRef = useRef(true);
    const prevPromptTypeRef = useRef<string | null>(null);
    const prevSearchParamsRef = useRef<string>(""); // 이전 쿼리 파라미터 저장

    const fetchSearchData = async (keyword: string, category: string) => {
        try {
            const promptType = pathname.includes("image") ? "image" : "text";
            const params: any = {
                prompt_type: promptType,
                view_type: "open",
                limit: isUnderTablet ? 5 : 18,
                page: 1,
            };

            if (keyword) {
                params.query = keyword;
            }
            if (category && category !== "total") {
                params.category = category;
            }

            const res = await getPromptsList(params);

            let filteredResults = res.prompt_info_list;
            if (category && category !== "total") {
                filteredResults = res.prompt_info_list.filter(
                    (item: PromptDetails) => item.categories.includes(category)
                );
            }

            setSearchResults(filteredResults);
        } catch (err) {
            setSearchResults([]);
        }
    };

    useEffect(() => {
        const isMainPage = pathname === "/text" || pathname === "/image";
        const isDetailPage = pathname.startsWith("/prompt/");
        const cameFromDetail = prevPath.startsWith("/prompt/");
        const currentPromptType = pathname.includes("image") ? "image" : "text";

        // 현재 쿼리 파라미터를 저장 (상세 페이지로 이동 시 유지하기 위해)
        const currentQueryString = searchParams.toString();
        if (isMainPage && currentQueryString) {
            prevSearchParamsRef.current = currentQueryString;
        }

        // 1. 새로고침 감지 및 초기화
        const isPageRefreshed = sessionStorage.getItem("isPageRefreshed");
        if (!isPageRefreshed) {
            console.log("Detected page refresh, initializing states...");
            sessionStorage.setItem("isPageRefreshed", "true");
            isFirstLoadRef.current = true;
        }

        if (isFirstLoadRef.current) {
            resetSearchedKeyword();
            resetSearchedCategory();
            setKeyword("");
            setSearchedCategory("total");
            setSearchResults(undefined);
            if (searchParams.get("keyword") || searchParams.get("category")) {
                console.log("Clearing URL query parameters on refresh...");
                router.replace(pathname, { scroll: false });
            }
            isFirstLoadRef.current = false;
            prevPromptTypeRef.current = currentPromptType;
            return;
        }

        // 2. 프롬프트 타입 변경 시 초기화
        if (
            prevPromptTypeRef.current &&
            prevPromptTypeRef.current !== currentPromptType
        ) {
            resetSearchedKeyword();
            resetSearchedCategory();
            setKeyword("");
            setSearchedCategory("total");
            setSearchResults(undefined);
            if (searchParams.get("keyword") || searchParams.get("category")) {
                router.replace(pathname, { scroll: false });
            }
            prevPromptTypeRef.current = currentPromptType;
            return;
        }
        prevPromptTypeRef.current = currentPromptType;

        // 3. 상세 페이지에서 메인 페이지로 돌아온 경우: 검색어와 카테고리 복원
        if (isMainPage && cameFromDetail) {
            const keywordParam =
                searchParams.get("keyword") ||
                new URLSearchParams(prevSearchParamsRef.current).get("keyword");
            const categoryParam =
                searchParams.get("category") ||
                new URLSearchParams(prevSearchParamsRef.current).get(
                    "category"
                );

            if (keywordParam) {
                setKeyword(keywordParam);
                setSearchedKeyword(keywordParam);
            } else {
                resetSearchedKeyword();
                setKeyword("");
            }
            if (categoryParam) {
                setSearchedCategory(categoryParam);
            } else {
                setSearchedCategory("total");
            }

            if (keywordParam || (categoryParam && categoryParam !== "total")) {
                fetchSearchData(keywordParam || "", categoryParam || "total");
            } else {
                setSearchResults(undefined);
            }
            return;
        }

        // 4. 메인 페이지나 상세 페이지가 아닌 경우: 상태 초기화
        if (!isMainPage && !isDetailPage) {
            console.log("Not on main or detail page, resetting states...");
            resetSearchedKeyword();
            resetSearchedCategory();
            setKeyword("");
            setSearchedCategory("total");
            setSearchResults(undefined);
            // 상세 페이지로 이동 시 쿼리 파라미터를 유지해야 하므로, 여기서만 초기화하지 않음
            return;
        }

        // 5. 메인 페이지에서 URL 파라미터로 상태 업데이트 및 검색
        if (isMainPage) {
            const keywordParam = searchParams.get("keyword");
            const categoryParam = searchParams.get("category");

            if (keywordParam !== keyword) {
                console.log(`Updating keyword to: ${keywordParam || ""}`);
                setKeyword(keywordParam || "");
                setSearchedKeyword(keywordParam || "");
            }
            if (categoryParam !== searchedCategory) {
                setSearchedCategory(categoryParam || "total");
            }

            if (keywordParam || (categoryParam && categoryParam !== "total")) {
                fetchSearchData(keywordParam || "", categoryParam || "total");
            } else {
                setSearchResults(undefined);
            }
        }
    }, [pathname, prevPath, searchParams, router]);

    return (
        <HomeWrapper>
            <HomeContentWrapper $isUnderTablet={isUnderTablet}>
                <LeftSection>
                    <HomeLnb initialMenu={initialMenu} />
                    {!isSubscriber && (
                        <AdContainer $isUnderTablet={isUnderTablet}>
                            <HomeSiderBar />
                        </AdContainer>
                    )}
                </LeftSection>
                <ContentWrapper>
                    <Banner />
                    <SearchSectionWrapper>
                        <SearchSection />
                    </SearchSectionWrapper>
                    <PromptListSection searchResults={searchResults} />
                </ContentWrapper>
            </HomeContentWrapper>

            <IconWrap onClick={() => setIsVocModalOpen(true)}>
                <Icon name={"MessageText"} color={"white"} size={30} />
            </IconWrap>

            <VocModal
                isOpen={isVocModalOpen}
                onClose={() => setIsVocModalOpen(false)}
            />
        </HomeWrapper>
    );
}

const HomeWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox()}
    gap: 40px;
    padding-top: 92px;
    align-items: start;
    width: 100vw;
    background-color: white;
    position: relative;
`;

const HomeContentWrapper = styled.div<{ $isUnderTablet: boolean }>`
    ${({ theme, $isUnderTablet }) =>
        theme.mixins.flexBox(
            $isUnderTablet ? "column" : "row",
            "center",
            "start"
        )};
    gap: ${({ $isUnderTablet }) => ($isUnderTablet ? "20px" : "40px")};
    margin: 0 auto;
`;

const ContentWrapper = styled(Wrapper)`
    max-width: 1107px;
    width: 100vw;
    padding: 0 10px;
`;

const SearchSectionWrapper = styled.div`
    margin-bottom: 15px;
    width: 100%;
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const AdContainer = styled.div<{ $isUnderTablet: boolean }>`
    height: fit-content;
    display: ${({ $isUnderTablet }) => ($isUnderTablet ? "none" : "block")};
`;

const IconWrap = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: ${({ theme }) => theme.colors.G_900};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
