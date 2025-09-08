import App from "./App";
import { AuthProvider } from "./hooks/useAuth";

function Root() {
    return(
        <AuthProvider>
            <App/>
        </AuthProvider>
    )
}

export default Root;