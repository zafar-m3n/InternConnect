const multer = require("multer");
const express = require("express");
const File = require("../models/cvModel");
const User = require("../models/userModel");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./CVs");
  },
  filename: function (req, file, cb) {
    const nameWithoutExt = file.originalname
      .replace(path.extname(file.originalname), "")
      .split(" ")
      .join("-");
    cb(
      null,
      `${nameWithoutExt}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const userId = req.body.userId;

  try {
    const fileData = {
      user: userId,
      filename: req.file.filename,
      path: req.file.path,
    };

    const existingFile = await File.findOne({ user: userId });

    if (existingFile) {
      const fullPath = path.join(__dirname, "..", existingFile.path);
      try {
        fs.unlinkSync(fullPath);
        console.log(`Successfully deleted old CV: ${fullPath}`);
      } catch (err) {
        console.error(`Failed to delete old CV: ${err}`);
      }
    }

    const updatedFile = await File.findOneAndUpdate(
      { user: userId },
      fileData,
      { new: true, upsert: true }
    );

    const user = await User.findById(userId);
    const admin = await User.findOne({ isAdmin: true });
    const notificationMessage = `${user.name} has submitted a CV for approval.`;
    admin.notifications.push({
      type: "CV Upload",
      message: notificationMessage,
      path: `/cvs`,
    });
    await admin.save();

    res.status(200).json(updatedFile);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
