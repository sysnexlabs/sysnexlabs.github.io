import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../../components/SpotlightCard'
import { useTranslation } from '../../utils/i18n'
import { useTheme } from '../../contexts/ThemeContext'
import { differentiators } from '../../data/product'
import '../Page.css'
import '../Product.css'

/**
 * Overview Page - Product Landing Page
 *
 * High-level product pitch and value proposition.
 * Entry point for exploring Platforms, Products, and Compliance variants.
 */
const Overview = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <div className="page">
      {/* Hero Section */}
      <section className="page-hero-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="product-hero-content"
          >
            <div className="hero-badge">Enterprise SysML v2 Tooling</div>
            <h1>NexSuite</h1>
            <p className="page-hero-description">
              Production-ready SysML v2 Language Server technology with VS Code integration, AI assistance, and compliance variants.
              Built for OEM/Tier-1 teams who demand performance, reliability, and regulatory compliance.
            </p>
            <div className="hero-cta">
              <Link to="/try-yourself" className="btn primary">Try Yourself</Link>
              <Link to="/contact" className="btn ghost">Contact Sales</Link>
            </div>
            <details className="hero-stats-details">
              <summary className="hero-stats-summary">Performance Metrics</summary>
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">&lt;50ms</div>
                  <div className="stat-label">LSP Response Time</div>
                  <div className="stat-explanation">Measured in internal benchmarks with typical SysML v2 models (100-500 elements).</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">18/18</div>
                  <div className="stat-label">LSP Features</div>
                  <div className="stat-explanation">All Language Server Protocol features implemented and tested.</div>
                </div>
              </div>
            </details>
          </motion.div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose NexSuite</h2>
            <p className="section-subtitle">
              Built for OEM/Tier-1 systems engineering teams who demand performance, reliability, and regulatory compliance
            </p>
          </div>
          <div className="differentiators-grid">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SpotlightCard>
                  <div className="differentiator-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul className="feature-tags">
                    {item.tags.map((tag, i) => (
                      <li key={i}>{tag}</li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links to Main Sections */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Explore NexSuite</h2>
            <p className="section-subtitle">
              Find the right solution for your needs
            </p>
          </div>

          <div className="product-variants-grid" style={{ gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="product-variant-card"
              style={{ border: '2px solid var(--accent-primary)' }}
            >
              <div className="variant-badge" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                Delivery Models
              </div>
              <h3>🚀 Platforms</h3>
              <p style={{ fontSize: '1.1rem', margin: '1rem 0' }}>
                Choose how you want to use NexSuite
              </p>
              <ul className="variant-features">
                <li>VS Code Extension (50M+ users)</li>
                <li>Desktop App (Tauri)</li>
                <li>Cloud/SaaS</li>
                <li>CLI & CI/CD</li>
              </ul>
              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/platforms" className="btn primary" style={{ width: '100%' }}>
                  Explore Platforms →
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="product-variant-card"
              style={{ border: '2px solid var(--accent-primary)' }}
            >
              <div className="variant-badge" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                Tools & Features
              </div>
              <h3>🛠️ Products</h3>
              <p style={{ fontSize: '1.1rem', margin: '1rem 0' }}>
                Discover what NexSuite can do
              </p>
              <ul className="variant-features">
                <li>NexDocs - Documentation</li>
                <li>NexReq - Requirements</li>
                <li>NexTest - Testing</li>
                <li>NexViz - Visualization</li>
                <li>+5 more products...</li>
              </ul>
              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/products" className="btn primary" style={{ width: '100%' }}>
                  Explore Products →
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="product-variant-card"
              style={{ border: '2px solid var(--accent-primary)' }}
            >
              <div className="variant-badge" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                Build Variants
              </div>
              <h3>📦 Editions</h3>
              <p style={{ fontSize: '1.1rem', margin: '1rem 0' }}>
                Select your edition
              </p>
              <ul className="variant-features">
                <li>Essential (Free) - ~25 MB</li>
                <li>Standard - ~35-40 MB</li>
                <li>Platform - ~50-60 MB</li>
                <li>Platform-Full - ~60-70 MB</li>
              </ul>
              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/editions" className="btn primary" style={{ width: '100%' }}>
                  View Editions →
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="product-variant-card"
              style={{ border: '2px solid var(--accent-primary)' }}
            >
              <div className="variant-badge" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                Industry Solutions
              </div>
              <h3>🛡️ Compliance</h3>
              <p style={{ fontSize: '1.1rem', margin: '1rem 0' }}>
                Regulatory compliance variants
              </p>
              <ul className="variant-features">
                <li>Automotive (ASPICE, ISO 26262)</li>
                <li>Aviation (DO-178C)</li>
                <li>Medical (IEC 62304)</li>
                <li>Railway (EN 50128)</li>
              </ul>
              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/compliance" className="btn primary" style={{ width: '100%' }}>
                  View Compliance →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="page-content-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="cta-content"
          >
            <h2>Ready to Get Started?</h2>
            <p>Try NexSuite today or contact our team for a personalized demo</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn primary large">Contact Sales</Link>
              <Link to="/try-yourself" className="btn ghost large">Try Interactive Demo</Link>
            </div>
            <p className="cta-note">Start with a 30-day free trial. No credit card required.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Overview
