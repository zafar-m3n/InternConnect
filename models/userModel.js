const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  microsoftId: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  profilePic: {
    type: String,
    default: "/images/profile.png",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isLecturer: {
    type: Boolean,
    default: false,
  },
  notifications: [
    {
      type: { type: String, required: true },
      message: { type: String, required: true },
      path: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  seenNotifications: [
    {
      type: { type: String, required: true },
      message: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
