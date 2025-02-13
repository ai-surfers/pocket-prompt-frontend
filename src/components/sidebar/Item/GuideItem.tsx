import Text from "@/components/common/Text/Text";
import Icon from "@/components/common/Icon";
import { Flex } from "antd";
import styled from "styled-components";

const GuideItem = () => {
    const handleOnGuide = () => {
        window.open(
            "https://pocket-prompt.notion.site/da477857a0cc44888b06dd23cf6682ff",
            "_blank"
        );
    };
    return (
        <Item id="guide-item" onClick={handleOnGuide}>
            <Flex justify="space-between">
                <Flex gap={8}>
                    <Icon name="Book" />
                    <Text font="b2_16_reg" color="primary">
                        Guide
                    </Text>
                </Flex>
                <Icon name="ExportSquare" />
            </Flex>
        </Item>
    );
};

const Item = styled.div`
    width: 100%;
    padding: 14px 20px;
    position: relative;
    cursor: pointer;
`;

export default GuideItem;
