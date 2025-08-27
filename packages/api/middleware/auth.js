import { verify } from 'jsonwebtoken';
import { user as _user } from '../lib/prisma';

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({ error: 'Access Token Required' });
    }
    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        const user = await _user.findUnique({
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
export default authenticateToken;