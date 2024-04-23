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

module.exports = { authController, cvController };
