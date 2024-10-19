import { Wrapper } from "@/layouts/Layout";
import styled from "styled-components";

export default function PromptNewPage() {
    return <Container>PromptNewPage</Container>;
}

const Container = styled(Wrapper)`
    ${({ theme }) => theme.mixins.flexBox()};
    background: linear-gradient(180deg, #fff 0%, #f8f9fa 11.48%, #f7f8f9 100%);
`;
