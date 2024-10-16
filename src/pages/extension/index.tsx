import Extension1 from "@/pages/extension/components/Extension1";
import Extension2 from "@/pages/extension/components/Extension2";
import Extension3 from "@/pages/extension/components/Extension3";
import Extension4 from "@/pages/extension/components/Extension4";
import Extension5 from "@/pages/extension/components/Extension5";
import { ExtensionPageContainer } from "./styles";

const ExtensionPage = () => {
    return (
        <ExtensionPageContainer>
            <Extension1 />
            <Extension2 />
            <Extension3 />
            <Extension4 />
            <Extension5 />
        </ExtensionPageContainer>
    );
};

export default ExtensionPage;
