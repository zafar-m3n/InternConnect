import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/UploadStyle.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Dragger } = Upload;

const CVUpload = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const tips = [
    {
      key: "Customize Your CV",
      text: "Tailor your CV to the job you are applying for. Highlight relevant experience and skills that align with the job description.",
    },
    {
      key: "Keep It Concise",
      text: "Limit your CV to one or two pages. Only include information that is relevant to the job.",
    },
    {
      key: "Quantify Achievements",
      text: "Where possible, add numbers to your achievements. For example, 'increased sales by 20%' or 'managed a team of 10'.",
    },
    {
      key: "Proofread",
      text: "Always proofread your CV multiple times for spelling and grammar errors. Consider having a friend or a mentor review it as well.",
    },
    {
      key: "Use a Professional Format",
      text: "Choose a clean and professional format for your CV. Use a readable font and clear headings.",
    },
  ];

  const props = {
    name: "file",
    action: "http://localhost:8080/api/v1/upload/upload",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { userId: user._id },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        navigate("/profile");
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    accept: ".pdf",
    beforeUpload(file) {
      const isJpgOrPng = file.type === "application/pdf";
      if (!isJpgOrPng) {
        message.error("You can only upload a single PDF file");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("CV must be less than 2MB");
      }
      return isJpgOrPng && isLt2M;
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout>
      <h2>Upload your CV</h2>
      <div className="cv-tips">
        <h3>CV Improvement Tips</h3>
        <ul>
          <li key={tips[currentTipIndex].key}>
            <div className="tip">
              <strong>{tips[currentTipIndex].key}:</strong>{" "}
              {tips[currentTipIndex].text}
            </div>
          </li>
        </ul>
      </div>
      <div className="upload-section">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag your CV to this area to upload
          </p>
          <p className="ant-upload-hint">
            Your CV must be in PDF format and less than 2MB
          </p>
        </Dragger>
      </div>
    </Layout>
  );
};

export default CVUpload;
