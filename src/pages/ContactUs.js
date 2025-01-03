import React from "react";
import "./ContactUs.css";
import NavBar from "../components/Navbar"; // Assuming you have a NavBar component

const ContactUs = () => {
  return (
    <div className="contactus-container">
    <NavBar />
      <h1>Contact Us</h1>
      <p>If you have any questions or inquiries, feel free to reach out to us via email.</p>
      <a href="mailto:admin@bestsalescoach.ai" className="email-link">
        admin@bestsalescoach.ai
      </a>
      <form className="contact-form">
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" name="name" required />
        
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>
        
        <button type="submit" className="submit-button">Send</button>
      </form>
    </div>
  );
};

export default ContactUs;
