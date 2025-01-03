// src/components/NavBar.js
// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/bestsalecoachlogo.jpg";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoDoubleClick = () => {
    navigate("/home");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo-container" onDoubleClick={handleLogoDoubleClick}>
        <img src={logo} alt="Best Sales Coach Logo" className="logo" />
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
      <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <Link to="/product" className="nav-menu-item">
          Product
        </Link>
        <Link to="/usecases" className="nav-menu-item">
          Use Cases
        </Link>
        <Link to="/valuecreationteams" className="nav-menu-item">
          Value Creation Teams
        </Link>
        <div
          className="nav-menu-dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <Link to="/aboutus" className="nav-menu-item">
            About Us
          </Link>
          <div className={`dropdown-content ${isDropdownOpen ? "visible" : ""}`}>
            <Link to="/contactus" className="nav-menu-item">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      {/* AI Assistant - BestSalesCoach.ai */}

    </nav>
  );
};

export default Navbar;
