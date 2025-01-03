import React from "react";
import NavBar from "../components/Navbar"; // Assuming NavBar is your navigation component
import "./UseCases.css"; // Linking the updated CSS file

const UseCases = () => {
  return (
    <div className="usecases-container">
      <NavBar />
      <div className="usecases-content">
        {/* Hero Section */}
        <section className="usecases-hero">
          <h1 className="usecases-heading">Transforming Sales Execution Across Industries</h1>
          <p className="usecases-paragraph">
            Discover how app.bestsalescoach.ai empowers organizations to overcome sales challenges and achieve measurable results.
          </p>
        </section>

        {/* Use Cases Section */}
        <section className="usecases-grid">
          <div className="usecase-card">
            <h2 className="usecase-title">Deal Acceleration</h2>
            <p className="usecase-description">
              Keep deals moving with AI-driven insights that highlight blockers, boosters, and next steps.
            </p>
          </div>
          <div className="usecase-card">
            <h2 className="usecase-title">Champion Building</h2>
            <p className="usecase-description">
              Identify and nurture internal advocates to drive influence and alignment within accounts.
            </p>
          </div>
          <div className="usecase-card">
            <h2 className="usecase-title">Retention and Expansion</h2>
            <p className="usecase-description">
              Proactively address risks and uncover new opportunities to expand within existing accounts.
            </p>
          </div>
          <div className="usecase-card">
            <h2 className="usecase-title">Persona-Specific Strategies</h2>
            <p className="usecase-description">
              Tailor your approach with playbooks designed to address key decision-makers' challenges and KPIs.
            </p>
          </div>
          <div className="usecase-card">
            <h2 className="usecase-title">Forecasting Precision</h2>
            <p className="usecase-description">
              Enhance decision-making with precise forecasting tools powered by real-time data analysis.
            </p>
          </div>
          <div className="usecase-card">
            <h2 className="usecase-title">Team Collaboration</h2>
            <p className="usecase-description">
              Break silos and unify sales, customer success, and technical teams with shared goals.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2 className="cta-heading">Start Your Journey to Sales Excellence</h2>
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

export default UseCases;
