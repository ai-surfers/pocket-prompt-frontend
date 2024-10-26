import BookMark from "@/assets/svg/home/BookMark";
import Eye from "@/assets/svg/home/Eye";
import Play from "@/assets/svg/home/Play";
import theme from "@/styles/theme";
import * as S from "./styles";

interface PromptProps {
    colored?: boolean;
    title: string;
    description: string;
    views: number;
    star: number;
    usages: number;
}

const Prompt = ({
    colored = false,
    title,
    description,
    views,
    star,
    usages,
}: PromptProps) => {
    const pointColor = colored ? theme.colors.primary : theme.colors.G_400;

    return (
        <S.PromptWrapper colored={colored}>
            {colored && <S.NumberTag>1</S.NumberTag>}
            <S.TitlesWrapper>
                <S.Title colored={colored}>{title}</S.Title>
                <S.Subtitle>{description}</S.Subtitle>
            </S.TitlesWrapper>
            <S.DetailsWrapper>
                <S.Details>
                    <Eye stroke={pointColor} />
                    <S.Numbers color={pointColor}>{views}</S.Numbers>
                </S.Details>
                <S.Details>
                    <Play stroke={pointColor} />
                    <S.Numbers color={pointColor}>{usages}</S.Numbers>
                </S.Details>
                <S.Details>
                    <BookMark stroke={pointColor} />
                    <S.Numbers color={pointColor}>{star}</S.Numbers>
                </S.Details>
            </S.DetailsWrapper>
        </S.PromptWrapper>
    );
};

export default Prompt;
