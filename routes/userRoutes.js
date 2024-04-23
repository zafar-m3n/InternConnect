const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  authController,
  cvController,
} = require("../controllers/userController");

const router = express.Router();
router.post("/getUserData", authMiddleware, authController);
router.get("/getCvs", authMiddleware, cvController);

module.exports = router;
