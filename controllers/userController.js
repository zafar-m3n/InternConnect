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

const readNotificationController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    const notification = user.notifications.id(req.body.notificationId);

    if (notification) {
      user.seenNotifications.push(notification);
      user.notifications.pull(notification);

      await user.save();
      res.send({
        message: "Notification marked as read successfully",
        success: true,
      });
    } else {
      res.status(404).send({
        message: "Notification not found",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error reading notification",
      success: false,
      error,
    });
  }
};

module.exports = { authController, cvController, readNotificationController };
