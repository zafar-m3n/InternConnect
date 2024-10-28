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
const {
  createJobController,
  getAllJobsController,
  getJobByIdController,
  updateJobController,
  deleteJobController,
  searchJobsController,
  getJobsByCompanyController,
  getJobsByDeadlineController,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/getUserData", authMiddleware, authController);
router.get("/getCvs", authMiddleware, cvController);
router.get("/getAllCvs", authMiddleware, getAllCvsController);
router.post("/cv/update-status", authMiddleware, approveOrRejectCvController);
router.post("/mark-all-as-read", authMiddleware, markAllAsReadController);
router.post(
  "/delete-all-notifications",
  authMiddleware,
  deleteAllNotificationsController
);

router.post("/job/create", authMiddleware, createJobController);
router.get("/jobs", authMiddleware, getAllJobsController);
router.get("/job/:id", authMiddleware, getJobByIdController);
router.put("/job/:id", authMiddleware, updateJobController);
router.delete("/job/:id", authMiddleware, deleteJobController);
router.get("/jobs/search", authMiddleware, searchJobsController);
router.get(
  "/jobs/company/:companyName",
  authMiddleware,
  getJobsByCompanyController
);
router.get("/jobs/deadline", authMiddleware, getJobsByDeadlineController);

module.exports = router;
