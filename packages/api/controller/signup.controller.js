import prisma from "../lib/prisma.js"
import bcrypt from "bcryptjs"

const createUser = async (req, res) => {
    const { email, password } = req.body

    if ((!email || !password)||(email == "" || password == "")) {
        return res.status(400).json({message: "Email et mot de passe requis"})
    }

    try {
        const checkUniqueMail = await prisma.user.findUnique({
            where: { email }
        })

        if (checkUniqueMail) {
            return res.status(400).json({message: "email déjà existant"})
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Mot de passe trop faible. Le mot de passe doit contenir au moins 8 caractères."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        
        // await prisma.category.create({
        //     data: {
        //         name: "Loyer"
        //     }
        // })

        res.status(201).json({ message: "Utilisateur créé", user: newUser })
    } 
    catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
}


export default createUser;