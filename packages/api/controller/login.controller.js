import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import prisma from "../lib/prisma.js"

const createUser = async (req, res)=>{
    const {email, password} = req.body

    if ((!email || !password)||(email == "" || password == "")) {
        return res.status(400).json({message: "Email et mot de passe requis"})
    }

    try{
        const checkUniqueMail = await prisma.user.findUnique(
            {where : {email}}
        )

        if (checkUniqueMail) {
            return res.status(400).json({message: "email déjà existant"})
        }

        if (password.length <8) {
            res.status(400).json({message: "Mot de passe trop faible. Le mot de passe doit contenir au moins 8 caractères."})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = prisma.user.create({
            data:{
                email,
                password : hashedPassword
            }
        })
        const defaultCategories = prisma.category.create({
            data: {
                name: ""
            }
        })

        res.status(201).json({ message: "Utilisateur créé"})
    }
    catch{
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
}

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
            return res.status(400).json({message:"mot de passe icorrect"})
        }

        const token = jwt.sign(
            {userId : user.id}, process.env.secret_key
        )
        res.json({ message: "Connexion réussie", token });
    }
    catch(err){
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
}

export { createUser, logIn}