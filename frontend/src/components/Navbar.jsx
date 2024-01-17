import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from '../contexts/AuthContext.js';
import { useNotifications } from "../contexts/NotificationsContext.js";
import { useModal } from "../contexts/ModalContext";
import LogoutModal from "./LogOutModal";

function Navbar({ openLogoutModal }) {
  const { notifications } = useNotifications();
  const { user } = useAuth();
  const { showModal } = useModal();

  const handleLogoutClick = (event) => {
    event.preventDefault();
    showModal(<LogoutModal />);
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
        <div>
        {user && (
          <li>
            <span>Notifications: {notifications.length}</span>
          </li>
        )}
      </div>
        <div>
          <li>
            <button onClick={handleLogoutClick} className='link-button'>
              Log Out
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
