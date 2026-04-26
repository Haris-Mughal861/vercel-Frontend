import React from 'react';
import './footer.css';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-logo">Dastkaran</h2>
          <p className="footer-desc">
            Your go-to store for quality and value. Explore a wide range of products tailored to your lifestyle.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/checkout">Checkout</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-icons">
            <button aria-label="Facebook"><Facebook /></button>
            <button aria-label="Twitter"><Twitter /></button>
            <button aria-label="Instagram"><Instagram /></button>
            <button aria-label="LinkedIn"><LinkedIn /></button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Dastkaran. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
