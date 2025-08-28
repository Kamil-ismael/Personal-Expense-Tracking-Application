const prisma = require("../lib/prisma");

const categoryController = {
  async getAllCategories(req, res) {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "User not authenticated" });
      }
      const categories = await prisma.category.findMany({
        where: { userId: req.user.id },
        orderBy: { name: "asc" },
      });
      res.json(categories);
    } catch (error) {
      console.error("Get categories error", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createCategory(req, res) {
    try {
      const { name } = req.body;
      if (!name || !name.trim()) {
        return res.status(400).json({
          error: "Category name is required"
        });
      }

      const category = await prisma.category.create({
        data: {
          name: name.trim(),
          userId: req.user.id
        }
      });
      res.status(201).json(category);
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(400).json({
          error: "Category name already exists",
        });
      }
      console.error("Create category error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateCategory(req, res){
    try {
      const { id } = req.params;
      const { name } = req.body;
      if(!name || !name.trim()){
        return res.status(400).json({
          error: 'Category name is required'
        });    
      }
      const category = await prisma.category.update({
        where: {
          id,
          userId: req.user.id
        },
        data: {
          name: name.trim()
        }
      });
      res.json(category);
    } catch (error) {
      if(error.code === 'P2025') {
        return res.status(404).json({error: 'Category not found'});
      }
      if(error.code === 'P2002') {
        return res.status(400).json({
          error: 'Category name already exists'
        });
      }
      console.error('Update category error:', error);
      res.status(500).json({ error: 'Internal server error'});
    }
  }
};

module.exports = categoryController;
