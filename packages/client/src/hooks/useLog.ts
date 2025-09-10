import { setAuthToken } from "../lib/api/helpers";

const useLog = async (email: string, password: string) => {
    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
           if (data.message == "email non trouvé") {
                alert("Email absent de la base de donnée")
                throw new Error("❌ Email non trouvé");
           }
           if (data.message == "mot de passe incorrect") {
                alert("Connexion échouée")
                throw new Error("❌ Mot de passe incorrect");
           }
        }
        setAuthToken
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
export default useLog