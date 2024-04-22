import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import "../styles/ProfileStyle.css";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [cv, setCv] = useState(null);
  function formatName(name) {
    if (!name) return "";
    return name
      .toLowerCase()
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  return (
    <Layout>
      <div className="grid-container">
        <section className="user-info">
          <img src={user?.profilePic} alt="User Profile Pic" />
          <div className="details">
            <h4>{formatName(user?.name)}</h4>
            <p>{user?.email.split("@")[0]}</p>

            {cv && (
              <div className="d-flex justify-content-between">
                <p className="cv-uploaded-text me-5">CV Uploaded</p>
                <a href="#">Download CV</a>
              </div>
            )}

            <button className="btn btn-outline-primary">
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
              src={cv}
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
