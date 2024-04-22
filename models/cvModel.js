const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("cv", fileSchema);
