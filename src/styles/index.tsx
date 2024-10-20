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
                    colorPrimary: "#7580EA",
                    fontFamily: "Pretendard",
                },
                components: {
                    Typography: {
                        titleMarginBottom: "10px",
                        titleMarginTop: 0,
                    },
                    Select: {
                        optionSelectedColor: "#7580EA",
                        optionSelectedBg: "#F2F3FD",
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
