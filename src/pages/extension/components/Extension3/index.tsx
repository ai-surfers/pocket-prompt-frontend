import { useMediaQuery } from "react-responsive";
import {
    DemoImage,
    Extension3Container,
    Extension3Wrap,
    MainTitle,
    SubTitle,
    TitleWrap,
} from "./styles";
import demoImage from "@/assets/images/extension/demo-image.png";

const Extension3 = () => {
    const isUnderSmallPC = useMediaQuery({
        maxWidth: "1279px",
    });

    return (
        <Extension3Container>
            {isUnderSmallPC ? (
                <Extension3Wrap>
                    <TitleWrap>
                        <SubTitle>고품질 프롬프트가 내 주머니 속에?</SubTitle>
                        <MainTitle>
                            AI와의 대화,
                            <br />
                            이제는 클릭 한 번으로!
                        </MainTitle>
                    </TitleWrap>
                    <DemoImage src={demoImage} alt="Demo Image" />
                </Extension3Wrap>
            ) : (
                <Extension3Wrap>
                    <DemoImage src={demoImage} alt="Demo Image" />
                    <TitleWrap>
                        <SubTitle>고품질 프롬프트가 내 주머니 속에?</SubTitle>
                        <MainTitle>
                            AI와의 대화,
                            <br />
                            이제는 클릭 한 번으로!
                        </MainTitle>
                    </TitleWrap>
                </Extension3Wrap>
            )}
        </Extension3Container>
    );
};

export default Extension3;
