import Extension1 from "@/components/Extension/Extension1";
import Extension2 from "@/components/Extension/Extension2";
import Extension3 from "@/components/Extension/Extension3";
import Extension4 from "@/components/Extension/Extension4";
import { ExtensionPageContainer } from "./styles";

const ExtensionPage = () => {
    return (
        <ExtensionPageContainer>
            <Extension1 />
            <Extension2 />
            <Extension3 />
            <Extension4 />
        </ExtensionPageContainer>
    );
};

export default ExtensionPage;
