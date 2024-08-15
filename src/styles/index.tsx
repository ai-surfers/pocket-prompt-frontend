import { ThemeProvider } from "styled-components";
import { ConfigProvider, theme } from "antd";
import GlobalStyle from "./GlobalStyle";

interface StylesProps {
    children: React.ReactNode;
}

const Styles = ({ children }: StylesProps) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#4A7DFF", //#4A7DFF
                    fontFamily: "Pretendard",
                },
            }}
        >
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                {children}
            </ThemeProvider>
        </ConfigProvider>
    );
};

export default Styles;
