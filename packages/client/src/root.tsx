import App from "./App";
import { AuthProvider } from "./hooks/AuthProviderProps";

function Root() {
    return(
        <div className="w-screen h-screen">
            <AuthProvider>
                <App/>
            </AuthProvider>
        </div>

    )
}

export default Root;