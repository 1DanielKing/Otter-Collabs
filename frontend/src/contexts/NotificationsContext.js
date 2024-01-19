import React, { createContext, useContext, useState } from "react";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const markNotificationAsSeen = (notificationId) => {
    // Assume you have a function to mark notification as seen (make a backend request, for example)
    // Update the notifications array to mark the specified notification as seen
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, seen: true }
          : notification
      )
    );
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        clearNotifications,
        markNotificationAsSeen,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationsContext);
};
