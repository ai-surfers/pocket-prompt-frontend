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
    const [opened, setOpend] = useState(false);

    return (
        <ToggleContainer>
            <ToggleHeader onClick={() => setOpend(!opened)}>
                <ToggleHeaderTitle opened={opened}>
                    <span>Q.</span>
                    <p>{question}</p>
                </ToggleHeaderTitle>
                <img src={opened ? ArrowUp : ArrowDown} />
            </ToggleHeader>
            <ToggleContent opened={opened}>
                <span>A.</span>
                <ToggleContentText>{answer}</ToggleContentText>
            </ToggleContent>
        </ToggleContainer>
    );
};

export default QnAToggle;
