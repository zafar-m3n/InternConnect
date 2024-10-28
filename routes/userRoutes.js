const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  authController,
  cvController,
  getAllCvsController,
  approveOrRejectCvController,
  markAllAsReadController,
  deleteAllNotificationsController,
} = require("../controllers/userController");

const router = express.Router();
router.post("/getUserData", authMiddleware, authController);
router.get("/getCvs", authMiddleware, cvController);
router.get("/getAllCvs", authMiddleware, getAllCvsController);
router.post(
  "/cv/update-status",
  authMiddleware,
  approveOrRejectCvController
);
router.post("/mark-all-as-read", authMiddleware, markAllAsReadController);
router.post(
  "/delete-all-notifications",
  authMiddleware,
  deleteAllNotificationsController
);

module.exports = router;
