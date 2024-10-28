import { styled } from "styled-components";
import { LogoNoLine } from "@/assets/svg";
import SearchBar from "../SearchBar/SearchBar";

const Banner = () => {
    return (
        <BannerWrapper>
            <BannerTitle>
                당신이 찾는 프롬프트,
                <br />
                <div>여기 다 있습니다.</div>
            </BannerTitle>
            <SearchBar />
            <Icon />
        </BannerWrapper>
    );
};

const BannerWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
    height: 328px;
    border-radius: 16px;
    background: ${({ theme }) => theme.mixins.gradientPrimary()}
    position: relative;
`;

const BannerTitle = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
    text-align: center;
    ${({ theme }) => theme.fonts.xlarge};
    line-height: 136%;
    ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.white};

    div {
        background-color: ${({ theme }) => theme.colors.primary_dark};
        width: 248px;
    }
`;

const Icon = styled(LogoNoLine)`
    position: absolute;
    left: 42px;
    height: 169px;
    flex-shrink: 0;
`;

export default Banner;
