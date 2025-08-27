import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import prisma from "@prisma/client"

const createUser = async (req, res)=>{
    const {email, password} = res.body

    try{
        const checkUniqueMail = await prisma.user.findUnique(
            {where : {email}}
        )

        if (checkUniqueMail) {
            res.status(400).json({message: "email déjà existant"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = prisma.user.create({
            data:{
                email,
                password : hashedPassword
            }
        })

        res.status(201).json({ message: "Utilisateur créé"})
    }
    catch{
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
}

const logIn = async (req, res)=>{
        const {email, password} = res.body

    try{
        const user = await prisma.user.findUnique(
            {where : {email}}
        )

        if (!user) {
            res.status(400).json({message: "email non trouvé"})
        }

        const checkPasswordValid = await bcrypt.compare(password, user.password)
        if (!checkPasswordValid) {
            return res.status(400).json({message:"mot de passe icorrect"})
        }

        const token = jwt.sign(
            {userId : user.id}, process.env.secret_key
        )
        res.json({ message: "Connexion réussie", token });
    }
    catch{
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
}

export { createUser, logIn}