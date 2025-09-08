import App from "./App";
import { AuthProvider } from "./hooks/useAuth2";

function Root() {
    return(
        <AuthProvider>
            <App/>
        </AuthProvider>
    )
}

export default Root;