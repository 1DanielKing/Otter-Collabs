import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../contexts/AuthContext.js";
import { useNotifications } from "../contexts/NotificationsContext.js";
import { useModal } from "../contexts/ModalContext";
import LogoutModal from "./LogOutModal";

function Navbar({ openLogoutModal }) {
  const { notifications } = useNotifications();
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
  };

  const handleMessageClick = (index) => {
    setSelectedMessage(index);
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
        {/* className below is there for code 
        readability in browser dev tools */}
        <div className="notification-menu">
          {user && (
            <li>
              <div className="notification-container">
                <button
                  className="notification-button"
                  onClick={handleNotificationClick}
                >
                  {notifications.length > 0 && (
                    <div className="notification-badge">
                      {notifications.length}
                    </div>
                  )}
                  Notifications
                </button>
                {isDropdownVisible && notifications.length > 0 && (
                  <div className="notification-dropdown">
                    {notifications.map((notification, index) => (
                      <div
                        key={index}
                        className={`notification-item ${
                          selectedMessage === index ? "selected" : ""
                        }`}
                        onClick={() => handleMessageClick(index)}
                      >
                        {notification.message}
                        {selectedMessage === index && (
                          <div>
                            <button className="notif-accept">Accept</button>
                            <button className="notif-deny">Decline</button>
                          </div>
                        )}
                      </div>
                    ))}
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
