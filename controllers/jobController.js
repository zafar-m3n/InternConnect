const Job = require("../models/jobModel");

// Create a new job
const createJobController = async (req, res) => {
  try {
    const {
      companyName,
      vacancy,
      linkedinLink,
      websiteLink,
      applicationDeadline,
    } = req.body;

    // Check if required fields are provided
    if (!companyName || !vacancy || !applicationDeadline) {
      return res.status(400).json({
        success: false,
        message:
          "Company name, vacancy, and application deadline are required.",
      });
    }

    // Create a new job
    const newJob = new Job({
      companyName,
      vacancy,
      linkedinLink, // optional
      websiteLink, // optional
      applicationDeadline,
    });

    // Save the job to the database
    await newJob.save();

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: newJob,
    });
  } catch (error) {
    console.error("Error creating job: ", error);
    return res.status(500).json({
      success: false,
      message: "Error creating job",
      error: error.message,
    });
  }
};

// Get all job postings with optional pagination and filtering
const getAllJobsController = async (req, res) => {
  try {
    // Optional pagination, filter can be added based on your needs
    const jobs = await Job.find();
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
      error: error.message,
    });
  }
};

// Get a specific job by its ID
const getJobByIdController = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching job",
      error: error.message,
    });
  }
};

// Update a job by its ID
const updateJobController = async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true,
    });
    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({
      success: false,
      message: "Error updating job",
      error: error.message,
    });
  }
};

// Delete a job by its ID
const deleteJobController = async (req, res) => {
  try {
    const jobId = req.params.id;
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      data: deletedJob,
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting job",
      error: error.message,
    });
  }
};

// Search jobs by keywords in company name or vacancy
const searchJobsController = async (req, res) => {
  try {
    const { keyword } = req.query;
    const jobs = await Job.find({
      $or: [
        { companyName: { $regex: keyword, $options: "i" } },
        { vacancy: { $regex: keyword, $options: "i" } },
      ],
    });
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Error searching jobs:", error);
    res.status(500).json({
      success: false,
      message: "Error searching jobs",
      error: error.message,
    });
  }
};

// Get jobs by company name
const getJobsByCompanyController = async (req, res) => {
  try {
    const { companyName } = req.params;
    const jobs = await Job.find({
      companyName: { $regex: companyName, $options: "i" },
    });
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs by company:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching jobs by company",
      error: error.message,
    });
  }
};

// Get jobs with application deadlines in the future
const getJobsByDeadlineController = async (req, res) => {
  try {
    const currentDate = new Date();
    const jobs = await Job.find({ applicationDeadline: { $gte: currentDate } });
    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs by deadline:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching jobs by deadline",
      error: error.message,
    });
  }
};

module.exports = {
  createJobController,
  getAllJobsController,
  getJobByIdController,
  updateJobController,
  deleteJobController,
  searchJobsController,
  getJobsByCompanyController,
  getJobsByDeadlineController,
};
