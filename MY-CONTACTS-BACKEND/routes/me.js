const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const userController = require("../controllers/user.controller");

router.get("/me", verifyToken, userController.getMe);

module.exports = router;
