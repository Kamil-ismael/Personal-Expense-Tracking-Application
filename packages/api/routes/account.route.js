const express = require("express");
const { authenticateToken } = require("../middleware/auth");

const { changePassword } = require("../controllers/account.controller");

const AccountRouter = express.Router();

AccountRouter.post("/password", authenticateToken, changePassword );

module.exports = AccountRouter;