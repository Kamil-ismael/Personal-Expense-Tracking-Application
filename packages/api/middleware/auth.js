const pkg = require("jsonwebtoken")
const prisma = require("../lib/prisma.js")
const { verify } = pkg;

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({ error: 'Access Token Required' });
    }
    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true,  email: true }
        })
        if(!user){
            return res.status(401).json({error: 'Invalid Token'});
        }
        req.user = user;
        next();
    } catch(error){
        return res.status(403).json({ error: 'Invalid or Expired Token' });
    }
}
module.exports = {authenticateToken};