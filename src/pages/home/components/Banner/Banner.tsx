import { styled } from "styled-components";
import { LogoNoLine } from "@/assets/svg";

const Banner = () => {
    return (
        <BannerWrapper>
            <BannerTitle>
                당신이 찾는 프롬프트,
                <br />
                <div>여기 다 있습니다.</div>
            </BannerTitle>
            <Icon />
        </BannerWrapper>
    );
};

const BannerWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
    height: 328px;
    border-radius: 16px;
    background: linear-gradient(
        180deg,
        ${({ theme }) => theme.colors.primary} 0%,
        ${({ theme }) => theme.colors.primary_light} 23.99%,
        ${({ theme }) => theme.colors.primary_xlight} 49.55%,
        ${({ theme }) => theme.colors.G_100} 76.47%,
        ${({ theme }) => theme.colors.white} 100%
    );
    margin-top: 40px;
`;

const BannerTitle = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
    text-align: center;
    ${({ theme }) => theme.fonts.header0};
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
