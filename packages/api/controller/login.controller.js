import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import prisma from "../lib/prisma.js"

const logIn = async (req, res)=>{
        const {email, password} = req.body

    try{
        const user = await prisma.user.findUnique(
            {where : {email}}
        )

        if (!user) {
            return res.status(400).json({message: "email non trouvé"})
        }

        const checkPasswordValid = await bcrypt.compare(password, user.password)
        if (!checkPasswordValid) {
            return res.status(400).json({message:"mot de passe incorrect"})
        }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } 
    );

        res.json({ message: "Connexion réussie", token });
    }
    catch(err){
        console.error(err)
        return res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
}

export default logIn;