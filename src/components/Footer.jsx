import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="brand">
            <div className="brand-logo">
              <img src="./assets/logo_S_black2.svg" alt="SysNex Systems" className="logo" />
            </div>
            <span className="brand-text">
              <span className="brand-text-primary">SYSNEX</span>
              <span className="brand-text-secondary">Systems</span>
            </span>
          </div>
          <p className="footer-tagline">
            Model-Based Systems Engineering with SysML v2
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4 className="footer-heading">Product</h4>
            <Link to="/product" className="footer-link">Overview</Link>
            <Link to="/try-yourself" className="footer-link">Try Yourself</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Consulting</h4>
            <Link to="/methods" className="footer-link">Methods</Link>
            <Link to="/process" className="footer-link">Process</Link>
            <Link to="/tools" className="footer-link">Tools</Link>
            <Link to="/about" className="footer-link">About</Link>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Resources</h4>
            <a href="./assets/FEATURES.md" className="footer-link" target="_blank" rel="noopener noreferrer">Features</a>
            <a href="mailto:sysnex.labs.github@gmail.com" className="footer-link">Email</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} SysNex Systems. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

