import styled from "styled-components";

export const Extension1Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    background: linear-gradient(
        171deg,
        #7580ea 16.9%,
        #9ba3f0 38.51%,
        #ced2f8 58.62%,
        #f4f5fd 73.06%,
        #fff 85.95%
    );
    width: 100%;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        width: 1471px;
        height: 310px;
        left: 50%;
        bottom: -155px;
        transform: translateX(-50%);
        border-radius: 1471px;
        background: rgba(255, 255, 255, 0.8);
        filter: blur(84.11499786376953px);
        z-index: 1;
    }
`;

export const Extension1Wrap = styled.div`
    max-width: 1440px;
    width: 100%;
    padding: 84px 120px 114px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;

    @media screen and (max-width: 1350px) {
        padding: 84px 40px 114px;
    }

    @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const ContentWrap = styled.div``;

export const DemoVideo = styled.img`
    width: 700px;
    height: 394px;
    border-radius: 20px;
    border: 8px solid #ffffff;
    object-fit: cover;
    position: relative;
    overflow: hidden;
    z-index: 2;

    @media screen and (max-width: 1350px) {
        width: 584px;
        height: 329px;
    }

    @media screen and (max-width: 1024px) {
        width: 416px;
        height: 234px;
    }

    @media screen and (max-width: 768px) {
        width: 348px;
        height: 196px;
    }
`;

export const VideoWrap = styled.div`
    position: relative;

    @media screen and (max-width: 1024px) {
        margin-bottom: 41px;
    }
`;

export const VideoBandImage = styled.img`
    position: absolute;
    top: -40px;
    left: 10px;
    z-index: 1;
`;

export const VideoBandHalfImage = styled.img`
    position: absolute;
    top: -27px;
    left: 34px;
    z-index: 3;
`;

export const VideoStarImage = styled.img`
    position: absolute;
    bottom: -95px;
    left: 12px;
`;

export const SubTitle = styled.h2`
    color: #ffffff;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 143%;
    letter-spacing: -0.56px;
    margin-bottom: 16px;

    @media screen and (max-width: 1350px) {
        font-size: 20px;
        margin-bottom: 8px;
    }

    @media screen and (max-width: 1024px) {
        text-align: center;
    }
`;

export const MainTitle = styled.h1`
    color: #ffffff;
    font-family: Pretendard;
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
    line-height: 123%; /* 63.96px */
    margin-bottom: 58px;

    @media screen and (max-width: 1350px) {
        font-size: 36px;
        margin-bottom: 54px;
    }

    @media screen and (max-width: 1024px) {
        text-align: center;
        margin-bottom: 21px;
    }
`;

export const BelowDownloadButtonText = styled.p<{
    fontWeight?: "normal" | "bold";
}>`
    color: #3e4151;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: ${({ fontWeight }) => (fontWeight === "bold" ? 600 : 400)};
    line-height: 144%; /* 23.04px */
    letter-spacing: 0px;
    margin-left: 12px;

    @media screen and (max-width: 1024px) {
        text-align: center;
    }
`;
