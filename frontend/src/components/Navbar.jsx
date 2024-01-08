import './Navbar.css'; // Import your CSS file

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <div className="Logo-Home-Button">
                    <li><a href="../pages/HomePage"><img src='/' alt='LOGO OTTERCOLLAB'></img></a></li>
                </div>
                <div className="rest-of-nav">
                    <div><li><a href="#">Profile</a></li></div>
                    <div><li><a href="#">Feed</a></li></div>
                    <div><li><a href="#">About</a></li></div>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;
