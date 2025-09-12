const path = require('path');
const fs = require('fs');
const prisma = require('../lib/prisma');

class ReceiptController {
  static async getReceipt(req, res) {
    try {
      const { expenseId } = req.params;

      // Vérifier que la dépense appartient à l'utilisateur
      const expense = await prisma.expense.findFirst({
        where: {
          id: expenseId,
          userId: req.user.id
        }
      });

      if (!expense || !expense.receiptUrl) {
        return res.status(404).json({ error: 'Receipt not found' });
      }

      const filePath = path.join(__dirname, '../../uploads', expense.receiptUrl);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Receipt file not found' });
      }

      res.sendFile(filePath);
    } catch (error) {
      console.error('Get receipt error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = { ReceiptController };

