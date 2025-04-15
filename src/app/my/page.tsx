"use client";

import { getUser } from "@/apis/auth/auth";
import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import Input from "@/components/common/Input/Input";
import Text from "@/components/common/Text/Text";
import { useDeviceSize } from "@/components/DeviceContext";
import PromptList from "@/components/home/prompt/PromptList";
import MyLnb from "@/components/lnb/MyLnb";
import { usePutNickname } from "@/hooks/mutations/usePutNickname";
import useToast from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import {
    keywordState,
    searchedCategoryState,
    searchedKeywordState,
} from "@/states/searchState";
import {
    getLocalStorage,
    LOCALSTORAGE_KEYS,
    removeLocalStorage,
} from "@/utils/storageUtils";
import { Flex } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
// import { isValidNickname } from "@/utils/textUtils";

const MyPage = () => {
    const { userData, setUser, resetUserState } = useUser();
    const [nickname, setNickname] = useState("");
    const { isUnderTablet, isMobile } = useDeviceSize();
    const showToast = useToast();
    const [isInitialized, setIsInitialized] = useState(false);

    const [keyword, setKeyword] = useRecoilState(keywordState);
    const [searchedKeyword, setSearchedKeyword] =
        useRecoilState(searchedKeywordState);
    const [searchedCategory, setSearchedCategory] = useRecoilState(
        searchedCategoryState
    );

    useEffect(() => {
        setIsInitialized(true);
        return () => {
            setKeyword("");
            setSearchedKeyword("");
            setSearchedCategory("");
        };
    }, []);

    const getUserData = () => {
        const access_token = getLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
        console.log(">> ", userData.accessToken);

        if (access_token) {
            getUser().then((res) => {
                const { success, data } = res.data;
                if (!success) {
                    alert("유저 조회에 실패하였습니다.");

                    removeLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
                    resetUserState();
                    return;
                }

                // 성공, 저장
                setUser(data);
                console.log(userData);
            });
        }
    };

    const { mutate: updateNickname } = usePutNickname({
        onSuccess(res) {
            showToast({
                title: "닉네임이 변경되었어요.",
                subTitle: "",
                iconName: "TickCircle",
            });
            console.log(">> 닉네임 변경 성공", res);
            getUserData();
            setNickname("");
        },
        onError(e) {
            showToast({
                title: e.message,
                subTitle: "",
                iconName: "TickCircle",
            });
            console.error(">> 닉네임 변경 실패", e);
        },
    });

    const handleChangeNickname = (nickname: string) => {
        // TODO: 화면에서 닉네임 검사 결과 바로 렌더링하는 기획 나오면 추가
        // const { res, detail } = isValidNickname(nickname);
        // if (res) {
        //     updateNickname(nickname);
        // } else {
        //     showToast(detail, "");
        // }
        updateNickname(nickname);
    };

    if (!isInitialized) return null; // hydration 에러 방지

    return (
        <Container $isUnderTablet={isUnderTablet}>
            <LnbWrapper>
                <MyLnb initialMenu="1" />
            </LnbWrapper>
            <ContentWrapper $isUnderTablet={isUnderTablet}>
                <MyInfoWrapper>
                    <Text
                        font="h1_24_bold"
                        style={{
                            marginBottom: "20px",
                            justifyContent: "start",
                        }}
                    >
                        마이페이지
                    </Text>
                    <Flex
                        style={{
                            backgroundColor: "white",
                            borderRadius: "12px",
                            padding: "20px",
                            width: "100%",
                        }}
                        gap={44}
                        wrap
                    >
                        <Flex
                            vertical={true}
                            style={{
                                width: isMobile ? "fit-content" : "547px",
                            }}
                        >
                            <Text font="b1_18_bold">닉네임</Text>
                            <Flex gap={8} style={{ width: "100%" }}>
                                <Input
                                    placeholder={userData.user?.nickname ?? ""}
                                    value={nickname}
                                    onChange={setNickname}
                                    count={nickname ? 12 : undefined}
                                />
                                <Button
                                    size={41}
                                    width="41px"
                                    style={{
                                        padding: "8px 11px",
                                        marginTop: "8px",
                                    }}
                                    onClick={() =>
                                        handleChangeNickname(nickname)
                                    }
                                    hierarchy={
                                        nickname.length > 0
                                            ? "primary"
                                            : "disabled"
                                    }
                                >
                                    <Icon
                                        name="Edit2"
                                        color={
                                            nickname.length > 0
                                                ? "white"
                                                : "G_300"
                                        }
                                        size={20}
                                    />
                                </Button>
                            </Flex>
                            <Text
                                font="b1_18_bold"
                                style={{ marginTop: "24px" }}
                            >
                                계정
                            </Text>
                            <Email>
                                <Text font="b1_14_reg" color="G_300">
                                    {userData.user?.email}
                                </Text>
                            </Email>
                        </Flex>

                        {/* TODO: 가입일, 함께한 날, 가입 순서 정보 구현 */}
                        <Flex align="flex-end" gap={24}>
                            <Flex vertical>
                                <Text
                                    font="b3_14_med"
                                    color="G_600"
                                    style={{ marginBottom: "2px" }}
                                >
                                    함께한 날
                                </Text>
                                <Chip>
                                    <Text font="b3_14_med" color="G_600">
                                        D+{userData.user?.days_since_join}
                                    </Text>
                                </Chip>
                            </Flex>
                            <Flex vertical>
                                <Text
                                    font="b3_14_med"
                                    color="G_600"
                                    style={{ marginBottom: "2px" }}
                                >
                                    실행한 프롬프트
                                </Text>
                                <Chip>
                                    <Text font="b3_14_med" color="G_600">
                                        {`총 ${userData.user?.total_prompt_executions}개`}
                                    </Text>
                                </Chip>
                            </Flex>
                        </Flex>
                    </Flex>
                </MyInfoWrapper>
                <MyPromptWrapper>
                    <Flex
                        style={{
                            padding: "41px 40px",
                            width: "100%",
                            maxWidth: "1083px;",
                            flexWrap: "wrap",
                            justifyContent: "flex-start",
                        }}
                    >
                        <PromptList
                            viewType="my"
                            searchType="total"
                            title={
                                <Text font="h2_20_semi" color="G_800">
                                    내가 만든 프롬프트
                                </Text>
                            }
                        />
                    </Flex>
                </MyPromptWrapper>
            </ContentWrapper>
        </Container>
    );
};

export default MyPage;

const Container = styled.div<{ $isUnderTablet: boolean }>`
    width: 100%;
    padding-top: 52px;
    padding-left: ${({ $isUnderTablet }) => ($isUnderTablet ? "0px" : "36px")};
    ${({ theme, $isUnderTablet }) =>
        theme.mixins.flexBox(
            $isUnderTablet ? "column" : "row",
            "center",
            "start"
        )};
    gap: ${({ $isUnderTablet }) => ($isUnderTablet ? "20px" : "36px")};
    margin: 0 auto;
`;

const LnbWrapper = styled.div`
    padding-top: 20px;
`;

const ContentWrapper = styled.div<{ $isUnderTablet: boolean }>`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
    width: 100%;
    // padding-top: ${({ $isUnderTablet }) => ($isUnderTablet ? 0 : "60px")};
    margin: 0 auto;
`;

const MyInfoWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "start")};
    background-color: #f0f2f5;
    padding: 41px 40px;
    width: 100%;
`;

const Email = styled.div`
    display: flex;
    height: 41px;
    padding: 11px 12px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    background: var(--gray-100, #f1f2f6);
    border-radius: 8px;
    margin-top: 8px;
`;

const Chip = styled.div`
    display: flex;
    height: 28px;
    padding: 4px 12px 3px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 6px;
    background: var(--gray-100, #f1f2f6);
    width: fit-content;
`;
const MyPromptWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
`;
