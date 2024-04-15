const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { authController } = require("../controllers/userController");

const router = express.Router();
router.get("/getUserData", authMiddleware, authController);

module.exports = router;
