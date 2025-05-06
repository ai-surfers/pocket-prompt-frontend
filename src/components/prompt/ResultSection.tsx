import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import Text from "@/components/common/Text/Text";
import { PocketRunImageModel, PocketRunModel } from "@/core/Prompt";
import useToast from "@/hooks/useToast";
import {
    imgPocketRunLoadingState,
    imgPocketRunState,
    pocketRunLoadingState,
    pocketRunState,
} from "@/states/pocketRunState";
import { copyClipboard } from "@/utils/promptUtils";
import { LoadingOutlined } from "@ant-design/icons";
import { Dropdown, Flex, MenuProps, Spin } from "antd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

interface ResultSectionProps {
    promptType: "text" | "image";
}

export const ResultSection: React.FC<ResultSectionProps> = ({ promptType }) => {
    // 텍스트/이미지에 따라 Recoil 상태와 로딩 상태 분기
    const resultList = useRecoilValue(
        promptType === "image" ? imgPocketRunState : pocketRunState
    );
    const isLoading = useRecoilValue(
        promptType === "image"
            ? imgPocketRunLoadingState
            : pocketRunLoadingState
    );

    const showToast = useToast();

    const handleClickCopy = (result: string) => {
        copyClipboard(result)
            .then(() => {
                showToast({
                    title: "포켓런 결과 복사가 완료되었어요.",
                    subTitle: "",
                    iconName: "CopySuccess",
                });
            })
            .catch((err) => {
                console.error("클립보드 복사 실패:", err);
            });
    };

    const items = (value: string): MenuProps["items"] =>
        value
            ? [
                  {
                      label: (
                          <Text
                              font="b3_14_reg"
                              color="G_500"
                              style={{ width: "100%" }}
                          >
                              {value}
                          </Text>
                      ),
                      key: "0",
                      style: { pointerEvents: "none", width: "100%" },
                  },
              ]
            : [
                  {
                      label: "Invalid Value",
                      key: "0",
                  },
              ];

    return (
        <Flex vertical gap={16} style={{ height: "100%" }}>
            <Text font="h2_20_semi">포켓런 결과</Text>

            {!isLoading && resultList[0].response.length === 0 ? (
                <EmptyBox>
                    <Text font="b2_16_semi">아직 포켓런 결과가 없어요!</Text>
                    <Text font="b3_14_reg" color="G_400">
                        프롬프트 사용하기를 채우고 포켓런을 활용하여 쉽고 빠르게
                        결과를 받아보세요!
                    </Text>
                </EmptyBox>
            ) : (
                resultList.map((res, index) => {
                    // 모델 레이블도 분기
                    const modelRecord =
                        promptType === "image"
                            ? PocketRunImageModel
                            : PocketRunModel;
                    const label = Object.values(modelRecord).find(
                        (m) => m.value === res.model
                    )?.label;

                    return (
                        <div key={`pocketRun${index}`}>
                            <Text font="b1_18_semi" color="G_800">
                                {index + 1}차 결과
                            </Text>

                            <ChipWrapper>
                                <ModelChip key={index}>
                                    <Text
                                        font="b3_14_reg"
                                        color="G_500"
                                        style={{ whiteSpace: "nowrap" }}
                                    >
                                        {label}
                                    </Text>
                                </ModelChip>

                                <DropdownWrapper>
                                    {Object.entries(res.context).map(
                                        ([key, value]) => (
                                            <Dropdown
                                                key={key}
                                                menu={{
                                                    items: items(value) || [],
                                                }}
                                                trigger={["click"]}
                                                overlayStyle={{
                                                    width: "150px",
                                                    height: "auto",
                                                    whiteSpace: "break-spaces",
                                                    overflow: "visible",
                                                }}
                                            >
                                                <DropdownButton
                                                    id={`dropdown-button-${key}-${index}`}
                                                >
                                                    <Text
                                                        font="b3_14_semi"
                                                        color="G_600"
                                                        style={{
                                                            whiteSpace:
                                                                "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow:
                                                                "ellipsis",
                                                        }}
                                                    >
                                                        {key}
                                                    </Text>
                                                    <Icon
                                                        name="ArrowDown2"
                                                        size={16}
                                                        color="G_300"
                                                    />
                                                </DropdownButton>
                                            </Dropdown>
                                        )
                                    )}
                                </DropdownWrapper>
                            </ChipWrapper>

                            {index === resultList.length - 1 && isLoading ? (
                                <LoadingBox>
                                    <Spin
                                        indicator={
                                            <LoadingOutlined
                                                style={{
                                                    fontSize: 36,
                                                    marginBottom: 16,
                                                }}
                                                spin
                                            />
                                        }
                                    />
                                    <Text font="b1_18_semi">
                                        포켓런 결과를 불러오고 있어요
                                    </Text>
                                    <Text font="b3_14_reg">
                                        최상의 결과를 불러올게요! 잠시만
                                        기다려주세요
                                    </Text>
                                </LoadingBox>
                            ) : promptType === "image" ? (
                                <ImageBox>
                                    <img
                                        src={res.response}
                                        alt={`result-${index}`}
                                        style={{
                                            maxWidth: "100%",
                                            borderRadius: 8,
                                        }}
                                    />
                                </ImageBox>
                            ) : (
                                <Box>
                                    <Text
                                        font="b2_16_med"
                                        color={"G_700"}
                                        key={index}
                                        markdown={true}
                                    >
                                        {res.response}
                                    </Text>
                                </Box>
                            )}

                            {!isLoading && (
                                <Button
                                    id={`copy-result-button-${index}`}
                                    onClick={() =>
                                        handleClickCopy(res.response)
                                    }
                                    width="143px"
                                    size={44}
                                    suffix={
                                        <Icon
                                            name="Copy"
                                            size={20}
                                            color="primary_100"
                                        />
                                    }
                                    style={{
                                        padding: "8px 12px 8px 16px",
                                        margin: "auto 0 auto auto",
                                    }}
                                    hierarchy="normal"
                                >
                                    결과 복사하기
                                </Button>
                            )}
                        </div>
                    );
                })
            )}
        </Flex>
    );
};

const EmptyBox = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
    border-radius: 8px;
    background: var(--gray-50, #f7f8f9);
    width: 100%;
    height: 100%;
    min-height: 296px;
    padding: 60px 40px;
    gap: 4px;
`;

const Box = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
    border-radius: 8px;
    border: 1.5px solid var(--primary-20, #e3e6fb);
    width: 100%;
    padding: 16px;
    flex-direction: column;
    gap: 8px;
    margin: 8px 0 12px 0;
    flex-direction: column;
`;

const ImageBox = styled.div`
    width: 100%;
    padding: 16px;
    background: ${({ theme }) => theme.colors.G_50};
    border-radius: 8px;
    display: flex;
    justify-content: center;
`;

const LoadingBox = styled.div`
    display: flex;
    border-radius: 8px;
    background: var(--gray-50, #f7f8f9);
    width: 100%;
    height: 323px;
    margin: 8px 0 12px 0;
    justify-content: center;
    align-items: center;
`;

const ChipWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin-top: 4px;
`;

const ModelChip = styled.div`
    height: 36px;
    width: 85px;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: var(--gray-100, #f1f2f6);
`;

const DropdownWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    overflow: hidden;
`;

const DropdownButton = styled.button`
    display: flex;
    height: 36px;
    padding: 8px 12px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid var(--gray-100, #f1f2f6);
    background: var(--white, #fff);
    overflow: hidden;
    text-overflow: ellipsis;
`;
