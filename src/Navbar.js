import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>CostCompass</h1> {/* Project Name on the left */}
        <h4>Navigate the Best Prices , Every Time</h4>
      </div>
      <div className="navbar-right">
        <ul>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
