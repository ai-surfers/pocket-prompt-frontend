import { useState } from "react";
import {
    ToggleContainer,
    ToggleContent,
    ToggleContentText,
    ToggleHeader,
    ToggleHeaderTitle,
} from "./styles";
import ArrowDown from "@/assets/svg/extension/arrow-down.svg";
import ArrowUp from "@/assets/svg/extension/arrow-up.svg";
interface Props {
    question: string;
    answer: React.ReactNode;
}
const QnAToggle = ({ question, answer }: Props) => {
    const [opened, setOpend] = useState(true);

    return (
        <ToggleContainer>
            <ToggleHeader>
                <ToggleHeaderTitle>
                    <span>Q.</span>
                    {question}
                </ToggleHeaderTitle>
                <img
                    src={opened ? ArrowUp : ArrowDown}
                    onClick={() => setOpend(!opened)}
                />
            </ToggleHeader>
            <ToggleContent opened={opened}>
                <span>A.</span>
                <ToggleContentText>{answer}</ToggleContentText>
            </ToggleContent>
        </ToggleContainer>
    );
};

export default QnAToggle;
