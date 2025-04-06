import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import "./Home.css";
import DIDAgent from "./DIDAgent";

const HomePage = () => {
  const [customText, setCustomText] = useState('');

  // Simulate the process of fetching custom text (e.g., user needs)
  useEffect(() => {
    // You can replace this with your API call or /prompt-chat AI agent to fetch user needs
    const fetchCustomText = () => {
      const userNeeds = "I need help with sales strategies to address pipeline inefficiencies.";
      setCustomText(userNeeds);
    };

    fetchCustomText();
  }, []);

  return (
    <div className="home-container">
      <NavBar />

      {/* AI Assistant Section */}
      <div className="ai-assistant-section">
        <h2>Meet Frank – Your AI Sales Coach</h2>
        {/* Pass customText to DIDAgent */}
        <DIDAgent customText={customText} />
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-heading">Best Sales Coach</h1>
        <h1 className="hero-heading">Unlock Your Sales Potential</h1>
        <p className="hero-paragraph">
          Empower your sales teams with real-time insights, actionable strategies, and AI-driven execution frameworks.
        </p>
        <button
          className="cta-button"
          onClick={() => (window.location.href = "https://app.bestsalescoach.ai")}
        >
          Start Your Journey
        </button>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2 className="section-heading">Core Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>AI-Powered Execution</h3>
            <p>Receive real-time coaching and actionable next steps for every sales interaction.</p>
          </div>
          <div className="feature-item">
            <h3>Dynamic Value Pyramid</h3>
            <p>Build tailored account strategies that align with customer business challenges and goals.</p>
          </div>
          <div className="feature-item">
            <h3>Seamless Collaboration</h3>
            <p>Align sales, customer success, and technical teams to deliver consistent results.</p>
          </div>
          <div className="feature-item">
            <h3>Proactive Deal Management</h3>
            <p>Identify and resolve deal blockers with AI-driven recommendations.</p>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="value-section">
        <h2 className="section-heading">Delivering Measurable Results</h2>
        <p className="section-paragraph">
          Our platform empowers teams to achieve 10X to 25X returns by enhancing productivity, improving close rates, and driving long-term customer success.
        </p>
        <ul className="value-list">
          <li>Boost Pipeline Efficiency</li>
          <li>Develop Internal Champions</li>
          <li>Enhance Team Collaboration</li>
          <li>Deliver Exceptional Customer Experiences</li>
        </ul>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <h2 className="section-heading">Ready to Transform Your Sales Team?</h2>
        <button
          className="cta-button"
          onClick={() => (window.location.href = "https://app.bestsalescoach.ai/demo")}
        >
          Book a Demo
        </button>
      </div>
    </div>
  );
};

export default HomePage;
