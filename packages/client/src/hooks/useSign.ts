const useSign = async (email: string, password: string) => {
    const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    return response.json(); // retourne la réponse du serveur
}
export default useSign;
