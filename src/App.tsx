import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import Styles from "./styles";

function App() {
    return (
        <Styles>
            <RouterProvider router={router} />
        </Styles>
    );
}

export default App;
