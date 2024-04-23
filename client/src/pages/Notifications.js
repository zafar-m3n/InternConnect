import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/NotificationPopoverStyle.css";

const { TabPane } = Tabs;

const Notifications = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [activeTabKey, setActiveTabKey] = useState("1");

  const handleNotificationClick = (path) => {
    navigate(path);
    // Additional logic to mark the notification as read can be implemented here
  };

  const markAllAsRead = () => {
    // Logic to mark all notifications as read
  };

  const deleteAllNotifications = () => {
    // Logic to delete all read notifications
  };

  const tabBarExtraContent = {
    right:
      activeTabKey === "1" && user?.notifications.length > 0 ? (
        <Button type="link" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      ) : activeTabKey === "2" && user?.seenNotifications.length > 0 ? (
        <Button type="link" onClick={deleteAllNotifications}>
          Delete notifications
        </Button>
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
                onClick={() => handleNotificationClick(notification.path)}
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
              <div key={index} style={{ padding: "10px" }}>
                <p>{notification.message}</p>
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
