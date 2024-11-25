import Text from "@/components/common/Text/Text";
import { pocketRunState } from "@/states/pocketRunState";
import { Flex } from "antd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

export const ResultSection: React.FC = () => {
    const pocketRunRes = useRecoilValue(pocketRunState);

    return (
        <Flex vertical gap={16} style={{ height: "100%" }}>
            <Text font="h2_20_semi">포켓런 결과</Text>
            {pocketRunRes[0].response.length === 0 ? (
                <EmptyBox vertical gap={4} justify="center" align="center">
                    <Text font="b2_16_semi">아직 포켓런 결과가 없어요!</Text>
                    <Text font="b3_14_reg" color="G_400">
                        프롬프트 사용하기를 채우고 포켓런을 활용하여 쉽고 빠르게
                        결과를 받아보세요!
                    </Text>
                </EmptyBox>
            ) : (
                pocketRunRes.map((res, index) => (
                    <>
                        <Text font="b1_18_semi" color="G_800">
                            {index + 1}차 결과
                        </Text>
                        <ChipWrapper>
                            <ModelChip key={index}>
                                <Text font="b3_14_reg" color="G_500">
                                    {res.model}
                                </Text>
                            </ModelChip>
                            {Object.entries(res.context).map(([key, value]) => (
                                <Chip key={key}>
                                    <Text font="b3_14_reg" color="G_500">
                                        <span>{key}: </span>
                                        {value}
                                    </Text>
                                </Chip>
                            ))}
                        </ChipWrapper>
                        <Box>
                            <Text font="b2_16_med" color={"G_700"} key={index}>
                                {res.response}
                            </Text>
                        </Box>
                    </>
                ))
            )}
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

const Box = styled(Flex)`
    border-radius: 8px;
    border: 1.5px solid var(--primary-20, #e3e6fb);

    width: 100%;
    height: 100%;
    padding: 16px;
    flex-direction: column;
    gap: 8px;
`;

const ChipWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

const ModelChip = styled.div`
    height: 36px;
    width: fit-content;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: var(--gray-100, #f1f2f6);
`;

const Chip = styled.div`
    height: 36px;
    width: fit-content;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid var(--gray-200, #dee0e8);
    span {
        font-weight: 700;
    }
`;
