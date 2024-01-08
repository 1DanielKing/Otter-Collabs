import React from 'react';
import './Navbar.css'; // Import your CSS file

function Navbar({ openLogoutModal }) {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <div className="Logo-Home-Button">
                    <li><a href="../pages/HomePage"><img src='/' alt='LOGO OTTERCOLLAB'></img></a></li>
                </div>
                <div className="nav-links">
                    <div><li><a href="#">Profile</a></li></div>
                    <div><li><a href="#">Feed</a></li></div>
                    <div><li><a href="#">About</a></li></div>
                </div>
                <div><li><a href="#" onClick={openLogoutModal}>Log Out</a></li></div>
            </ul>
        </nav>
    );
}

export default Navbar;
