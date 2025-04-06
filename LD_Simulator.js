const simulateUsers = async (userCount = 100) => {
  const LDClient = window.LDClient || launchdarklyJsClientSdk; // launchdarkly clientsdk //
  const clientSideID = "67ece628f328ed0982560843"; //LD clientsiteid //

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

    const client = LDClient.initialize(clientSideID, context);

    await new Promise(resolve => client.on("ready", resolve));

    const exploreFeatureFlag = client.variation("explorefeature", false);

    if (exploreFeatureFlag) {
      const roll = Math.random();
      if (roll <= 0.4) {
        client.track("explorefeaturebutton"); // Try New Flow click //
        tryNewFlowClicks++;
        console.log(`👤 [${i}] Try New Flow clicked (browser: ${browser}, device: ${device})`);
      } else {
        client.track("explorefeaturebutton"); // Explore Features click //
        exploreFeatureClicks++;
        console.log(`👤 [${i}] Explore Features clicked (browser: ${browser}, device: ${device})`);
      }
    } else {
      console.log(`👤 [${i}] Not shown explorefeature flag`);
    }

    client.flush(); // Optional: ensure it's sent //
  }

  console.log("✅ Simulation Complete");
  console.log("📊 Try New Flow Clicks:", tryNewFlowClicks);
  console.log("📊 Explore Features Clicks:", exploreFeatureClicks);
};

simulateUsers(100); // You can change this to 100 or 200 //
