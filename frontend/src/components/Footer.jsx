import React from 'react';
import '../styles/Footer.css';
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h2>NeuroFleetX</h2>
          <p>AI Powered Urban Fleet Solutions</p>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><MdPhone /> +91 00000 00000</p>
          <p><MdEmail /> contact@neurofleetx.com</p>
        </div>

        {/* Socials */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://threads.net" target="_blank" rel="noreferrer"><span style={{ fontSize: "1.5rem" }}>𝕋</span></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 NeuroFleetX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
