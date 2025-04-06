import React, { useEffect, useState } from "react";
import * as LDClient from "launchdarkly-js-client-sdk";

const LDTestSimulator = ({ userCount = 100 }) => {
  const [results, setResults] = useState({
    tryNewFlow: 0,
    exploreFeatures: 0,
    valueMenuClicks: 0,
    totalUsers: 0,
  });

  const [durationMinutes, setDurationMinutes] = useState(2);
  const [isRunningExplore, setIsRunningExplore] = useState(false);
  const [isRunningValueMenu, setIsRunningValueMenu] = useState(false);

  const clientSideID = "67ece628f328ed0982560843";

  const generateContext = (key, browser = "Chrome", device = "Macbook", extras = {}) => ({
    kind: "user",
    key,
    anonymous: true,
    custom: {
      browser,
      device,
      ...extras,
    },
  });

  const runExploreFeatureTestLoop = async () => {
    const durationMs = Math.min(Math.max(durationMinutes, 1), 60) * 60 * 1000;
    const intervalMs = 30 * 1000;
    const startTime = Date.now();
    let batch = 1;

    setIsRunningExplore(true);

    while (Date.now() - startTime < durationMs) {
      console.log(`🔁 Running ExploreFeature Batch ${batch}`);
      let tryClicks = 0;
      let exploreClicks = 0;

      for (let i = 0; i < userCount; i++) {
        const context = generateContext(
          `user-explore-${batch}-${i}-${Date.now()}`,
          Math.random() < 0.5 ? "Chrome" : "Safari"
        );

        const ldClient = LDClient.initialize(clientSideID, context);
        await new Promise((resolve) => ldClient.on("ready", resolve));

        const detail = await ldClient.variationDetail("explorefeature", false);
        const flagEnabled = detail.value;
        const inExperiment = detail.reason?.inExperiment === true;

        console.log(`🧪 Explore User ${context.key} → explorefeature=${flagEnabled}, inExperiment=${inExperiment}`);

        if (flagEnabled && inExperiment) {
          const roll = Math.random();
          const metricType = roll <= 0.4 ? "Try New Flow" : "Explore Features";
          ldClient.track("explorefeaturebutton");
          roll <= 0.4 ? tryClicks++ : exploreClicks++;
          console.log(`👤 ${i}: ${metricType} clicked [${context.custom.browser} / ${context.custom.device}]`);
        } else {
          console.log(`❌ ${i}: Skipped [Not in experiment or flag is off]`);
        }

        ldClient.flush();
      }

      setResults((prev) => ({
        ...prev,
        tryNewFlow: prev.tryNewFlow + tryClicks,
        exploreFeatures: prev.exploreFeatures + exploreClicks,
        totalUsers: prev.totalUsers + userCount,
      }));

      batch++;
      if (Date.now() - startTime + intervalMs < durationMs) {
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
      }
    }

    setIsRunningExplore(false);
    console.log("✅ Explore Feature Test completed.");
  };

  const runValueMenuTestLoop = async () => {
    const durationMs = Math.min(Math.max(durationMinutes, 1), 60) * 60 * 1000;
    const intervalMs = 30 * 1000;
    const startTime = Date.now();
    let batch = 1;

    setIsRunningValueMenu(true);

    while (Date.now() - startTime < durationMs) {
      console.log(`🔁 Running ValueMenu Batch ${batch}`);
      let valueClicks = 0;

      for (let i = 0; i < userCount; i++) {
        const context = generateContext(`user-vmenu-${batch}-${i}-${Date.now()}`, "Chrome");

        const ldClient = LDClient.initialize(clientSideID, context);
        await new Promise((resolve) => ldClient.on("ready", resolve));

        const detail = await ldClient.variationDetail("valuepage", false);
        const flagEnabled = detail.value;
        const inExperiment = detail.reason?.inExperiment === true;

        console.log(`🧪 ValueMenu User ${context.key} → valuepage=${flagEnabled}, inExperiment=${inExperiment}`);

        if (flagEnabled && inExperiment) {
          ldClient.track("valuepagecount");
          valueClicks++;
          console.log(`📈 Clicked: user-${i} [${context.custom.browser}/${context.custom.device}]`);
        } else {
          console.log(`❌ Skipped: Not in experiment or flag is false`);
        }

        ldClient.flush();
      }

      setResults((prev) => ({
        ...prev,
        valueMenuClicks: prev.valueMenuClicks + valueClicks,
        totalUsers: prev.totalUsers + userCount,
      }));

      batch++;
      if (Date.now() - startTime + intervalMs < durationMs) {
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
      }
    }

    setIsRunningValueMenu(false);
    console.log("✅ Value Menu Test completed.");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🧪 LaunchDarkly A/B Test Simulator</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "10px" }}>⏱ Test Duration (minutes):</label>
        <input
          type="number"
          min={1}
          max={60}
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(Number(e.target.value))}
          disabled={isRunningExplore || isRunningValueMenu}
          style={{ width: "60px", marginRight: "20px" }}
        />
        <p>**Note**: test duration can be 1–60 minutes. Each batch runs every 30 seconds.</p>
      </div>

      <button onClick={runExploreFeatureTestLoop} disabled={isRunningExplore || isRunningValueMenu} style={{ marginRight: "10px" }}>
        Start Testing Explore Feature
      </button>

      <button onClick={runValueMenuTestLoop} disabled={isRunningExplore || isRunningValueMenu}>
        Start Testing ValueCreation Teams Menu
      </button>

      <hr style={{ margin: "1.5rem 0" }} />

      <p>👥 Total Simulated Users: {results.totalUsers}</p>
      <p>🚀 Try New Flow Clicks (HomePage): {results.tryNewFlow}</p>
      <p>🧭 Explore Features Clicks (VCT Page): {results.exploreFeatures}</p>
      <p>📊 Value Creation Teams Menu Clicks: {results.valueMenuClicks}</p>
    </div>
  );
};

export default LDTestSimulator;
