import BookMark from "@/assets/svg/home/BookMark";
import Eye from "@/assets/svg/home/Eye";
import Play from "@/assets/svg/home/Play";
import theme from "@/styles/theme";
import * as S from "./styles";
import useToast from "@/hooks/useToast";

interface PromptProps {
    colored?: boolean;
    title: string;
    description: string;
    views: number;
    star: number;
    usages: number;
    index: number;
}

const Prompt = ({
    colored = false,
    title,
    description,
    views,
    star,
    usages,
    index,
}: PromptProps) => {
    const pointColor = colored ? theme.colors.primary : theme.colors.G_400;
    const showToast = useToast();

    const handleClick = () => {
        showToast(
            "프롬프트 상세 조회는 아직 준비 중인 기능이에요.",
            "여러분의 손쉬운 AI활용을 위해 빠르게 준비하고 있을게요!"
        );
    };

    return (
        <S.PromptWrapper colored={colored} onClick={handleClick}>
            {colored && <S.NumberTag>{index}</S.NumberTag>}
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
