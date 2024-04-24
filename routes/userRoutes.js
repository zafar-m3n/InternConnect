const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  authController,
  cvController,
  readNotificationController,
} = require("../controllers/userController");

const router = express.Router();
router.post("/getUserData", authMiddleware, authController);
router.get("/getCvs", authMiddleware, cvController);

router.post("/mark-as-read", authMiddleware, readNotificationController);

module.exports = router;
