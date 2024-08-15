import { ThemeProvider } from "styled-components";
import { ConfigProvider } from "antd";
import GlobalStyle from "./GlobalStyle";
import theme from "./theme";

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
                components: {
                    Typography: {
                        titleMarginBottom: "10px",
                        titleMarginTop: 0,
                    },
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
