import { Flex } from "antd";
import styled from "styled-components";
import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import { ImgEmpty } from "@/assets/svg";
import { ImgEmptyColor } from "@/assets/svg";
import Text from "@/components/common/Text/Text";
import { ViewType } from "@/apis/prompt/prompt.model";
import { useNavigate } from "react-router-dom";

interface EmptyProps {
    viewType: ViewType;
}

const EmptyPrompt = ({ viewType }: EmptyProps) => {
    const navigate = useNavigate();

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
                    <Button onClick={() => navigate("/prompt-new")}>
                        <Icon name="Add" color="white" />
                        프롬프트 등록
                    </Button>
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
                    <Button
                        onClick={() =>
                            navigate("/", { state: { resetPromptList: true } })
                        }
                        hierarchy="secondary"
                        size={44}
                        style={{ marginTop: "12px" }}
                    >
                        프롬프트 둘러보러 가기
                    </Button>
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
