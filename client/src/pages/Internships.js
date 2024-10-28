import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Button, Card, message } from "antd";
import Layout from "../components/Layout";
import API from "../services";
import "../styles/Internships.css";

const { Search } = Input;

const Internships = () => {
  const { user } = useSelector((state) => state.user);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchJobs = async () => {
    try {
      const response = await API.private.getAllJobs();
      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  const onSearch = async (value) => {
    setSearchKeyword(value);
    if (value.trim() === "") {
      const response = await API.private.getAllJobs();
      if (response.data.success) {
        setJobs(response.data.data);
      }
    } else {
      const response = await API.private.searchJobs(value);
      if (response.data.success) {
        setJobs(response.data.data);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await API.private.deleteJob(id);
      if (response.data.success) {
        message.success("Job deleted successfully");
        fetchJobs();
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Browse Internships</h2>
        {user.isAdmin && (
          <Button
            type="primary"
            onClick={() => navigate("/internships/create")}
          >
            Add Job
          </Button>
        )}
      </div>

      <div className="mb-4">
        <Search
          placeholder="Search internships..."
          onSearch={onSearch}
          enterButton
        />
      </div>

      <div className="row">
        {jobs.map((job) => (
          <div className="col-md-4 mb-4" key={job._id}>
            <Card className="job-card" bordered={false}>
              <h3 className="company-name">{job.companyName}</h3>
              <p className="job-title">{job.vacancy}</p>
              <p className="date-posted">
                <strong>Date Posted:</strong>{" "}
                {new Date(job.datePosted).toLocaleDateString()}
              </p>
              <p className="expires-on">
                <strong>Expires on:</strong>{" "}
                <span className="expiration-date">
                  {new Date(job.applicationDeadline).toLocaleDateString()}
                </span>
              </p>

              {user.isAdmin ? (
                <Button
                  type="danger"
                  onClick={() => handleDelete(job._id)}
                  className="delete-btn"
                >
                  Delete Job
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => navigate(`/internships/apply/${job._id}`)}
                  className="apply-btn"
                >
                  Apply
                </Button>
              )}
            </Card>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Internships;
