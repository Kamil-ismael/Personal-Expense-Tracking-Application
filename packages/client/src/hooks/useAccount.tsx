export function useAccount() {
    const changePassword = async (currentPassword: string, newPassword: string) => {
        try {
            const response = await fetch('http://localhost:8080/api/account/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("auth_token")}`,
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to change password');
            }
            return await response.json();
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    };

    return { changePassword };
}