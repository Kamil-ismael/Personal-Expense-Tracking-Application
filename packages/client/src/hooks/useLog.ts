const useLog = async (email: string, password: string) => {
    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Erreur lors de la connexion");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
export default useLog