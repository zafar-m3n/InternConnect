import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const CVPage = () => {
  const [cvs, setCvs] = useState([]);
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
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/getAllCvs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setCvs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching CVs: ", error);
    }
  };

  useEffect(() => {
    fetchCVs();
  }, []);

  const handleApprove = (id) => {
    setCvs((prevCvs) =>
      prevCvs.map((cv) => (cv._id === id ? { ...cv, status: "approved" } : cv))
    );
  };

  const handleReject = (id) => {
    setCvs((prevCvs) =>
      prevCvs.map((cv) => (cv._id === id ? { ...cv, status: "rejected" } : cv))
    );
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
                  href={`http://localhost:8080/${cv.path}`}
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
