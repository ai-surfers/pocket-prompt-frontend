import CheckBox from "@/assets/svg/extension/CheckBox";
import {
    Extension2Container,
    Extension2Wrap,
    CardWrap,
    FeatureWrap,
    FeatureText,
    CardTitle,
    FeatureContainer,
} from "./styles";

const Extension2 = () => {
    return (
        <Extension2Container>
            <Extension2Wrap>
                <CardWrap>
                    <CardTitle>
                        프롬프트 작성,
                        <br />더 이상 고민하지 마세요!
                    </CardTitle>
                    <FeatureContainer>
                        <FeatureWrap>
                            <CheckBox />
                            <FeatureText>
                                아무것도 모르는 초보자도 쉽게 AI를 레버리지
                            </FeatureText>
                        </FeatureWrap>
                        <FeatureWrap>
                            <CheckBox />
                            <FeatureText>
                                대한민국 최고 퀄리티 프롬프트가 모인 곳
                            </FeatureText>
                        </FeatureWrap>
                    </FeatureContainer>
                </CardWrap>
                <CardWrap>
                    <CardTitle>
                        언제 어디서나,
                        <br />
                        포켓 프롬프트와 함께!
                    </CardTitle>
                    <FeatureContainer>
                        <FeatureWrap>
                            <CheckBox />
                            <FeatureText>챗GPT, 클로드, 제미나이</FeatureText>
                        </FeatureWrap>
                        <FeatureWrap>
                            <CheckBox />
                            <FeatureText>
                                어디서나 사용가능한 플러그인
                            </FeatureText>
                        </FeatureWrap>
                    </FeatureContainer>
                </CardWrap>
                <CardWrap>
                    <CardTitle>
                        1분 1초가
                        <br />
                        소중하잖아요!
                    </CardTitle>
                    <FeatureContainer>
                        <FeatureWrap>
                            <CheckBox />
                            <FeatureText>
                                클릭 한 번으로 나만의 프롬프트를
                                <br />
                                쉽고 빠르게, 꺼내 쓰세요
                            </FeatureText>
                        </FeatureWrap>
                    </FeatureContainer>
                </CardWrap>
            </Extension2Wrap>
        </Extension2Container>
    );
};

export default Extension2;
