const prisma = require('../lib/prisma');

const categoryController = {
    async getAllCategories (req , res) {
        try {
            if(!req.user || !req.user.id){
                return res.status(401).json({error :'User not authenticated'});
            }
            const categories = await prisma.category.findMany({
                where: {userId : req.user.id},
                orderBy: {name : 'asc'}
            })
            res.json(categories);
        } catch (error){
            console.error('Get categories error', error);
            return res.status(500).json({error : 'Internal server error'})
            
        }
    }
}

module.exports = categoryController;