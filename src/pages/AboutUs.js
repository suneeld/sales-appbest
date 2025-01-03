import React from "react";
import "./AboutUs.css";
import NavBar from "../components/Navbar"; // Assuming you have a NavBar component
import SuneelDhingraImage from "../assets/SuneelDhingra.jpg"; // Correct import path for the image

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <NavBar />
      <section className="mission-section">
        <h1>Best Sales Coach</h1>
        <p>
          At Value Creation Teams, our mission is to empower go-to-market teams with actionable insights, tailored strategies, and cutting-edge AI tools like bestsalescoach.ai to drive exceptional sales execution and deliver transformative results.
        </p>
        <p>
          Born out of a passion for elevating sales performance, we recognized the challenges that sales, customer success, and technical teams face in navigating complex pipelines and aligning on strategic goals. Our platform bridges these gaps, creating a seamless environment for collaboration, accountability, and relentless execution.
        </p>
        <p>
          We are committed to redefining sales excellence, equipping teams with the tools and guidance they need to exceed targets, build champions, and deliver unmatched customer experiences.
        </p>
      </section>

      <section className="leadership-section">
        <h2>Meet the Leadership Team</h2>
        <div className="leaders">
          <div className="leader-card">
            <img src={SuneelDhingraImage} alt="Suneel Dhingra" />
            <h3>Suneel Dhingra</h3>
            <p>Founder & CEO</p>
            <a href="https://linkedin.com/in/suneel-dhingra" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
          <div className="leader-card">
            <img src="/path-to-leader2-photo.jpg" alt="Leader 2" />
            <h3>Key Team Member</h3>
            <p>CTO (TBA)</p>
            <a href="https://linkedin.com/in/key-team-member" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="quote-section">
        <blockquote>
          "Our vision is to build a culture of disciplined execution, continuous learning, and exceptional collaboration to transform sales teams into value creation powerhouses."
        </blockquote>
      </section>
    </div>
  );
};

export default AboutUs;
