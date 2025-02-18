import { Flex } from "antd";
import styled from "styled-components";
import Button from "@components/common/Button/Button";
import Icon from "@components/common/Icon";
import ImgEmpty from "@svg/ImgEmpty";
import ImgEmptyColor from "@svg/ImgEmptyColor";
import Text from "@components/common/Text/Text";
import { ViewType } from "@apis/prompt/prompt.model";
import Link from "next/link";

interface EmptyProps {
    viewType: ViewType;
}

const EmptyPrompt = ({ viewType }: EmptyProps) => {
    if (viewType === "open")
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
    else if (viewType === "my")
        return (
            <EmptyWrapper vertical justify="center" align="center" gap={16}>
                <Flex vertical align="center" gap={2}>
                    <Text font="b2_16_semi" color="G_700">
                        현재 등록한 프롬프트가 없어요
                    </Text>
                    <Text
                        font="b3_14_reg"
                        color="G_400"
                        style={{ marginBottom: "16px" }}
                    >
                        프롬프트를 등록하면 이곳에 나타나요 <br />
                        나만의 프롬프트를 등록하러 가볼까요?
                    </Text>
                    <Link href="/prompt-new">
                        <Link href="/prompt-new">
                            <Button id="register-prompt">
                                <Icon name="Add" color="white" />
                                프롬프트 등록
                            </Button>
                        </Link>
                    </Link>
                </Flex>
            </EmptyWrapper>
        );
    else
        return (
            <EmptyWrapper vertical justify="center" align="center" gap={16}>
                <ImgEmptyColor width={148} />

                <Flex vertical justify="center" align="center" gap={2}>
                    <Text font="b2_16_semi" color="G_700">
                        즐겨찾는 프롬프트를 추가해
                    </Text>
                    <Text font="b2_16_semi" color="G_700">
                        시간을 절약하세요!
                    </Text>
                    <Link href="/">
                        <Button
                            id="empty-prompt-explore-button"
                            hierarchy="secondary"
                            size={44}
                            style={{ marginTop: "12px" }}
                        >
                            프롬프트 둘러보러 가기
                        </Button>
                    </Link>
                </Flex>
            </EmptyWrapper>
        );
};

export default EmptyPrompt;

const EmptyWrapper = styled(Flex)`
    width: 100%;
    padding: 80px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.G_50};
`;
