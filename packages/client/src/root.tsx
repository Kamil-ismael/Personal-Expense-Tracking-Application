import App from "./App";
import { AuthProvider } from "./hooks/AuthProviderProps";

function Root() {
    return(
        <AuthProvider>
            <App/>
        </AuthProvider>
    )
}

export default Root;