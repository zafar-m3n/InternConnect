const userModel = require("../models/userModel");

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    console.log("User: ", user);
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    } else {
      return res.status(200).send({
        message: "User found",
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log("Error in authController: ", error);
    res
      .status(500)
      .send({ message: "Internal Server Error", success: false, error });
  }
};

module.exports = { authController };
