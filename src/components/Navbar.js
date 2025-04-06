import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import "./Navbar.css";
import logo from "../assets/bestsalecoachlogo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { valuepage } = useFlags(); // Automatically reads the flag from LD context
  const ldClient = useLDClient();   // Get the LD client instance
  console.log("🚦 LD Flag valuepage:", valuepage);

  const handleLogoDoubleClick = () => {
    navigate("/home");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleValueMenuClick = () => {
    if (ldClient) {
      ldClient.track("valuepagecount"); // Track metric when menu is clicked
      console.log("📈 Metric tracked: valuepagecount");
    }
  };

  return (
    <nav className="navbar">
      <div className="logo-container" onDoubleClick={handleLogoDoubleClick}>
        <img src={logo} alt="Best Sales Coach Logo" className="logo" />
      </div>

      <div className="hamburger" onClick={toggleMenu}>☰</div>

      <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <Link to="/product" className="nav-menu-item">Product</Link>
        <Link to="/usecases" className="nav-menu-item">Use Cases</Link>

        {valuepage && (
          <Link
            to="/valuecreationteams"
            className="nav-menu-item"
            onClick={handleValueMenuClick}
          >
            Value Creation Teams
          </Link>
        )}

        <div
          className="nav-menu-dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <Link to="/aboutus" className="nav-menu-item">About Us</Link>
          <div className={`dropdown-content ${isDropdownOpen ? "visible" : ""}`}>
            <Link to="/contactus" className="nav-menu-item">Contact Us</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
