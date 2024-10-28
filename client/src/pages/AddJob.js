import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button, DatePicker, message } from "antd";
import Layout from "../components/Layout";
import API from "../services";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "../styles/AddJob.css"; // Import the CSS file for styling

const AddJob = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formattedData = {
        ...values,
        applicationDeadline: values.applicationDeadline.format("YYYY-MM-DD"),
      };

      // Make API call to create job
      const response = await API.private.createJob(formattedData);
      if (response.data.success) {
        message.success("Job created successfully");
        navigate("/internships");
      } else {
        message.error("Failed to create job");
      }
    } catch (error) {
      console.error("Error creating job: ", error);
      message.error("An error occurred while creating the job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="add-job-container">
        <h2 className="add-job-title">Add a New Job</h2>
        <Form layout="vertical" onFinish={onFinish} className="add-job-form">
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[
              { required: true, message: "Please enter the company name" },
            ]}
          >
            <Input placeholder="Enter company name" className="input-field" />
          </Form.Item>

          <Form.Item
            label="Vacancy (Designation/Role)"
            name="vacancy"
            rules={[{ required: true, message: "Please enter the job role" }]}
          >
            <Input
              placeholder="Enter the role or designation"
              className="input-field"
            />
          </Form.Item>

          <Form.Item
            label="LinkedIn Link (Optional)"
            name="linkedinLink"
            rules={[{ type: "url", message: "Please enter a valid URL" }]}
          >
            <Input
              placeholder="Enter LinkedIn profile link"
              className="input-field"
            />
          </Form.Item>

          <Form.Item
            label="Website Link (Optional)"
            name="websiteLink"
            rules={[{ type: "url", message: "Please enter a valid URL" }]}
          >
            <Input
              placeholder="Enter company website link"
              className="input-field"
            />
          </Form.Item>

          <Form.Item
            label="Application Deadline"
            name="applicationDeadline"
            rules={[
              {
                required: true,
                message: "Please select an application deadline",
              },
            ]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              className="input-field"
              disabledDate={(current) =>
                current && current < moment().endOf("day")
              }
            />
          </Form.Item>

          <Form.Item className="submit-btn-container">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="submit-btn"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default AddJob;
