import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, message } from "antd";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/NotificationPopoverStyle.css";
import { setUser } from "../redux/features/userSlice";
import API from "../services";

const { TabPane } = Tabs;

const Notifications = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [activeTabKey, setActiveTabKey] = useState("1");

  const markAllAsRead = async () => {
    try {
      const response = await API.private.markAllAsRead();
      console.log(response);
      if (response.data.success) {
        message.success(response.data.message);
        const updatedUser = response.data.data;
        dispatch(setUser(updatedUser));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to mark all as read: " + error.message);
    }
  };

  const deleteAllNotifications = async () => {
    try {
      const response = await API.private.deleteAllNotifications();
      if (response.data.success) {
        message.success(response.data.message);
        const updatedUser = response.data.data;
        dispatch(setUser(updatedUser));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Failed to delete all notifications: " + error.message);
    }
  };

  const tabBarExtraContent = {
    right:
      activeTabKey === "1" && user?.notifications.length > 0 ? (
        <button
          className="btn btn-link text-decoration-none"
          onClick={markAllAsRead}
        >
          Mark all as read
        </button>
      ) : activeTabKey === "2" && user?.seenNotifications.length > 0 ? (
        <button
          className="btn btn-link text-decoration-none"
          onClick={deleteAllNotifications}
        >
          Delete notifications
        </button>
      ) : null,
  };

  return (
    <Layout>
      <div className="notification-title">Notifications</div>
      <Tabs
        defaultActiveKey="1"
        onChange={setActiveTabKey}
        tabBarExtraContent={tabBarExtraContent}
      >
        <TabPane tab="Unread" key="1">
          {user?.notifications && user?.notifications.length > 0 ? (
            user?.notifications.map((notification, index) => (
              <div
                key={index}
                onClick={() => navigate(notification.path)}
                style={{ cursor: "pointer" }}
                className="notification-item"
              >
                <p className="notification-type">{notification.type}</p>
                <p className="notification-message">{notification.message}</p>
                <small>{new Date(notification.date).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p>No new notifications</p>
          )}
        </TabPane>
        <TabPane tab="Read" key="2">
          {user?.seenNotifications && user?.seenNotifications.length > 0 ? (
            user?.seenNotifications.map((notification, index) => (
              <div
                key={index}
                style={{ cursor: "pointer" }}
                className="notification-item"
              >
                <p className="notification-type">{notification.type}</p>
                <p className="notification-message">{notification.message}</p>
                <small>{new Date(notification.date).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p>No read notifications</p>
          )}
        </TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notifications;
