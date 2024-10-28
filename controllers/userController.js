const UserModel = require("../models/userModel");
const CVModel = require("../models/cvModel");

const authController = async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Authorization Error",
      success: false,
      error,
    });
  }
};

const cvController = async (req, res) => {
  try {
    const userId = req.body.userId;
    const cvData = await CVModel.findOne({ user: userId });

    if (!cvData) {
      return res.status(200).send({
        success: true,
        message: "CV not uploaded yet.",
      });
    }
    res.status(200).send({
      success: true,
      data: cvData,
    });
  } catch (error) {
    console.error("Error getting CVs: ", error);
    res.status(500).send({
      message: "Error getting CVs",
      success: false,
      error: error.message,
    });
  }
};

const getAllCvsController = async (req, res) => {
  try {
    const cvs = await CVModel.find().populate("user", "name");
    res.status(200).send({
      success: true,
      data: cvs,
    });
  } catch (error) {
    console.error("Error getting all CVs: ", error);
    res.status(500).send({
      message: "Error getting all CVs",
      success: false,
      error: error.message,
    });
  }
};

const approveOrRejectCvController = async (req, res) => {
  try {
    const cvId = req.body.cvId;
    const status = req.body.status;
    const cv = await CVModel.findById(cvId).populate("user");
    if (!cv) {
      return res.status(200).send({
        success: false,
        message: "CV not found",
      });
    }

    cv.status = status;
    await cv.save();

    const user = await UserModel.findById(cv.user._id);
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User not found",
      });
    }

    const notificationMessage =
      status === "approved"
        ? "Your CV has been approved."
        : "Your CV has been rejected.";

    user.notifications.push({
      type: "CV Status Update",
      message: notificationMessage,
      path: `profile`,
      date: new Date(),
    });

    await user.save();

    res.status(200).send({
      success: true,
      message: "CV status updated successfully",
      data: cv,
    });
  } catch (error) {
    console.error("Error updating CV: ", error);
    res.status(500).send({
      message: "Error updating CV",
      success: false,
      error: error.message,
    });
  }
};

const markAllAsReadController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);

    user.seenNotifications = user.seenNotifications.concat(user.notifications);
    user.notifications = [];
    await user.save();

    res.status(200).send({
      message: "All notifications marked as read",
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Failed to mark notifications as read:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

const deleteAllNotificationsController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    user.seenNotifications = [];
    await user.save();

    res.status(200).send({
      message: "All notifications deleted",
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Failed to delete notifications:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

module.exports = {
  authController,
  cvController,
  getAllCvsController,
  markAllAsReadController,
  deleteAllNotificationsController,
  approveOrRejectCvController,
};
