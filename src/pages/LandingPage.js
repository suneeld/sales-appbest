import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as LDClient from "launchdarkly-js-client-sdk"; // launchdarkly js-client-sdk //
import askCoachImage from "../assets/ask-coach.jpg";
import BackaskCoachImage from "../assets/Back ask-coach.jpg";
import NewCoachImage from "../assets/newcoach.png";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [imageToShow, setImageToShow] = useState(null);

  useEffect(() => {
    const clientSideID = "67ece628f328ed0982560843"; //launchdarkly clientsiteid //

    // Detect browser //
    const browser = (() => {
      const ua = navigator.userAgent;
      if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
      if (ua.includes("Chrome")) return "Chrome";
      if (ua.includes("Firefox")) return "Firefox";
      return "Other";
    })();

    // Detect device type type mac //
    const isMac = navigator.platform.toLowerCase().includes("mac");

    const context = { //LD Context //
      kind: "user",
      key: `user-${crypto.randomUUID()}`, // simulate user ID //
      anonymous: true,
      browser: browser,
      device: isMac ? "Macbook" : "Other"
    };

    const ldClient = LDClient.initialize(clientSideID, context); //Init LD Client //

    ldClient.on("ready", () => {
      const flagValue = ldClient.variation("askcoachimg", false); // askcoachimg flag//

      if (flagValue) {
        if (browser === "Safari") {
          setImageToShow(BackaskCoachImage);
        } else if (browser === "Chrome" && isMac) {
          setImageToShow(NewCoachImage);
        } else {
          setImageToShow(askCoachImage);
        }
      }
    });
  }, []);

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <motion.div
      onClick={handleClick}
      className="landing-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {imageToShow && (
        <motion.img
          src={imageToShow}
          alt="Ask Coach"
          className="landing-page-image"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />
      )}

      <motion.div
        className="landing-page-text"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Ask Coach
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
