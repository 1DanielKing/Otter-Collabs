import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ openLogoutModal }) {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <div className="Logo-Home-Button">
                    <li>
                        <Link to="/"><img src='/' alt='LOGO OTTERCOLLAB'></img></Link>
                    </li>
                </div>
                <div className="nav-links">
                    <div><li><Link to="/">Profile</Link></li></div>
                    <div><li><Link to="/feed">Feed</Link></li></div>
                    <div><li><Link to="/about">About</Link></li></div>
                </div>
                <div><li><a href="#" onClick={openLogoutModal}>Log Out</a></li></div>
            </ul>
        </nav>
    );
}

export default Navbar;
