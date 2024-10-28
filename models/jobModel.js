const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Company name is required"],
  },
  vacancy: {
    type: String,
    required: [true, "Vacancy is required"],
  },
  linkedinLink: {
    type: String,
    required: false,
  },
  websiteLink: {
    type: String,
    required: false,
  },
  applicationDeadline: {
    type: Date,
    required: [true, "Application deadline is required"],
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("job", jobSchema);
