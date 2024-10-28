import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services";
import { message } from "antd";

const CVPage = () => {
  const [cvs, setCvs] = useState([]);
  const API_BASE_URL = process.env.API_BASE_URL;

  function formatName(name) {
    if (!name) return "";
    return name
      .toLowerCase()
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  const fetchCVs = async () => {
    try {
      const response = await API.private.getAllCvs();
      if (response.data.success) {
        setCvs(response.data.data);
      } else {
        message.error("Failed to fetch CVs");
      }
    } catch (error) {
      console.error("Error fetching CVs: ", error);
      message.error("An error occurred while fetching CVs.");
    }
  };

  useEffect(() => {
    fetchCVs();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await API.private.approveOrRejectCv({
        cvId: id,
        status: "approved",
      });
      if (response.data.success) {
        message.success("CV approved successfully");
        // Fetch updated list of CVs after approval
        fetchCVs();
      } else {
        message.error("Failed to approve CV");
      }
    } catch (error) {
      console.error("Error approving CV: ", error);
      message.error("An error occurred while approving the CV.");
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await API.private.approveOrRejectCv({
        cvId: id,
        status: "rejected",
      });
      if (response.data.success) {
        message.success("CV rejected successfully");
        // Fetch updated list of CVs after rejection
        fetchCVs();
      } else {
        message.error("Failed to reject CV");
      }
    } catch (error) {
      console.error("Error rejecting CV: ", error);
      message.error("An error occurred while rejecting the CV.");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return "text-success";
      case "rejected":
        return "text-danger";
      case "pending":
        return "text-warning";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <h4 className="mb-4">Student CVs</h4>
      <table className="table table-striped table-bordered rounded">
        <thead className="thead-dark">
          <tr>
            <th>Student Name</th>
            <th>CV</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cvs.map((cv) => (
            <tr key={cv._id}>
              <td className="text-capitalize">{formatName(cv.user.name)}</td>
              <td>
                <a
                  href={`${API_BASE_URL}/${cv.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cv.filename}
                </a>
              </td>
              <td
                className={`${getStatusClass(
                  cv.status
                )} text-capitalize fw-bold`}
              >
                {cv.status}
              </td>
              <td>
                {cv.status === "pending" && (
                  <>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => handleApprove(cv._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleReject(cv._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default CVPage;
