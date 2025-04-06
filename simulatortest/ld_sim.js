import { initialize } from 'launchdarkly-node-client-sdk';

const simulateUsers = async (userCount = 50) => {
  const clientSideID = "67ece628f328ed0982560843";

  let tryNewFlowClicks = 0;
  let exploreFeatureClicks = 0;

  for (let i = 0; i < userCount; i++) {
    const browserTypes = ["Chrome", "Safari", "Firefox"];
    const devices = ["Macbook", "Windows", "iOS", "Other"];
    const browser = browserTypes[Math.floor(Math.random() * browserTypes.length)];
    const device = devices[Math.floor(Math.random() * devices.length)];

    const context = {
      kind: "user",
      key: `user-${i}-${Date.now()}`,
      anonymous: true,
      custom: { browser, device }
    };

    const client = initialize(clientSideID, { context });

    await new Promise(resolve => client.once("ready", resolve));

    const exploreFeatureFlag = await client.variation("explorefeature", context, false);

    if (exploreFeatureFlag) {
      const roll = Math.random();
      if (roll <= 0.4) {
        client.track("explorefeaturebutton", context);
        tryNewFlowClicks++;
        console.log(`👤 [${i}] Try New Flow clicked (browser: ${browser}, device: ${device})`);
      } else {
        client.track("explorefeaturebutton", context);
        exploreFeatureClicks++;
        console.log(`👤 [${i}] Explore Features clicked (browser: ${browser}, device: ${device})`);
      }
    } else {
      console.log(`👤 [${i}] Flag not enabled (browser: ${browser}, device: ${device})`);
    }

    client.flush();
  }

  console.log("✅ Simulation Complete");
  console.log("📊 Try New Flow Clicks:", tryNewFlowClicks);
  console.log("📊 Explore Features Clicks:", exploreFeatureClicks);
};

simulateUsers(50);
