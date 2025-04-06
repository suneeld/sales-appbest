import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initFaro } from './utils/faroInit';
import { withLDProvider } from 'launchdarkly-react-client-sdk';

initFaro(); // Initialize Grafana Faro

// Detect browser/device for context
const ua = navigator.userAgent;
const browserName = ua.includes("Chrome") && !ua.includes("Edg")
  ? "Chrome"
  : ua.includes("Safari") && !ua.includes("Chrome")
  ? "Safari"
  : ua.includes("Firefox")
  ? "Firefox"
  : "Other";

const device = navigator.platform.toLowerCase().includes("mac") ? "Macbook" : "Other";

// Correct context setup with real browser name
const context = {
  kind: "multi",
  user: {
    key: `user-${crypto.randomUUID()}`,
    anonymous: true
  },
  browser: {
    key: `browser-${browserName}`,
    name: browserName
  }
};

console.log("🧠 LD Context", context);

const LDApp = withLDProvider({
  clientSideID: "67ece628f328ed0982560843",
  context,
  reactOptions: {
    useCamelCaseFlagKeys: false
  }
})(App);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LDApp />
  </React.StrictMode>
);
