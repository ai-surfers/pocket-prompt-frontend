import Text from "@/components/common/Text/Text";
import styled from "styled-components";
import { Flex } from "antd";
import Input from "@/components/common/Input/Input";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import useDeviceSize from "@/hooks/useDeviceSize";
import PaginatedPromptSection from "@/pages/home/components/Prompt/PaginatedPromptSection";
import { usePutNickname } from "@/hooks/mutations/usePutNickname";
import useToast from "@/hooks/useToast";
import {
    getLocalStorage,
    LOCALSTORAGE_KEYS,
    removeLocalStorage,
} from "@/utils/storageUtils";
import { getUser } from "@/apis/auth/auth";
// import { isValidNickname } from "@/utils/textUtils";

const MyInfo = () => {
    const { userData, setUser, resetUserState } = useUser();
    const [nickname, setNickname] = useState("");
    const { isUnderTablet } = useDeviceSize();
    const showToast = useToast();

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

    return (
        <Container>
            <Wrapper $isUnderTablet={isUnderTablet}>
                <MyInfoWrapper>
                    <Text font="h1_24_bold" style={{ marginBottom: "20px" }}>
                        마이페이지
                    </Text>
                    <Flex
                        style={{
                            backgroundColor: "white",
                            borderRadius: "12px",
                            padding: "20px",
                            width: "1083px",
                        }}
                    >
                        <Flex vertical={true} style={{ width: "547px" }}>
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
                                >
                                    <Icon
                                        name="Edit2"
                                        color="white"
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
                        {/* 
                        TODO: 가입일, 함께한 날, 가입 순서 정보 구현
                        <Flex>
                            <Flex vertical={true}>
                                <Text
                                    font="b3_14_med"
                                    color="G_600"
                                    style={{ marginBottom: "2px" }}
                                >
                                    가입일
                                </Text>
                                <Chip>
                                    <Text font="b3_14_med" color="G_600"></Text>
                                </Chip>
                            </Flex>
                        </Flex> */}
                    </Flex>
                </MyInfoWrapper>
                <Flex style={{ padding: "41px 40px" }}>
                    <PaginatedPromptSection viewType="my" />
                </Flex>
            </Wrapper>
        </Container>
    );
};

export default MyInfo;

const Container = styled.div`
    width: 100%;
`;

const Wrapper = styled.div<{ $isUnderTablet: boolean }>`
    width: 100%;
    padding-top: ${({ $isUnderTablet }) => ($isUnderTablet ? 0 : "60px")};
    margin: 0 auto;
`;

const MyInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

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

// const Chip = styled.div`
//     display: flex;
//     height: 28px;
//     padding: 4px 12px 3px 12px;
//     justify-content: center;
//     align-items: center;
//     gap: 10px;
//     align-self: stretch;
//     border-radius: 6px;
//     background: var(--gray-100, #f1f2f6);
// `;
