import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

const AuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);
      message.destroy();
      message.success("Login Successful");
      navigate("/");
    } else {
      navigate("/auth/login", {
        state: { error: "Authentication failed. Please try again." },
      });
    }
  }, [location, navigate]);

  return <div>Logging in...</div>;
};
export default AuthSuccess;
