import Extension1 from "@/components/Extension/Extension1";
import Extension2 from "@/components/Extension/Extension2";
import Extension3 from "@/components/Extension/Extension3";
import { ExtensionPageContainer } from "./styles";

const ExtensionPage = () => {
    return (
        <ExtensionPageContainer>
            <Extension1 />
            <Extension2 />
            <Extension3 />
        </ExtensionPageContainer>
    );
};

export default ExtensionPage;
