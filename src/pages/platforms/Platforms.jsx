import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../../components/SpotlightCard'
import { useTranslation } from '../../utils/i18n'
import { useTheme } from '../../contexts/ThemeContext'
import { platformVariants } from '../../data/product'
import '../Page.css'
import '../Product.css'

/**
 * Platforms Page - Platform Delivery Models
 *
 * Shows HOW users can get/deploy NexSuite across different platforms.
 * Displays VS Code Extension, Desktop App, Cloud/SaaS, CLI & CI/CD options.
 */
const Platforms = () => {
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
            <div className="hero-badge">Delivery Models</div>
            <h1>Choose Your Platform</h1>
            <p className="page-hero-description">
              NexSuite is available across multiple platforms to fit your team's workflow.
              From VS Code extensions with 50M+ users to enterprise cloud deployments and CI/CD integration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Platform Cards Grid */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Available Platforms</h2>
            <p className="section-subtitle">
              Select the deployment model that works best for your team
            </p>
          </div>

          <div className="product-variants-grid" style={{ gap: '2rem' }}>
            {platformVariants.map((variant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="product-variant-card"
                style={{
                  border: variant.featured
                    ? '2px solid var(--accent-primary)'
                    : '1px solid var(--border-color)'
                }}
              >
                {variant.badge && (
                  <div
                    className="variant-badge"
                    style={{
                      background: variant.featured
                        ? 'var(--accent-primary)'
                        : 'var(--bg-secondary)',
                      color: variant.featured ? 'white' : 'var(--text-primary)'
                    }}
                  >
                    {variant.badge}
                  </div>
                )}

                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {variant.icon}
                </div>

                <h3>{variant.title}</h3>

                {variant.subtitle && (
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    {variant.subtitle}
                  </p>
                )}

                <div
                  className="variant-status"
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    marginBottom: '1rem',
                    background: variant.status.includes('✅')
                      ? 'rgba(34, 197, 94, 0.1)'
                      : variant.status.includes('🟡')
                      ? 'rgba(251, 191, 36, 0.1)'
                      : 'rgba(148, 163, 184, 0.1)',
                    color: variant.status.includes('✅')
                      ? '#22c55e'
                      : variant.status.includes('🟡')
                      ? '#fbbf24'
                      : '#94a3b8'
                  }}
                >
                  {variant.status}
                </div>

                <ul className="variant-features" style={{ marginBottom: '1.5rem' }}>
                  {variant.features.slice(0, 5).map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                  {variant.features.length > 5 && (
                    <li style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                      +{variant.features.length - 5} more features...
                    </li>
                  )}
                </ul>

                {variant.link && (
                  <a
                    href={variant.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn primary"
                    style={{ width: '100%' }}
                  >
                    Learn More →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Comparison */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Platform Comparison</h2>
            <p className="section-subtitle">
              Compare features across all deployment models
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table" style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                    Feature
                  </th>
                  {platformVariants.map((variant, i) => (
                    <th key={i} style={{
                      padding: '1rem',
                      textAlign: 'center',
                      borderBottom: '1px solid var(--border-color)',
                      minWidth: '120px'
                    }}>
                      {variant.icon}<br/>
                      <span style={{ fontSize: '0.85rem' }}>{variant.title}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>LSP Features</strong>
                  </td>
                  {platformVariants.map((variant, i) => (
                    <td key={i} style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
                      {variant.features.some(f => f.includes('LSP')) ? '✅' : '➖'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>Offline Mode</strong>
                  </td>
                  {platformVariants.map((variant, i) => (
                    <td key={i} style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
                      {variant.title.includes('Cloud') ? '❌' : '✅'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>Real-time Collaboration</strong>
                  </td>
                  {platformVariants.map((variant, i) => (
                    <td key={i} style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
                      {variant.features.some(f => f.toLowerCase().includes('collaboration') || f.toLowerCase().includes('cloud')) ? '✅' : '➖'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>CI/CD Integration</strong>
                  </td>
                  {platformVariants.map((variant, i) => (
                    <td key={i} style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
                      {variant.features.some(f => f.toLowerCase().includes('ci/cd') || f.toLowerCase().includes('automation')) ? '✅' : '➖'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>Status</strong>
                  </td>
                  {platformVariants.map((variant, i) => (
                    <td key={i} style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                      {variant.status}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
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
            <p>Choose your preferred platform and start using NexSuite today</p>
            <div className="cta-buttons">
              <Link to="/try-yourself" className="btn primary large">Try Interactive Demo</Link>
              <Link to="/contact" className="btn ghost large">Contact Sales</Link>
            </div>
            <p className="cta-note">Start with a 30-day free trial. No credit card required.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Platforms
