import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";

const AuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const user = query.get("user");
    const successMessage = query.get("message");
    const success = query.get("success") === "true";

    if (success && token && user) {
      const userInfo = {
        token,
        user: JSON.parse(decodeURIComponent(user)),
      };

      localStorage.setItem("authInfo", JSON.stringify(userInfo));
      message.success(successMessage);
      navigate("/");
    } else {
      navigate("/auth/login", {
        state: { error: "Authentication failed. Please try again." },
      });
    }
  }, [location, navigate]);

  return (
    <div>
      {console.log("AuthSuccess component rendering")}
      Logging in...
    </div>
  );

};
export default AuthSuccess;
