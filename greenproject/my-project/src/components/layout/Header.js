
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiLeaflet } from 'react-icons/si'; 
import './Header.css';
function Header() {
return (
<header className="main-header">
<div className="header-container">
<Link to="/" className="logo-link">
<SiLeaflet className="logo-icon" />
<span>CarbonScope</span>
</Link>
<div className="header-actions">
<Link to="/login" className="login-btn-header">Login</Link>
</div>
</div>
</header>
);
}
export default Header;