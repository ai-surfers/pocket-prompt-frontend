import Image from "next/image";
import React from "react";
import AIBanner from "@img/banner-ai-prompt.png";
import styled from "styled-components";
const Banner = () => {
    return (
        <Wrapper>
            <Image
                src={AIBanner}
                alt="banner-ai-prompt"
                width={808}
                height={124}
            />
        </Wrapper>
    );
};

export default Banner;

const Wrapper = styled.div`
    margin: 0 auto 40px auto;
`;
