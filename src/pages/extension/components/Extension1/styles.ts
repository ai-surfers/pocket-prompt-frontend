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
    height: 591px;
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
    padding: 84px 120px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
`;

export const ContentWrap = styled.div``;

export const DemoVideo = styled.img`
    width: 700px;
    height: 394px;
    border-radius: 20px;
    border: 8px solid #ffffff;
    object-fit: cover;
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
`;

export const MainTitle = styled.h1`
    color: #ffffff;
    font-family: Pretendard;
    font-size: 52px;
    font-style: normal;
    font-weight: 700;
    line-height: 123%; /* 63.96px */
    margin-bottom: 58px;
`;

export const DownloadButton = styled.a`
    display: flex;
    width: 380px;
    height: 60px;
    border-radius: 12px;
    background: #7580ea;
    padding: 8px 12px 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    margin-bottom: 12px;
`;

export const DownloadButtonText = styled.p`
    color: #ffffff;
    text-align: center;
    flex: 1 0 0;

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 144%; /* 28.8px */
    letter-spacing: 0px;
`;

export const IconWrap = styled.div`
    display: flex;
    flex-shrink: 0;
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
`;
