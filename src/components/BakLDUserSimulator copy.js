import React, { useEffect, useState } from "react";
import * as LDClient from "launchdarkly-js-client-sdk";

const LDTestSimulator = ({ userCount = 100 }) => {
  const [results, setResults] = useState({
    tryNewFlow: 0,
    exploreFeatures: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const simulate = async () => {
      const clientSideID = "67ece628f328ed0982560843";
      let tryClicks = 0;
      let exploreClicks = 0;

      for (let i = 0; i < userCount; i++) {
        const browserTypes = ["Chrome", "Safari"];
        const devices = ["Macbook", "macOS"];
        const browser = browserTypes[Math.floor(Math.random() * browserTypes.length)];
        const device = devices[Math.floor(Math.random() * devices.length)];

        const context = {
            kind: "user",
            key: `user-${i}-${Date.now()}`,
            anonymous: true,
            custom: {
              browser,
              device,
              valuepage: true,
              landingpage: true
            }
          };
          

        const ldClient = LDClient.initialize(clientSideID, context);
        await new Promise(resolve => ldClient.on("ready", resolve));

        const flagEnabled = await ldClient.variation("explorefeature", false);

        if (flagEnabled) {
          const roll = Math.random();

          if (roll <= 0.4) {
            // Simulate click on Try New Flow (HomePage)
            ldClient.track("explorefeaturebutton");
            tryClicks++;
            console.log(`👤 ${i}: Try New Flow clicked [${browser} / ${device}]`);
          } else {
            // Simulate click on Explore Features (VCT Page)
            ldClient.track("explorefeaturebutton");
            exploreClicks++;
            console.log(`👤 ${i}: Explore Features clicked [${browser} / ${device}]`);
          }
        } else {
          console.log(`👤 ${i}: Flag off [${browser} / ${device}]`);
        }

        ldClient.flush();
      }

      setResults({
        tryNewFlow: tryClicks,
        exploreFeatures: exploreClicks,
        totalUsers: userCount
      });
    };

    simulate();
  }, [userCount]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🧪 LaunchDarkly Simulation Results</h2>
      <p>Total Simulated Users: {results.totalUsers}</p>
      <p>🚀 Try New Flow Clicks (Home): {results.tryNewFlow}</p>
      <p>🧭 Explore Features Clicks (VCT): {results.exploreFeatures}</p>
    </div>
  );
};

export default LDTestSimulator;
