import React from "react";
import "../styles/LoginStyles.css";

const Login = () => {
  return (
    <div>
      <header>
        <img src="/images/logo.jpg" alt="logo" />
        <h1>APIIT InternConnect</h1>
      </header>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: 'url("/images/internship.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="box">
          <p>
            <strong>Dear Students,</strong>
          </p>
          <p>
            Click on "STUDENTS’ OFFICE 365 EDUCATION LOGIN" button to log in to
            the IMS.
          </p>
          <p>
            If you cannot remember the password, go to&nbsp;
            <a
              href="https://www.office.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.office.com
            </a>
            &nbsp;and get it recovered with the "FORGOT PASSWORD" option.
          </p>
          <p>Please use the chat window to contact ICT department.</p>
        </div>
        <div className="box">
          <p>Cookies must be enabled in your browser</p>
          <p>Log into your InternConnect account via:</p>
          <a href="/" className="office-login-button">
            <img src="/images/office_logo.png" alt="" />
            MICROSOFT OFFICE 365 LOGIN
          </a>
        </div>
        <div className="box">
          <h3>Is this your first time here?</h3>
          <p>
            Students may get their password by logging in to&nbsp;
            <a
              href="https://www.office.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.office.com
            </a>
            .
          </p>
        </div>
      </div>
      <footer>
        <p>
          All rights reserved 2024 | APIIT ICT Department | E - it@apiit.lk | T
          - Colombo City Campus 0117675120/123 , Law School 0117675216 | W -
          www.apiit.lk
        </p>
      </footer>
    </div>
  );
};

export default Login;
