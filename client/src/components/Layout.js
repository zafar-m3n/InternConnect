import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LayoutStyle.css";
import "../styles/NotificationPopoverStyle.css";
import { useSelector } from "react-redux";
import { adminMenu, studentMenu } from "../data/data";
import { Link, useLocation } from "react-router-dom";
import { message, Badge, Avatar, Popover } from "antd";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  function formatName(name) {
    if (!name) return "";
    return name
      .toLowerCase()
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  const content = (
    <div className="notification-popover">
      {user?.notifications && user?.notifications.length > 0 ? (
        user?.notifications.slice(0, 3).map((notification, index) => (
          <div key={index} className="notification-item">
            <p className="notification-type">{notification.type}</p>
            <p className="notification-message">{notification.message}</p>
          </div>
        ))
      ) : (
        <p className="notification-message text-center">You have no notifications</p>
      )}
      <Link to="/notifications" className="notification-link">
        See all
      </Link>
    </div>
  );

  const menuRef = useRef();
  const imageRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== imageRef.current && e.target !== menuRef.current) {
      setOpen(false);
    }
  });

  const handleLogout = () => {
    message.success("Logged out successfully");
    localStorage.clear();
    navigate("/auth/login");
  };

  const SidebarMenu = user?.isAdmin ? adminMenu : studentMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>InternConnect</h6>
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={`fas ${menu.icon}`}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                <Popover
                  content={content}
                  title={
                    <div className="notification-title">Notifications</div>
                  }
                  placement="bottomRight"
                  trigger="click"
                >
                  <Badge count={user?.notifications.length} showZero>
                    <Avatar
                      icon={<i className="fas fa-bell"></i>}
                      shape="square"
                    />
                  </Badge>
                </Popover>
                <Link to="/profile">{formatName(user?.name)}</Link>
                <div className="image-dropdown">
                  <img
                    ref={imageRef}
                    onClick={() => setOpen(!open)}
                    src={user?.profilePic}
                    alt="profile"
                    className="profile-pic"
                  />
                  {open && (
                    <div
                      className="dropdown"
                      ref={menuRef}
                      onClick={() => setOpen(false)}
                    >
                      <ul>
                        <li onClick={handleLogout}>Logout</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
