import Text from "@/components/common/Text/Text";
import { Flex } from "antd";
import styled from "styled-components";

export const ResultSection: React.FC = () => {
    return (
        <Flex vertical gap={16} style={{ height: "100%" }}>
            <Text font="b1_18_semi">포켓런 결과</Text>
            <EmptyBox vertical gap={4} justify="center" align="center">
                <Text font="b2_16_semi">아직 포켓런 결과가 없어요!</Text>
                <Text font="b3_14_reg" color="G_400">
                    프롬프트 사용하기를 채우고 포켓런을 활용하여 쉽고 빠르게
                    결과를 받아보세요!
                </Text>
            </EmptyBox>
        </Flex>
    );
};

const EmptyBox = styled(Flex)`
    border-radius: 8px;
    background: var(--gray-50, #f7f8f9);

    width: 100%;
    height: 100%;
    padding: 60px 40px;
`;
