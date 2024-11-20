import { Flex } from "antd";
import Text from "@/components/common/Text/Text";
import { HTMLAttributes, PropsWithChildren } from "react";

interface FormItem extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    tags?: string[];
}

export default function FormItem({
    title,
    description,
    tags,
    children,
    ...props
}: FormItem) {
    return (
        <div style={{ width: "100%" }} {...props}>
            <Flex gap={12}>
                <Text font="b1_18_semi">{title}</Text>
                {tags && (
                    <Flex gap={8} align="center">
                        {tags.map((tag) => (
                            <Text
                                font="c1_12_semi"
                                color="primary_100"
                                key={tag}
                            >
                                {tag}
                            </Text>
                        ))}
                    </Flex>
                )}
            </Flex>

            {description && (
                <Text font="b3_14_reg" color="G_400">
                    {description}
                </Text>
            )}

            {children}
        </div>
    );
}
