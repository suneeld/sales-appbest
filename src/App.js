
// src/App.js
import './App.css';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as LDClient from 'launchdarkly-js-client-sdk'; //launchdarkly sdk//
import { initFaro } from './utils/faroInit'; //grafana faro sdk//

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Product from "./pages/Product";
import UseCases from "./pages/UseCases";
import ValueCreationTeams from "./pages/ValueCreationTeams";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import LDUserSimulator from "./components/LDUserSimulator";

function App() {
  useEffect(() => {
    const clientSideID = "67ece628f328ed0982560843"; // LD cliensideid here//

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
      device
    };

    const ldClient = LDClient.initialize(clientSideID, context); //initialise LD sdk //

    ldClient.on("ready", async () => {
      const grafanaFlag = await ldClient.variation("exploregrafana", false);
      console.log("📡 LD Flag enablegrafana =", grafanaFlag);
      if (grafanaFlag) {
        initFaro();
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/usecases" element={<UseCases />} />
        <Route path="/valuecreationteams" element={<ValueCreationTeams />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/simulate" element={<LDUserSimulator userCount={50} />} />
      </Routes>
    </Router>
  );
}

export default App;
