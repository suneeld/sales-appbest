import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import "./Home.css";
import * as LDClient from "launchdarkly-js-client-sdk"; //launchdarkly sdk//

const HomePage = () => {
  const [customText, setCustomText] = useState('');
  const [featureEnabled, setFeatureEnabled] = useState(false);
  const [exploreFeatureEnabled, setExploreFeatureEnabled] = useState(false);
  const [ldClient, setLdClient] = useState(null);

  useEffect(() => {
    const clientSideID = "67ece628f328ed0982560843"; //LD clientsiteid //

    // Detect browser
    const browser = (() => {
      const ua = navigator.userAgent;
      if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
      if (ua.includes("Chrome")) return "Chrome";
      if (ua.includes("Firefox")) return "Firefox";
      return "Other";
    })();

    // Detect device
    const device = navigator.platform.toLowerCase().includes("mac") ? "Macbook" : "Other";

    const context = {
      kind: "user",
      key: `user-${crypto.randomUUID()}`,
      anonymous: true,
      browser,
      device,
    }; // LD context //

    console.log("LD Context (HomePage):", context);

    const client = LDClient.initialize(clientSideID, context);
    setLdClient(client);

    client.on("ready", async () => {
      console.log(" LD SDK ready (HomePage)");

      const landingFlag = await client.variation("landingpage", false); //LD flag landingpage //
      const exploreFlag = await client.variation("explorefeature", false); //LD flag explorefeature //

      console.log("🚀 landingpage flag:", landingFlag);
      console.log("🧪 explorefeature flag:", exploreFlag);

      setFeatureEnabled(landingFlag);
      setExploreFeatureEnabled(exploreFlag);
    });

    setCustomText("I need help with sales strategies to address pipeline inefficiencies.");
  }, []);

  const handleTryNewFlowClick = () => {
    if (ldClient) {
      ldClient.track("explorefeaturebutton");
      console.log("Tracked: explorefeaturebutton");
    }
    window.location.href = "https://app.bestsalescoach.ai";
  }; // LD metric tracking explorefeaturebutton  //

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
