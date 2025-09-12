const prisma = require("../lib/prisma.js")

const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if ((!currentPassword || !newPassword) || (currentPassword === "" || newPassword === "")) {
        return res.status(400).json({ message: "Current and new password are required" });
    }
    if (newPassword.length < 8) {
        return res.status(400).json({
            message: "New password is too weak. It must be at least 8 characters long."
        });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const bcrypt = require("bcryptjs");
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: req.user.id },
            data: { password: hashedNewPassword }
        });
        res.json({ message: "Password updated successfully" });
    } catch (err) {
        console.error("Error in changePassword:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}
module.exports = { changePassword };