import Banner from "./components/Banner/Banner";
import { Wrapper } from "@/layouts/Layout";
import Prompt from "./components/Prompt/Prompt";

export default function HomePage() {
    return (
        <Wrapper>
            <Banner />
            <Prompt />
        </Wrapper>
    );
}
