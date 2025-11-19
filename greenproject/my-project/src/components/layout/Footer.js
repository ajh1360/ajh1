import React from 'react';
import { Link } from 'react-router-dom';
import { SiLeaflet } from 'react-icons/si';
import { FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-about">
          <Link to="/" className="footer-logo">
            <SiLeaflet />
            <span>ClimateFinance Data</span>
          </Link>
          <p>
            Providing transparent and accessible data to track global climate finance flows and drive sustainable investment.
          </p>
        </div>
        <div className="footer-links">
          <div className="link-column">
            <h4>Quick Links</h4>
            <Link to="/about">About Us</Link>
            <Link to="/projects">Dashboard</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 ClimateFinance Data. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;