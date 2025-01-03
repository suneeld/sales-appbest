
import './App.css';
// src/App.js
//import Navbar from "./components/Navbar";

import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
//import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import UseCases from "./pages/UseCases";
import ValueCreationTeams from "./pages/ValueCreationTeams";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

function App() {
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
      </Routes>
    </Router>
  );
}

export default App;



