import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../contexts/AuthContext.js";
import { useNotifications } from "../contexts/NotificationsContext.js";
import { useModal } from "../contexts/ModalContext";
import LogoutModal from "./LogOutModal";

function Navbar({ openLogoutModal }) {
  const { notifications, markNotificationAsSeen} = useNotifications();
  const { user } = useAuth();
  const { showModal } = useModal();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleLogoutClick = (event) => {
    event.preventDefault();
    showModal(<LogoutModal />);
  };

  const handleNotificationClick = () => {
    setDropdownVisible(!isDropdownVisible);
    setSelectedMessage(null);
  };

  const handleMessageClick = async (index, notificationId) => {
    setSelectedMessage(index);
    await markNotificationAsSeen(notificationId);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <div className="Logo-Home-Button">
          <li>
            <Link className="logo-home-button" to="/">
              <img src="/media/pictures/logo.png" alt="LOGO OTTERCOLLAB"></img>
            </Link>
          </li>
        </div>
        <div className="nav-links">
          <div>
            <li>
              <Link to="/">Profile</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to="/friends">Friends</Link>
            </li>
          </div>
          <div>
            <li>
              <Link to="/findUsers">Find Users</Link>
            </li>
          </div>
        </div>
        <div className="notification-menu">
          {user && (
            <li>
              <div className="notification-container">
                <button
                  className="notification-button"
                  onClick={handleNotificationClick}
                >
                  {notifications.filter((n) => !n.seen).length > 0 && (
                    <div className="notification-badge">
                      {notifications.filter((n) => !n.seen).length}
                    </div>
                  )}
                  Notifications
                </button>
                {isDropdownVisible && (
                  <div className="notification-dropdown">
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <div
                          key={index}
                          className={`notification-item ${
                            selectedMessage === index ? "selected" : ""
                          }`}
                          onClick={() => handleMessageClick(index, notification.id)}
                        >
                          <p className="notification-message">You received a pair request from {notification.receiver.username}</p>
                          {selectedMessage === index && (
                            <div>
                              <button className="notif-accept">Accept</button>
                              <button className="notif-deny">Decline</button>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="no-notifications-message">You have no notifications</p>
                    )}
                  </div>
                )}
              </div>
            </li>
          )}
        </div>
        {/* className below is there for code 
        readability in browser dev tools */}
        <div className="logout-button-and-modal">
          <li>
            <button onClick={handleLogoutClick} className="link-button">
              Log Out
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
