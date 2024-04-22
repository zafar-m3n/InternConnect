const multer = require("multer");
const express = require("express");
const File = require("../models/cvModel");
const path = require("path");

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
  try {
    const userId = req.body.userId;
    const newFile = new File({
      user: userId,
      filename: req.file.filename,
      path: req.file.path,
    });

    const savedFile = await newFile.save();
    res.status(200).json(savedFile);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
