import { qnaData } from "./qnaData";
import QnAToggle from "@/components/common/QnAToggle.tsx/QnAToggle";
import { Extension9Container, Title } from "./styles";
const Extension9 = () => {
    return (
        <Extension9Container>
            <Title>자주 묻는 질문</Title>
            {qnaData.map((data, index) => (
                <QnAToggle
                    id={`plan-card-${index}`}
                    key={index}
                    question={data.question}
                    answer={data.answer}
                />
            ))}
        </Extension9Container>
    );
};

export default Extension9;
