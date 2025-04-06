import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import * as LDClient from "launchdarkly-js-client-sdk"; //launchdarkly sdk//
import "./ValueCreationTeams.css";

const ValueCreationTeams = () => {
  const [showExploreFeature, setShowExploreFeature] = useState(false);
  const [ldClient, setLdClient] = useState(null);

  useEffect(() => {
    const clientSideID = "67ece628f328ed0982560843"; //LD clientsiteid //

    const browser = (() => {
      const ua = navigator.userAgent;
      if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
      if (ua.includes("Chrome")) return "Chrome";
      if (ua.includes("Firefox")) return "Firefox";
      return "Other";
    })();

    const device = navigator.platform.toLowerCase().includes("mac") ? "Macbook" : "Other";

    const context = {
      kind: "user",
      key: `user-${crypto.randomUUID()}`,
      anonymous: true,
      browser,
      device,
    }; //LD Context //

    console.log("LD context (VCT page):", context);

    const client = LDClient.initialize(clientSideID, context);
    setLdClient(client);

    client.on("ready", async () => {
      console.log("LD SDK ready (VCT page)");
      const flagValue = await client.variation("explorefeature", false); //LD flag explorefeature //
      console.log("Flag [explorefeature]:", flagValue);
      setShowExploreFeature(flagValue);
    });
  }, []);

  return (
    <div className="vct-container">
      <NavBar />
      <div className="vct-content">
        <section className="vct-hero">
          <h1 className="vct-heading">Empower Your Teams to Create Exceptional Value</h1>
          <p className="vct-paragraph">
            Build unstoppable Value Creation Teams with the power of app.bestsalescoach.ai. Drive alignment, accountability, and outcomes with proven frameworks and AI-driven tools.
          </p>

         
          {showExploreFeature && (  // Show button only if flag is enabled //
            <button
              className="vct-cta-button"
              onClick={() => {
                if (ldClient) {
                  ldClient.track("explorefeaturebutton"); //LD metric explorefeaturebutton tracking //
                  console.log("Tracked metric: explorefeaturebutton");
                }
                window.location.href = "https://app.bestsalescoach.ai";
              }}
            >
              Explore Features
            </button>
          )}
        </section>

        <section className="vct-section">
          <h2 className="vct-subheading">What’s Holding Teams Back?</h2>
          <ul className="vct-list">
            <li>Missed follow-ups and stalled deals.</li>
            <li>Siloed collaboration between sales, technical, and success teams.</li>
            <li>Inconsistent deal progression and win rates.</li>
          </ul>
        </section>

        <section className="vct-section">
          <h2 className="vct-subheading">How app.bestsalescoach.ai Helps</h2>
          <p className="vct-text">
            Build seamless collaboration with unified goals, enable execution-driven frameworks like MEDDICC, and drive measurable outcomes with AI prioritization.
          </p>
        </section>

        <section className="vct-section">
          <h2 className="vct-subheading">What Makes a Value Creation Team?</h2>
          <ul className="vct-list">
            <li><strong>Collaboration:</strong> Align cross-functional teams.</li>
            <li><strong>Execution Focus:</strong> Stay disciplined with clear next steps.</li>
            <li><strong>Champion Building:</strong> Identify and empower internal advocates.</li>
            <li><strong>Accountability:</strong> Clear ownership for consistent results.</li>
          </ul>
        </section>

        <section className="vct-cta">
          <h2 className="vct-cta-heading">Build Your Value Creation Team Today</h2>
          <p className="vct-cta-text">
            Discover how app.bestsalescoach.ai can transform your approach to sales execution.
          </p>
          <button
            className="vct-cta-button"
            onClick={() => window.location.href = "/book-demo"}
          >
            Book a Demo
          </button>
        </section>
      </div>
    </div>
  );
};

export default ValueCreationTeams;
