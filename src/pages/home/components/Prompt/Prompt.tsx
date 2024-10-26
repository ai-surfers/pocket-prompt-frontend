import BookMark from "@/assets/svg/home/BookMark";
import Eye from "@/assets/svg/home/Eye";
import Play from "@/assets/svg/home/Play";
import theme from "@/styles/theme";
import * as S from "./styles";

interface PromptProps {
    colored: boolean;
}

const Prompt = ({ colored }: PromptProps) => {
    const pointColor = colored ? theme.colors.primary : theme.colors.G_400;

    return (
        <S.PromptWrapper colored={colored}>
            {colored && <S.NumberTag>1</S.NumberTag>}
            <S.TitlesWrapper>
                <S.Title colored={colored}>
                    파워포인트 작성 치트키 파워포인트 작성 치트키 파워포인트
                    작성 치트키
                </S.Title>
                <S.Subtitle>
                    주제와 청중을 입력하면 근사한 파워포인트 초안을 만들어주는
                    프롬프트 부제목도 길어지면 이렇게 말줄임표 들어가게 ...
                </S.Subtitle>
            </S.TitlesWrapper>
            <S.DetailsWrapper>
                <S.Details>
                    <Eye stroke={pointColor} />
                    <S.Numbers color={pointColor}>1254</S.Numbers>
                </S.Details>
                <S.Details>
                    <Play stroke={pointColor} />
                    <S.Numbers color={pointColor}>258</S.Numbers>
                </S.Details>
                <S.Details>
                    <BookMark stroke={pointColor} />
                    <S.Numbers color={pointColor}>258</S.Numbers>
                </S.Details>
            </S.DetailsWrapper>
        </S.PromptWrapper>
    );
};

export default Prompt;
