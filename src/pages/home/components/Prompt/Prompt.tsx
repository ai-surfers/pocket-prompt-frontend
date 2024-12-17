import BookMark from "@/assets/svg/home/BookMark";
import Eye from "@/assets/svg/home/Eye";
import Play from "@/assets/svg/home/Play";
import theme from "@/styles/theme";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { pocketRunState } from "@/states/pocketRunState";

interface PromptProps {
    colored?: boolean;
    title: string;
    description: string;
    views: number;
    star: number;
    usages: number;
    index: number;
    id: string;
}

const Prompt = ({
    colored = false,
    title,
    description,
    views,
    star,
    usages,
    index,
    id,
}: PromptProps) => {
    const pointColor = colored ? theme.colors.primary : theme.colors.G_400;
    const resetPocketRunState = useResetRecoilState(pocketRunState);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/prompt/${id}`);
        resetPocketRunState();
    };

    return (
        <S.PromptWrapper $colored={colored} onClick={handleClick}>
            {colored && <S.NumberTag>{index}</S.NumberTag>}
            <S.TitlesWrapper>
                <S.Title $colored={colored}>{title}</S.Title>
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
