// src/pages/LandingPage.js
// src/pages/LandingPage.js
// src/pages/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import askCoachImage from "../assets/ask-coach.jpg";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

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
      <motion.img
        src={askCoachImage}
        alt="Ask Coach"
        className="landing-page-image"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
      />
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
