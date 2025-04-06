import React, { useEffect, useState } from "react";
import * as LDClient from "launchdarkly-js-client-sdk"; //launcdarkly sdk //

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

  const clientSideID = "67ece628f328ed0982560843"; //LD clientsiteid //

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
        const browserTypes = ["Chrome", "Safari"];
        const devices = ["Macbook", "macOS"];
        const browser = browserTypes[Math.floor(Math.random() * browserTypes.length)];
        const device = devices[Math.floor(Math.random() * devices.length)];

        const context = { //LD Context //
          kind: "user",
          key: `user-explore-${batch}-${i}-${Date.now()}`,
          anonymous: true,
          custom: {
            browser,
            device,
            valuepage: true,
            landingpage: true,
          },
        };

        const ldClient = LDClient.initialize(clientSideID, context);
        await new Promise((resolve) => ldClient.on("ready", resolve));

        const flagEnabled = await ldClient.variation("explorefeature", false); 

        if (flagEnabled) {
          const roll = Math.random();
          if (roll <= 0.4) {
            ldClient.track("explorefeaturebutton");
            tryClicks++;
            console.log(`👤 ${i}: Try New Flow clicked [${browser} / ${device}]`);
          } else {
            ldClient.track("explorefeaturebutton");
            exploreClicks++;
            console.log(`👤 ${i}: Explore Features clicked [${browser} / ${device}]`);
          }
        } else {
          console.log(`👤 ${i}: Flag off [${browser} / ${device}]`);
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
        console.log("⏳ Waiting 30s before next Explore batch...");
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
        const browser = "Chrome";
        const device = "Macbook";

        const context = { //LD Context //
          kind: "user",
          key: `user-vmenu-${batch}-${i}-${Date.now()}`,
          anonymous: true,
          custom: { browser, device },
        };

        const ldClient = LDClient.initialize(clientSideID, context);
        await new Promise((resolve) => ldClient.on("ready", resolve));

        const flagEnabled = await ldClient.variation("valuepage", false);

        if (flagEnabled) {
          ldClient.track("valuepagecount");
          valueClicks++;
          console.log(`📈 [Batch ${batch}] Clicked: user-${i} [${browser}/${device}]`);
        } else {
          console.log(`❌ [Batch ${batch}] Flag off: user-${i}`);
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
        console.log("⏳ Waiting 30s before next ValueMenu batch...");
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
        <p>**Note**Test Duration value can be between 1-60 and Each Test waits for 30 seconds interval.</p>
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
