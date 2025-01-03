import React from "react";
import NavBar from "../components/Navbar"; // Assuming NavBar is your navigation component
import "./Product.css"; // Linking the updated CSS file

const Product = () => {
  return (
    <div className="product-container">
      <NavBar />
      <div className="product-content">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-heading">Revolutionize Your Sales Execution</h1>
          <p className="hero-paragraph">
            Empower your sales team with AI-driven tools to accelerate deals, optimize strategies, and achieve exceptional results.
          </p>
          <button 
            className="cta-button" 
            onClick={() => window.location.href = "https://app.bestsalescoach.ai"}
          >
            Explore Features
          </button>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-heading">Core Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3 className="feature-title">AI-Powered Execution</h3>
              <p className="feature-description">
                Get real-time coaching and actionable insights to drive every interaction forward.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Dynamic Value Pyramid</h3>
              <p className="feature-description">
                Build account strategies tailored to customer challenges and goals.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Seamless Collaboration</h3>
              <p className="feature-description">
                Align your team with shared goals and real-time updates for consistent results.
              </p>
            </div>
            <div className="feature-card">
              <h3 className="feature-title">Proactive Deal Management</h3>
              <p className="feature-description">
                Identify and resolve blockers with AI-driven recommendations to keep deals moving.
              </p>
            </div>
          </div>
        </section>

        {/* Value Section */}
        <section className="value-section">
          <h2 className="section-heading">Delivering Value Beyond Expectations</h2>
          <ul className="value-list">
            <li>Boost pipeline efficiency with intelligent prioritization.</li>
            <li>Empower sales reps with tailored persona-specific playbooks.</li>
            <li>Strengthen team collaboration with unified account strategies.</li>
            <li>Achieve measurable outcomes with AI-driven insights and tools.</li>
          </ul>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2 className="cta-heading">Experience the Future of Sales Execution</h2>
          <button 
            className="cta-button"
            onClick={() => window.location.href = "https://app.bestsalescoach.ai/demo"}
          >
            Book a Demo
          </button>
        </section>
      </div>
    </div>
  );
};

export default Product;
