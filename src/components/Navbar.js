import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as LDClient from "launchdarkly-js-client-sdk"; //launchdarkly sdk//
import "./Navbar.css";
import logo from "../assets/bestsalecoachlogo.jpg";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showValueMenu, setShowValueMenu] = useState(false);
  const [ldClient, setLdClient] = useState(null); // Store LD client//
  const navigate = useNavigate();

  useEffect(() => {
    const clientSideID = "67ece628f328ed0982560843"; //LD clientdsiteid //

    // Detect browser
    const browser = (() => {
      const ua = navigator.userAgent;
      if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
      if (ua.includes("Chrome")) return "Chrome";
      if (ua.includes("Firefox")) return "Firefox";
      return "Other";
    })();

    // Detect OS
    const os = (() => {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes("mac")) return "macOS";
      if (ua.includes("win")) return "Windows";
      if (ua.includes("linux")) return "Linux";
      if (ua.includes("android")) return "Android";
      if (ua.includes("iphone") || ua.includes("ipad")) return "iOS";
      return "Unknown";
    })();

    const isMac = navigator.platform.toLowerCase().includes("mac");

    console.log("Detected Browser:", browser);
    console.log("Detected OS:", os);
    console.log("Is Macbook:", isMac);

    const context = {
      kind: "user",
      key: `user-${crypto.randomUUID()}`,
      anonymous: true,
      browser,
      device: isMac ? "Macbook" : "Other",
      os
    };

    const client = LDClient.initialize(clientSideID, context);
    setLdClient(client); // Save client for tracking //

    client.on("ready", () => {
      const flagValue = client.variation("valuepage", false); //LD flag valuepage //
      setShowValueMenu(flagValue);
    });
  }, []);

  const handleLogoDoubleClick = () => {
    navigate("/home");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleValueMenuClick = () => {
    if (ldClient) {
      ldClient.track("valuepagecount"); //LD tracking valuepagecount metric //
      console.log(" Metric tracked: valuepagecount");
    }
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
        <Link to="/product" className="nav-menu-item">Product</Link>
        <Link to="/usecases" className="nav-menu-item">Use Cases</Link>

        
        {showValueMenu && ( // Show only if flag is enabled and track click //
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
