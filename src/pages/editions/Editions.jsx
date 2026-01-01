import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpotlightCard from '../../components/SpotlightCard'
import { useTranslation } from '../../utils/i18n'
import { useTheme } from '../../contexts/ThemeContext'
import { editions, getProductionReadyEditions, getCommercialEditions, getFreeEditions } from '../../data/product'
import '../Page.css'
import '../Product.css'

/**
 * Editions Page - Build Variants
 *
 * Shows different BUILD configurations and commercial editions.
 * Displays Essential (Free), Standard, Platform, and Platform-Full editions.
 */
const Editions = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const productionReady = getProductionReadyEditions()
  const commercial = getCommercialEditions()
  const free = getFreeEditions()

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
            <div className="hero-badge">Build Variants</div>
            <h1>NexSuite Editions</h1>
            <p className="page-hero-description">
              Choose the right edition for your needs. From free Essential edition for CI/CD pipelines
              to enterprise Platform editions with advanced features. All editions include the same
              high-performance LSP core.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="page-content-section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{editions.length}</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Total Editions</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{free.length}</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Free Editions</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{commercial.length}</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Commercial Editions</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{productionReady.length}</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Production-Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Edition Cards Grid */}
      <section className="page-content-section">
        <div className="container">
          <div className="section-header">
            <h2>Available Editions</h2>
            <p className="section-subtitle">
              All editions share the same high-performance LSP core with varying feature sets
            </p>
          </div>

          <div className="product-variants-grid" style={{ gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {editions.map((edition, index) => (
              <motion.div
                key={edition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="product-variant-card"
                style={{
                  border: edition.badge === 'Recommended'
                    ? '2px solid var(--accent-primary)'
                    : '1px solid var(--border-color)'
                }}
              >
                {edition.badge && (
                  <div
                    className="variant-badge"
                    style={{
                      background: edition.badge === 'Free'
                        ? 'rgba(34, 197, 94, 0.2)'
                        : edition.badge === 'Recommended'
                        ? 'var(--accent-primary)'
                        : 'var(--bg-secondary)',
                      color: edition.badge === 'Free'
                        ? '#22c55e'
                        : edition.badge === 'Recommended'
                        ? 'white'
                        : 'var(--text-primary)'
                    }}
                  >
                    {edition.badge}
                  </div>
                )}

                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {edition.icon}
                </div>

                <h3>{edition.title}</h3>

                {edition.subtitle && (
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    {edition.subtitle}
                  </p>
                )}

                {/* Pricing */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                    {edition.price}
                  </div>
                  {edition.perSeat && (
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      per seat/year
                    </div>
                  )}
                </div>

                {/* Size */}
                <div style={{ marginBottom: '1rem', padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Package Size:</div>
                  <div style={{ fontSize: '1rem', fontWeight: 500 }}>{edition.size}</div>
                </div>

                {/* Status */}
                <div
                  className="variant-status"
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    marginBottom: '1rem',
                    background: edition.status.includes('✅')
                      ? 'rgba(34, 197, 94, 0.1)'
                      : edition.status.includes('🟡')
                      ? 'rgba(251, 191, 36, 0.1)'
                      : 'rgba(148, 163, 184, 0.1)',
                    color: edition.status.includes('✅')
                      ? '#22c55e'
                      : edition.status.includes('🟡')
                      ? '#fbbf24'
                      : '#94a3b8'
                  }}
                >
                  {edition.status}
                </div>

                {/* Description */}
                {edition.description && (
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    {edition.description}
                  </p>
                )}

                {/* Features */}
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    Included Features:
                  </h4>
                  <ul className="variant-features">
                    {edition.features.map((feature, i) => (
                      <li key={i} style={{ fontSize: '0.9rem' }}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Use Cases */}
                {edition.useCases && edition.useCases.length > 0 && (
                  <details style={{ marginBottom: '1rem' }}>
                    <summary style={{ cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                      Best For ({edition.useCases.length})
                    </summary>
                    <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                      {edition.useCases.map((useCase, i) => (
                        <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                {/* CTA */}
                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  {edition.price === 'Free' ? (
                    <a
                      href="https://marketplace.visualstudio.com/items?itemName=sysnex.sysmlv2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn primary"
                      style={{ width: '100%' }}
                    >
                      Download Free →
                    </a>
                  ) : edition.status.includes('✅') ? (
                    <Link
                      to="/contact"
                      className="btn primary"
                      style={{ width: '100%' }}
                    >
                      Contact Sales →
                    </Link>
                  ) : (
                    <button
                      className="btn ghost"
                      style={{ width: '100%', cursor: 'not-allowed', opacity: 0.6 }}
                      disabled
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Edition Comparison Table */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Edition Comparison</h2>
            <p className="section-subtitle">
              Compare features across all editions
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
                    Feature Category
                  </th>
                  {editions.map((edition, i) => (
                    <th key={i} style={{
                      padding: '1rem',
                      textAlign: 'center',
                      borderBottom: '1px solid var(--border-color)',
                      minWidth: '120px'
                    }}>
                      {edition.icon}<br/>
                      <span style={{ fontSize: '0.85rem' }}>{edition.title}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>Core LSP (18 features)</strong>
                  </td>
                  {editions.map((edition, i) => (
                    <td key={i} style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
                      ✅
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>Documentation Viewer</strong>
                  </td>
                  {editions.map((edition, i) => (
                    <td key={i} style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
                      {edition.id === 'essential' ? '➖' : '✅'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>Requirements Management</strong>
                  </td>
                  {editions.map((edition, i) => (
                    <td key={i} style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
                      {edition.id === 'essential' ? '➖' : '✅'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>Advanced Analytics</strong>
                  </td>
                  {editions.map((edition, i) => (
                    <td key={i} style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
                      {['platform', 'platform-full'].includes(edition.id) ? '✅' : '➖'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>Variability & Constraints</strong>
                  </td>
                  {editions.map((edition, i) => (
                    <td key={i} style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
                      {edition.id === 'platform-full' ? '✅' : '➖'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>Package Size</strong>
                  </td>
                  {editions.map((edition, i) => (
                    <td key={i} style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
                      {edition.size}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                    <strong>Pricing</strong>
                  </td>
                  {editions.map((edition, i) => (
                    <td key={i} style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      {edition.price}
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
            <h2>Need Help Choosing?</h2>
            <p>Contact our team for personalized recommendations based on your needs</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn primary large">Contact Sales</Link>
              <Link to="/try-yourself" className="btn ghost large">Try Interactive Demo</Link>
            </div>
            <p className="cta-note">Start with a 30-day free trial of any commercial edition.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Editions
