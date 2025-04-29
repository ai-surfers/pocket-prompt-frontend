"use client";

import { getUser } from "@/apis/auth/auth";
import { PromptDetails } from "@/apis/prompt/prompt.model";
import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import Input from "@/components/common/Input/Input";
import Text from "@/components/common/Text/Text";
import { useDeviceSize } from "@/components/DeviceContext";
import PromptCardImage from "@/components/home/prompt/card/PromptCardImage";
import PromptCardText from "@/components/home/prompt/card/PromptCardText";
import PromptList from "@/components/home/prompt/list/PromptList";
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
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

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

    // 유저 정보 조회 함수
    const getUserData = useCallback(async () => {
        const access_token = getLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
        if (!access_token) return;

        try {
            const res = await getUser();
            const { success, data } = res.data;
            if (!success) {
                alert("유저 조회에 실패하였습니다.");
                removeLocalStorage(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
                resetUserState();
                return;
            }
            setUser(data);
            console.log(">> getUserData success: ", data);
        } catch (error) {
            console.error(">> getUserData error: ", error);
        }
    }, [resetUserState, setUser]);

    useEffect(() => {
        if (!isInitialized) {
            setIsInitialized(true);
            getUserData();
        }

        return () => {
            setKeyword("");
            setSearchedKeyword("");
            setSearchedCategory("");
        };
    }, [isInitialized, getUserData]);

    // 닉네임 변경
    const { mutate: updateNickname } = usePutNickname({
        onSuccess: (res) => {
            showToast({
                title: "닉네임이 변경되었어요.",
                subTitle: "",
                iconName: "TickCircle",
            });
            console.log(">> 닉네임 변경 성공", res);
            getUserData();
            setNickname("");
        },
        onError: (e) => {
            showToast({
                title: e.message,
                subTitle: "",
                iconName: "TickCircle",
            });
            console.error(">> 닉네임 변경 실패", e);
        },
    });

    const handleChangeNickname = (nickname: string) => {
        updateNickname(nickname);
    };

    const renderPromptItem = (item: PromptDetails, index: number) => {
        if (item.type === "image") {
            return (
                <PromptCardImage
                    promptType="image"
                    id={item.id}
                    title={item.title}
                    sampleMedia={item.sample_media ?? []}
                    views={item.views}
                    star={item.star}
                    usages={item.usages}
                    isMiniHeight={false}
                />
            );
        }

        return (
            <PromptCardText
                promptType="text"
                id={item.id}
                title={item.title}
                description={item.description ?? ""}
                views={item.views}
                star={item.star}
                usages={item.usages}
                isMiniHeight={false}
            />
        );
    };

    if (!isInitialized) return null;

    return (
        <Container $isUnderTablet={isUnderTablet}>
            <LnbWrapper>
                <MyLnb initialMenu="1" />
            </LnbWrapper>
            <ContentWrapper $isUnderTablet={isUnderTablet}>
                <MyInfoWrapper>
                    <Text font="h1_24_bold" style={{ marginBottom: "20px" }}>
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
                            vertical
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
                            maxWidth: "1083px",
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
                            renderItem={renderPromptItem}
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
