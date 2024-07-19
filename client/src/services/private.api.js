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

const privateAPI = {
  getUserData,
  markAllAsRead,
  deleteAllNotifications,
  getCV,
  getAllCvs,
};

export default privateAPI;
