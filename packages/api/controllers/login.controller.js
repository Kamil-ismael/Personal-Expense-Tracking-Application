const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const prisma = require("../lib/prisma.js")

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "email non trouvé" });
    }

    const checkPasswordValid = await bcrypt.compare(password, user.password);
    if (!checkPasswordValid) {
      return res.status(400).json({ message: "mot de passe incorrect" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...userWithoutPassword } = user;
    
    console.log({
      message: "Connexion réussie",
      token,
      user: userWithoutPassword,
    });
    
    res.json({
      message: "Connexion réussie",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = logIn