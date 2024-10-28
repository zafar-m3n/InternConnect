import instance from "../lib/axios";

const getUserData = async (params = {}) => {
  return await instance.client.post("api/v1/user/getUserData", params, {
    headers: instance.defaultHeaders(),
  });
};

const markAllAsRead = async () => {
  try {
    return await instance.client.post(
      "api/v1/user/mark-all-as-read",
      {},
      {
        headers: instance.defaultHeaders(),
      }
    );
  } catch (error) {
    console.error("Error marking all as read: ", error);
  }
};

const deleteAllNotifications = async () => {
  try {
    return await instance.client.post(
      "api/v1/user/delete-all-notifications",
      {},
      {
        headers: instance.defaultHeaders(),
      }
    );
  } catch (error) {
    console.error("Error deleting all notifications: ", error);
  }
};

const getCV = async () => {
  try {
    return await instance.client.get("api/v1/user/getCvs", {
      headers: instance.defaultHeaders(),
    });
  } catch (error) {
    console.error("Error fetching CV: ", error);
  }
};

const getAllCvs = async () => {
  try {
    return await instance.client.get("api/v1/user/getAllCvs", {
      headers: instance.defaultHeaders(),
    });
  } catch (error) {
    console.error("Error fetching CVs: ", error);
  }
};

const approveOrRejectCv = async (params = {}) => {
  try {
    return await instance.client.post("api/v1/user/cv/update-status", params, {
      headers: instance.defaultHeaders(),
    });
  } catch (error) {
    console.error("Error updating CV: ", error);
  }
};

const createJob = async (jobData) => {
  try {
    const response = await instance.client.post(
      "/api/v1/user/job/create",
      jobData,
      {
        headers: instance.defaultHeaders(),
      }
    );
    return response;
  } catch (error) {
    console.error("Error creating job: ", error);
    throw error;
  }
};

const getAllJobs = async () => {
  try {
    const response = await instance.client.get("/api/v1/user/jobs", {
      headers: instance.defaultHeaders(),
    });
    return response;
  } catch (error) {
    console.error("Error fetching jobs: ", error);
    throw error;
  }
};

const getJobById = async (id) => {
  try {
    const response = await instance.client.get(`/api/v1/user/job/${id}`, {
      headers: instance.defaultHeaders(),
    });
    return response;
  } catch (error) {
    console.error("Error fetching job by ID: ", error);
    throw error;
  }
};

const updateJob = async (id, jobData) => {
  try {
    const response = await instance.client.put(
      `/api/v1/user/job/${id}`,
      jobData,
      {
        headers: instance.defaultHeaders(),
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating job: ", error);
    throw error;
  }
};

const deleteJob = async (id) => {
  try {
    const response = await instance.client.delete(`/api/v1/user/job/${id}`, {
      headers: instance.defaultHeaders(),
    });
    return response;
  } catch (error) {
    console.error("Error deleting job: ", error);
    throw error;
  }
};

const searchJobs = async (keyword) => {
  try {
    const response = await instance.client.get(
      `/api/v1/user/jobs/search?keyword=${keyword}`,
      {
        headers: instance.defaultHeaders(),
      }
    );
    return response;
  } catch (error) {
    console.error("Error searching jobs: ", error);
    throw error;
  }
};

const getJobsByCompany = async (companyName) => {
  try {
    const response = await instance.client.get(
      `/api/v1/user/jobs/company/${companyName}`,
      {
        headers: instance.defaultHeaders(),
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching jobs by company:", error);
    throw error;
  }
};

const getJobsByDeadline = async () => {
  try {
    const response = await instance.client.get("/api/v1/user/jobs/deadline", {
      headers: instance.defaultHeaders(),
    });
    return response;
  } catch (error) {
    console.error("Error fetching jobs by deadline:", error);
    throw error;
  }
};

const privateAPI = {
  getUserData,
  markAllAsRead,
  deleteAllNotifications,
  getCV,
  getAllCvs,
  approveOrRejectCv,
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  searchJobs,
  getJobsByCompany,
  getJobsByDeadline,
};

export default privateAPI;
