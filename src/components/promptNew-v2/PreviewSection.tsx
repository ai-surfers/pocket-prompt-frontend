"use client";

import Text from "@/components/common/Text/Text";
import { PromptSchemaType } from "@/schema/PromptSchema";
import { extractOptions } from "@/utils/promptUtils";
import { useDeviceSize } from "@components/DeviceContext";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import ExampleContent from "./Example/ExampleContent";

function PreviewSection() {
    const { watch } = useFormContext<PromptSchemaType>();
    const { isUnderTablet, isMobile } = useDeviceSize();
    const title = watch("title");
    const description = watch("description");
    const prompt_template = watch("prompt_template");
    const inputs = useMemo(() => {
        return extractOptions(prompt_template);
    }, [prompt_template]);

    return (
        <Box $isUnderTablet={isUnderTablet}>
            <Text font="h2_20_bold">내 프롬프트 미리보기</Text>

            <ExampleContent
                defaultValue="프롬프트 내용에 따른 미리보기가 이곳에 표시됩니다."
                value={inputs}
            />
        </Box>
    );
}

export default PreviewSection;

const Box = styled.div<{ $isUnderTablet: boolean }>`
    /* max-width: 100%; */
    border-radius: 16px;
    border: 1.5px solid ${({ theme }) => theme.colors.G_100};
    background: #fff;
    padding: 20px;
    width: ${({ $isUnderTablet }) => ($isUnderTablet ? "97%" : "30%")};
`;
