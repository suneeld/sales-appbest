import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import "./Home.css";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk"; // ✅ React SDK hooks

const HomePage = () => {
  const [customText, setCustomText] = useState("");
  const [featureEnabled, setFeatureEnabled] = useState(false);
  const [exploreFeatureEnabled, setExploreFeatureEnabled] = useState(false);

  const { landingpage, explorefeature } = useFlags(); // ✅ Load flags via context
  const ldClient = useLDClient(); // ✅ LD client instance

  useEffect(() => {
    console.log("🧠 Flags from context → landingpage:", landingpage, ", explorefeature:", explorefeature);
    setFeatureEnabled(landingpage);
    setExploreFeatureEnabled(explorefeature);
    setCustomText("I need help with sales strategies to address pipeline inefficiencies.");
  }, [landingpage, explorefeature]);

  const handleTryNewFlowClick = () => {
    if (ldClient) {
      ldClient.track("explorefeaturebutton");
      console.log("📊 Metric tracked: explorefeaturebutton");
    }
    window.location.href = "https://app.bestsalescoach.ai";
  };

  return (
    <div className="home-container">
      <NavBar />

      {/* Top Menu Section */}
      <div className="top-menu">
        <ul className="menu-list">
          <li>Product</li>
          <li>Use Cases</li>
          <li>About Us</li>
        </ul>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        {featureEnabled ? (
          <>
            <h1 className="hero-heading">🚀 Welcome to the New Landing Experience</h1>
            <p className="hero-paragraph">
              You’re offered this because you are <strong>selected</strong> to try this!
            </p>
            <p className="hero-paragraph">
              Discover how AI can take your pipeline efficiency and execution to new heights.
            </p>

            {exploreFeatureEnabled && (
              <button className="cta-button" onClick={handleTryNewFlowClick}>
                Try the New Flow
              </button>
            )}
          </>
        ) : (
          <>
            <h1 className="hero-heading">Best Sales Coach</h1>
            <h1 className="hero-heading">Unlock Your Sales Potential</h1>
            <p className="hero-paragraph">
              Empower your sales teams with real-time insights, actionable strategies, and AI-driven execution frameworks.
            </p>
            <p className="hero-paragraph">
              You’re seeing the default experience. Turn on the <strong>landingpage</strong> flag to preview the new flow.
            </p>
            <button
              className="cta-button"
              onClick={() => (window.location.href = "https://app.bestsalescoach.ai")}
            >
              Start Your Journey
            </button>
          </>
        )}
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
