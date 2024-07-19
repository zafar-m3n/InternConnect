import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { message } from "antd";
import "../styles/ProfileStyle.css";
import API from "../services";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [cv, setCv] = useState(null);

  const API_BASE_URL = process.env.API_BASE_URL;

  function formatName(name) {
    if (!name) return "";
    return name
      .toLowerCase()
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  const statusColors = {
    pending: "text-warning",
    approved: "text-success",
    rejected: "text-danger",
  };

  const getCV = async () => {
    try {
      const response = await API.private.getCV();
      if (response.data.data) {
        setCv(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching CV:", error.response);
      message.error("An error occurred while fetching the CV.");
    }
  };

  useEffect(() => {
    getCV();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="grid-container">
        <section className="user-info">
          <img src={user?.profilePic} alt="User Profile Pic" />
          <div className="details">
            <h4>{formatName(user?.name)}</h4>
            <p>{user?.email.split("@")[0]}</p>

            {cv && (
              <div className="d-flex justify-content-between m-0">
                <p className="cv-uploaded-text me-5">CV Uploaded</p>
                <p>{cv.filename}</p>
              </div>
            )}

            {cv && (
              <div className="d-flex justify-content-between m-0">
                <p className="cv-uploaded-text me-5">CV Status</p>
                <p
                  className={`text-capitalize fw-bold ${
                    statusColors[cv.status] || ""
                  }`}
                >
                  {cv.status}
                </p>
              </div>
            )}

            <button
              className="btn btn-outline-primary"
              onClick={() => {
                navigate("/cv-upload");
              }}
            >
              {cv ? "Update CV" : "Upload CV"}
            </button>
          </div>
        </section>

        <section className="applied-jobs">
          <h4>Applied Jobs</h4>
          <ul className="mt-2">
            <li>
              <span className="company-name">WSO2</span> -{" "}
              <span className="job-title">Software engineering intern</span>
            </li>
            <li>
              <span className="company-name">WSO2</span> -{" "}
              <span className="job-title">UI/UX intern</span>
            </li>
            <li>
              <span className="company-name">Virtusa</span> -{" "}
              <span className="job-title">Software engineering Intern</span>
            </li>
          </ul>
        </section>

        <section className="cv-preview">
          <h4>CV Preview Section</h4>
          {cv ? (
            <iframe
              src={`${API_BASE_URL}/${cv.path}`}
              title="CV Preview"
              width="100%"
              height="450px"
            ></iframe>
          ) : (
            <p>No CV uploaded yet.</p>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Profile;
