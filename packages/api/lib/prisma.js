const PrismaClient = require("../generated/prisma/index.js").PrismaClient

const prisma = new PrismaClient();

module.exports = prisma